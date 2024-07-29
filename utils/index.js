const jwt = require('jsonwebtoken')
const { PAGE_LENGTH } = require("../constants/index")
const { BAD_REQUEST } = require("../constants/statusCode")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const messageHandler = (message, success, statusCode, data) => {
    return response = { message, success, statusCode, data };
}

const tokenHandler = (data, userType, adminType) => {
    let identification = ''
    var { _id } = data;
    if (userType === 'caregiver') {
       identification = 'caregiverId'
    } else if (userType === "doctor") {
        identification = "doctorId"
    } else {
        identification = 'adminId'
    }
    const token = jwt.sign({ [identification]: _id, userType: identification }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_IN });
    return { token, [identification]: _id, userType: adminType };
}

const tokenVerifier = (req, res, next) => {
    try {
        let identification = ''
        if ( req.originalUrl.includes('caregiver') ) {
            identification = 'caregiverId'
        } else if ( req.originalUrl.includes('admin') ) {
            identification = 'adminId'
        } else {
            identification = 'doctorId'
        }
        if (req.get('Authorization') !== undefined) {
            const token = req.get('Authorization').replace("Bearer ", '');
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ result: "Unauthorized, Session Expired", status: 401 });
                } else {
                    let id
                    if (req.method === "POST") {
                        id = req.body.hasOwnProperty(identification) ? req.body[`${identification}`] : ''
                    } else if (req.method === "GET") {
                        id = req.params.hasOwnProperty(identification) ? req.params[`${identification}`] : req.query[`${identification}`]
                    } else if (req.method === "PUT") {
                        id = req.body.hasOwnProperty(identification) ? req.body[`${identification}`] : req.params[`${identification}`]
                    } else if(req.method === "DELETE") {
                        id = req.params.hasOwnProperty(identification) ? req.params[`${identification}`] : req.query[`${identification}`]
                    }
                    if (id === decoded[`${identification}`]) {
                        req.body.userType = identification
                        next();
                    } else if (id === decoded.secondLevel || id === decoded.firstLevel) {
                        req.body.userType = Object.keys(decoded)[1]
                        next();
                    } else if (id === decoded.secondLevel || id === decoded.firstLevel) {
                        req.params.userType = Object.keys(decoded)[1]
                        next();
                    } else if (id === decoded.secondLevel || id === decoded.firstLevel) {
                        req.query.userType = Object.keys(decoded)[1]
                        next();
                    } 
                    else if (id === decoded.caregiverId || id === decoded.userId) {
                        req.body.userType = Object.keys(decoded)[0]
                        next();
                    }else {
                        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
                    }
                }
            });
        } else {

            return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
        }
    } catch(error) {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}

const adminVerifier = (req, res, next) => {
    if (req.body.userType === "secondLevel" || req.body.userType === "firstLevel") {
        next()
    } else if (req.params.userType === "secondLevel" || req.params.userType === "firstLevel") {
        next()
    } else if (req.query.userType === "secondLevel" || req.query.userType === "firstLevel") {
        next()
    } else {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}

const userVerifier = (req, res, next) => {
    if (req.body.userType === "caregiverId" || req.body.userType === "userId") {
        next()
    } else {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}

const secondLevelVerifier = (req, res, next) => {
    if (req.body.userType === "secondLevel") {
        next()
    } else if (req.params.userType === "secondLevel") {
        next()
    } else if (req.query.userType === "secondLevel") {
        next()
    }
    else {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
    }
}

const AlphaNumeric = (length, type = 'alpha') => {
    var result = '';
    var characters = type === 'alpha' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const queryConstructor = (query, sortBy, item) => {
    let params = {}
    let array = Object.keys(query)
    for (let i = 0; i< array.length; i++) {
        if(Object.keys(query)[i] === 'id' ) {
            params["_id"] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else if ( Object.keys(query)[i] === 'userId' ) {
            params[Object.keys(query)[i]] = mongoose.Types.ObjectId(Object.values(query)[i])
        } else {
            params[Object.keys(query)[i]] = Object.values(query)[i]
        }
    }
     
    let { limit, skip, sort } = params
    limit = limit ? Number(limit) : PAGE_LENGTH
    skip = skip ? Number(skip) : 0

    if (sort === 'asc' || sort === 'desc') {
        if (typeof sortBy === 'object') {

            let first = sortBy[Object.keys(sortBy)[0]]
            let second = sortBy[Object.keys(sortBy)[1]]

            sort = sort === 'asc' ? { [first]: 1, [second]: 1 } : { [first]: -1, [second]: -1 }
        } else {
            sort = sort === 'asc' ? { [sortBy]: 1 } : { [sortBy]: -1 }
        }
    } else if(sort == undefined) {
        sort = { [sortBy]: 1 }
    } else {
        return {error : `Unable to find ${item} might be because of invalid params`}
    }

    delete params.limit
    delete params.skip
    delete params.sort
    return {params, limit, skip, sort}
}

const fileModifier = (req) => {
    let  { body, file, files, params } = req

    let mediaUrl = [];
    let formBody = {}
    if (files) {
        for (let file of files) {
            const { path } = file
            mediaUrl.push(path)
        }
        formBody = { image: mediaUrl, body, params }
    }
    else if (file) { //if only one image is uploaded
        const { path } = file
        formBody = { image: path, body, params }
    } else {
        formBody = { body, params }
    }
    return formBody
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, dbpassword) => {
    return await bcrypt.compare(password, dbpassword)
}

const isNotVerified = async (req, res, next) => {
    const appUser = await user({ caregiver: req.body.fullname }||{ doctor : req.body.fullName} )
    if (appUser.isVerified) {
        return next()
    } else {
        return error
    }
}

const incrementByOne = async(number) => {
    number += 1
    return number;
}

const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const formatDate = (date) => {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const testDate = date.map(ace => { 
        ace = new Date(ace);
        var carvedDate = days[ace.getDay()]+" "+ace.getDate()+" "+monthNames[ace.getMonth()]+" "+ace.getFullYear()+" "+ace.getHours()+" : "+ace.getMinutes()+ " "+"hours"
        return carvedDate;
      })
      return testDate
}

module.exports = { messageHandler, tokenHandler, tokenVerifier, adminVerifier, secondLevelVerifier, userVerifier, AlphaNumeric, queryConstructor, fileModifier, hashPassword, verifyPassword ,incrementByOne, isNotVerified, camelize, formatDate}
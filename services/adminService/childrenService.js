const {ChildInformation} = require("../../schema/childInformation/childInformation")
const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode");
const mongoose = require('mongoose');

const getChildrenByParamService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "children" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalChildren: 0, children: [] }))
    }
    try {
        const children =  await ChildInformation.find({ ...params }).populate("caregiverId").limit(limit).skip(skip).sort(sort)
        let totalChildren = await ChildInformation.find({ ...params }).countDocuments()
        if(!children.length > 0) {
            return callback(messageHandler("No children available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Children successfully fetched", true, SUCCESS, { totalChildren, children }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const searchChildrenService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "children" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalChildren: 0, children: [] }))
    }
    try {
        const results = await ChildInformation.find({ ...params, childName: { $regex: params.search, $options: "i" } }).populate("caregiverId").limit(limit).skip(skip).sort(sort)
        const totalresults = await ChildInformation.find({ ...params, childName: { $regex: params.search, $options: "i" } }).countDocuments()

        if(!results.length > 0) {
            return callback(messageHandler("No children available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Children successfully fetched", true, SUCCESS, { totalChildren: totalresults, children: results }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const deleteChildrenService = async (param, callback) => {
    ChildInformation.deleteOne({ _id: mongoose.Types.ObjectId(param.childrenId) }, (err, child) => {
        if(err) {
            return callback(messageHandler("An error occured", false, BAD_REQUEST, {}))
        } else if(child.deletedCount === 0) {
            return callback(messageHandler("Child not found", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Child successfully deleted", true, SUCCESS, child))
        }
    })
}

module.exports = { getChildrenByParamService, deleteChildrenService, searchChildrenService }
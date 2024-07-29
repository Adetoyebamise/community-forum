const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode");
const mongoose = require('mongoose');

const getDoctorsListService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "doctors" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctors: 0, doctors: [] }))
    }
    try {
        const doctors =  await Doctors.find({ $or: [{status: "ACTIVE"}, {status: "RESTRICTED"}] }).limit(limit).skip(skip).sort(sort)
        let totalDoctors = await Doctors.find({ $or: [{status: "ACTIVE"}, {status: "RESTRICTED"}] }).countDocuments()
        if(!doctors.length > 0) {
            return callback(messageHandler("No doctors available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Doctors successfully fetched", true, SUCCESS, { totalDoctors, doctors }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const getDoctorsByParamService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "doctors" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctors: 0, doctors: [] }))
    }
    try {
        const availableDoctors =  await Doctors.find({ ...params }).limit(limit).skip(skip).sort(sort)
        let totalAvailableDoctors = await Doctors.find({ ...params }).countDocuments()
        if(!availableDoctors.length > 0) {
            return callback(messageHandler("No doctors available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Doctors successfully fetched", true, SUCCESS, { totalAvailableDoctors, availableDoctors }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const searchDoctorService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "doctor" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctors: 0, doctors: [] }))
    }
    try {
        const results = await Doctors.find({ ...params, fullName: { $regex: params.search, $options: "i" } }).limit(limit).skip(skip).sort(sort)
        const totalresults = await Doctors.find({ ...params, fullName: { $regex: params.search, $options: "i" } }).countDocuments()

        if(!results.length > 0) {
            return callback(messageHandler("No doctor available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Doctors successfully fetched", true, SUCCESS, { totalDoctors: totalresults, doctors: results }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const updateDoctorStatusService = async ({param, body}, callback) => {
    Doctors.updateOne({ _id: mongoose.Types.ObjectId(param.doctorId) }, { $set: { ...body } }, (err, doctor) => {
        if(err) {
            return callback(messageHandler("An error occured", false, BAD_REQUEST, {}))
        } else if(doctor.modifiedCount === 0) {
            return callback(messageHandler("Doctor not found", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Doctor successfully updated", true, SUCCESS, doctor))
        }
    })
}

const deleteDoctorService = (param, callback) => {
    Doctors.deleteOne({ _id: mongoose.Types.ObjectId(param.doctorId) }, (err, doctor) => {
        if(err) {
            return callback(messageHandler("An error occured", false, BAD_REQUEST, {}))
        } else if(doctor.deletedCount === 0) {
            return callback(messageHandler("Doctor not found", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Doctor successfully deleted", true, SUCCESS, doctor))
        }
    })
}

module.exports = { getDoctorsListService, updateDoctorStatusService, deleteDoctorService, getDoctorsByParamService, searchDoctorService }
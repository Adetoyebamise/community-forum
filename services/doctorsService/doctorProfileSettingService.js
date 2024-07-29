const { Doctors } = require("../../schema/doctorsSchema/doctorSchema")
const { messageHandler, verifyPassword, hashPassword, queryConstructor } = require("../../utils")
const { BAD_REQUEST, SUCCESS, UNAUTHORIZED } = require("../../constants/statusCode")
const mongoose = require("mongoose")
const {availability} = require("../../schema/availabilitySchema/availabilitySchema")

const updateDoctorProfileService = async (payload, callback) => {
    let { body, params, profileImage } = payload
    try {
    await Doctors.findOne({ _id: params.doctorId }).exec(async (err, doc) => {  
    if (err) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
        } else if (doc === null) {
        return callback(messageHandler("No Doctor with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
          delete body.password
          delete body.confirmPassword
          Doctors.updateOne({ _id: params.doctorId }, { $set: { ...body, profileURL: profileImage } }, (error, success) => {
          if (error) {
          return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
          } else {
          return callback(messageHandler("Profile Successfully Updated", true, SUCCESS, success))
          }
      });
    }
  })
 } catch (err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
 }
}

const updateDoctorPasswordService = async ({param, body}, callback) => {
    let { oldPassword, newPassword, confirmNewPassword} = body;
    try {
        let doct = await Doctors.findOne({ _id: param.doctorId })
        if (!doct) {
            return callback(messageHandler("Account not found, Please Try Again", false, UNAUTHORIZED, {}))
        }
        const checkPassword = await verifyPassword(oldPassword, doct.password);
        if (!checkPassword) {
            return callback(messageHandler("Password is incorrect...", false, BAD_REQUEST, {}))
        } else if ( newPassword === oldPassword) { 
            return callback(messageHandler("Password has been used before, Use a new one", false, UNAUTHORIZED, {}))
        } else if ( newPassword !== confirmNewPassword ) {        
            return callback(messageHandler("New Password and Confirm new password must match...", false, BAD_REQUEST, {}))    
        } else {
           const changePassword = await hashPassword(newPassword)
           const changeConfirmPassword = await hashPassword(confirmNewPassword)
           let success = await Doctors.updateOne({ _id: param.doctorId }, { $set: {password: changePassword, confirmPassword: changeConfirmPassword }})
            return callback(messageHandler("Doctor Password Successfully updated", true, SUCCESS, success))
        }
    } catch (err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
    }
}

const updateMedicalLicenseService = async (payload, callback) => {
   let { image, params, body } = payload   
   try {
    let doc = await Doctors.findOne({ _id: params.doctorId })
     if (doc === null) {
       return callback(messageHandler("No Doctor with the details found, Please Try Again", false, BAD_REQUEST, {}))
    } else {
    delete body.password
    delete body.confirmPassword
    let lice = await Doctors.updateOne({ _id: params.doctorId }, { $set: {...body, medicalLicenseURL: image }})
      return callback(messageHandler("Medical License Successfully Updated", true, SUCCESS, lice))
    }

  } catch (err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
  }
}

const updateValidCardService = async (payload, callback) => {
    let { image, params, body } = payload
    try {
     let doc = await Doctors.findOne({ _id: params.doctorId })
      if (doc === null) {
        return callback(messageHandler("No Doctor with the details found, Please Try Again", false, BAD_REQUEST, {}))
     } else {
     delete body.password
     delete body.confirmPassword
     let lice = await Doctors.updateOne({ _id: params.doctorId }, { $set: {...body, validIdCardURL: image }})
       return callback(messageHandler("Doctor valid card Successfully Updated", true, SUCCESS, lice))
     }
 
   } catch (err) {
         return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
   }
 }

 const searchDoctorByIdService = async (query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "doctor" )
  if(error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctors: 0, doctors: [] }))
  }
  try {
      const results = await Doctors.find({ _id: mongoose.Types.ObjectId(query.id)}).populate('availabilityId._id')
      const totalresults = await Doctors.find({ ...params,}).countDocuments()
      if(!results.length > 0) {
          return callback(messageHandler("No Doctor(s) available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Doctor successfully fetched", true, SUCCESS, { totalDoctors: totalresults, doctors:results }))
  }
  catch(error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { updateDoctorProfileService, updateDoctorPasswordService, updateMedicalLicenseService, updateValidCardService, searchDoctorByIdService}

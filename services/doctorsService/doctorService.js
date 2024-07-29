const { messageHandler, hashPassword, AlphaNumeric, tokenHandler  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { sendMailNotification } = require("../../modules/notification/email")
const { Availability } = require("../../schema/availabilitySchema/availabilitySchema")
const  {Userpoint}  = require("../../schema/userPointSchema")
const mongoose = require('mongoose');

const registerDoctorService = async ({payload, userType}, callback) => {
  const {image,params, body} = payload;
  const obj = JSON.parse(JSON.stringify(body)); 
  const {emailAddress, phoneNumber, password, confirmPassword} = obj
  const  toHash = await hashPassword(AlphaNumeric(4, "alpha"))
  Doctors.findOne({emailAddress} || {phoneNumber}, async(err, doctor)  => {
      if(err){
          return callback(messageHandler("You have used this email before", false, BAD_REQUEST, {}))
      } 
      else if (doctor !== null) {
          return callback(messageHandler("Sorry, this email or phone number already exist", true, SUCCESS, {}))  
      } 
      else if (password === confirmPassword) {
          const  toHash = await hashPassword(AlphaNumeric(4, "alpha"))
          let saveData = {...obj, emailToken: toHash, password: await hashPassword(obj.password), confirmPassword: await hashPassword(obj.confirmPassword)}
          let doctor = new Doctors(saveData)
          let jojoloPoint = new Userpoint({userId: doctor._id})
          await jojoloPoint.save()
          const userData = tokenHandler( doctor, userType )
          return doctor.save(async (error, result) => {
              doctor.confirmPassword = undefined
              doctor.password = undefined
              if (error) {
                  return callback(messageHandler("Something went wrong... Cannot create doctor account", false, BAD_REQUEST, error.message))
              } else {
                  const substitutional_parameters = {doctorName:doctor.fullName, doctorEmail:result.emailAddress, code:doctor.verificationCode }
                  await sendMailNotification(result.emailAddress, "Welcome to Jojolo", substitutional_parameters, "WELCOME_MESSAGE", true )
                  return callback(messageHandler("doctor Account Successfully Created", true, SUCCESS, {result
                  , userData}))
              }
          })  
      } else {
          return callback(messageHandler("Password must match", false, BAD_REQUEST, {}))
      }
  })
}

const forgotPasswordCodeService = (body, callback) => {
  const {emailAddress} = body
  Doctors.findOne({emailAddress}, async (err, doct) => {
      if (err) {
          return callback(messageHandler("Email is not availlable", false, BAD_REQUEST, {}))
      } if (!doct) {
          return callback(messageHandler("Doctor is not availlable", false, BAD_REQUEST, {}))
      } else {
         doct.verificationCode = AlphaNumeric(5, "alpha")
          await doct.save(async (err, res) => {
              if (err) {
                  return callback(messageHandler("Email is not availlable", false, BAD_REQUEST, {}))
              } 
              else {
                  const substitutional_parameters = {doctorName:doct.fullName, doctorEmail:res.emailAddress, code:doct.verificationCode }
                  await sendMailNotification(res.emailAddress, "password reset request", substitutional_parameters, "PASSWORD_RESET_REQUEST", true )
                  return callback(messageHandler("Verification code sent", true, SUCCESS, res))
              }
          })
      }
  })
}

const validateVerificationCodeService = (payload, callback) => {
  const {body,verificationCode} = payload
  Doctors.findOne({verificationCode: body.verificationCode}, (err, success) => {
      if(err) {
      return callback(messageHandler("Verification Code is not availlable", false, BAD_REQUEST, {}))
      } if (!success) {
          return callback(messageHandler("Doctor is not availlable", false, BAD_REQUEST, {}))
      }
      else {
          message = "Code validated"
          if(payload.verificationCode === verificationCode) {
              return callback(messageHandler(message, true, SUCCESS, success))
          }
      }
  })
}

const forgotDoctorPasswordService = async ({ body, param }, callback) => {
  const { newPassword, confirmPassword} = body
  if (newPassword === confirmPassword) {
    Doctors.updateOne({_id: param.doctorId}, {$set: { password: await hashPassword(body.newPassword), confirmPassword: await hashPassword(body.confirmPassword) }}, (err, success) => {
      if (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message))
      } else if (success.modifiedCount === 0) {
        return callback(messageHandler("Doctor not found", false, BAD_REQUEST, {}))
      }
        return callback( messageHandler("Doctor successfully Updated", true, SUCCESS, success))
    })
  } else {
      return messageHandler("New Password and confirm Password should match", false, BAD_REQUEST, {})
    }
}

const setDoctorAvailabilityService = async ({payload, param}, callback) => {
  const { day, time } = payload
  Doctors.updateOne({ _id: mongoose.Types.ObjectId(param.doctorId) }, {$push: {
    "availability": {
      day: day,
      time: time
    }
  }}, (err, success) => {
    if (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message))
    }
    if (success.modifiedCount === 0) {
      return callback(messageHandler("Doctor not found", false, BAD_REQUEST, {}))
    }
      return callback( messageHandler("Doctor successfully Updated", true, SUCCESS, success))
  })
}

const updateDoctorAvailabilityService = async ({body, param}, callback) => {
     const { availabilityId, doctorId,timeId, day, startTime, endTime, isActive, time } = body
     try {
    let checkAvail = await Availability.findOne({_id: availabilityId})

    if (!checkAvail) {
      return callback(messageHandler("Doctor availability not found", false, BAD_REQUEST, {}))
    }
    if (body.isActive === false) {
      await Doctors.updateOne({ _id: body.doctorId}, { $pull: {  "availabilityId": {"_id": mongoose.Types.ObjectId(body.availabilityId)}}})
      await Availability.deleteOne({_id: mongoose.Types.ObjectId(body.availabilityId )})
      return callback(messageHandler("Doctor availabilty successfully updated", true, SUCCESS, {}))
    } 
       let currentAvail = await Availability.updateOne({"availability.time._id": body.timeId, _id: body.availabilityId},  { $set: { "availability.$[].time.$[teeArray].startTime": time.startTime, "availability.$[].time.$[teeArray].endTime": time.endTime }
        
       }, { arrayFilters: [ { "teeArray._id": body.timeId } ]
     })
      return callback(messageHandler("Doctor Availability successfully updated", true, SUCCESS, {...currentAvail}))
    } catch (error) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))
    }
}  

const createAvailabilityService = async( body, callback) => {
    try {
        let avail  = new Availability({...body})
        await avail.save()
     let upp =   await Availability.findOne({_id: mongoose.Types.ObjectId(avail._id)})

     await Doctors.findOneAndUpdate({ _id: body.availability[0].doctorId}, 
          { $push: {
            "availabilityId": {
              "_id": upp._id,
              "day": body.availability[0].day        
        }
      }
    })
      return callback(messageHandler("Doctor Availability successfully created", true, SUCCESS, {avail}))
    } catch (error) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
    }
  }


const deleteDoctorAvailabilityService = async({param}, callback) => {
    try {
      Availability.findOne({ _id: mongoose.Types.ObjectId(param.availabilityId) }, async (err,  availability) => {
      if (err) {
        return callback(messageHandler("Unable to delete Availability, Please Try Again", false, BAD_REQUEST, {}))
      } if (availability === null) {
        return callback(messageHandler("No Availability with the details found, Please Try Again", false, BAD_REQUEST, {}))
      } else {
        Availability.deleteOne({ _id:mongoose.Types.ObjectId(param.availlabiltyId) }, (err, success) => {
          if (err) {
            return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, {}))
          } 
            return callback(messageHandler("Availlabilty successfully deleted", true, SUCCESS, success))
        })
      }
    })        
} catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
}
  }
module.exports = {registerDoctorService, forgotDoctorPasswordService, forgotPasswordCodeService, validateVerificationCodeService, updateDoctorAvailabilityService, setDoctorAvailabilityService, createAvailabilityService, deleteDoctorAvailabilityService }

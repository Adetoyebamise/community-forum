const { messageHandler, fileModifier, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Consultations }  = require("../../schema/consultationFormSchema/consultationForm")
const { Doctors } = require("../../schema/doctorsSchema/doctorSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const {ChildInformation} = require("../../schema/childInformation/childInformation")
const mongoose = require('mongoose');

const createPostConsultationService = async( body, callback) => {

    try {
        sik = await Caregiver.findOne({_id: body.caregiverId})
      if (sik === null) {
        return callback(messageHandler("Patient or Caregiver does not exist", false, BAD_REQUEST, {}))
       }
       const consultPost = new Consultations(body)
       await consultPost.save()
    await Doctors.updateOne({_id: body.doctorId}, {
        $push: {
            "consultationHistory": {
                "_id": mongoose.Types.ObjectId(),
                "presentingComplaint": body.presentingComplaint,
                "observations": body.observations,
                "childInformationId": body.childInformationId,
                "advise": body.advise,
                "workingDiagnosis": body.workingDiagnosis,
                "investigations": body.investigations,
                "investigations": body.prescriptionOrAdvise,
                "caregiverId": body.caregiverId,
                "referrals": body.referrals
            }
        }, 
    })
    await Caregiver.updateOne({_id: body.caregiverId}, {
      $push: {
          "consultationHistory": {
              "_id": mongoose.Types.ObjectId(),
              "presentingComplaint": body.presentingComplaint,
              "observations": body.observations,
              "childInformationId": body.childInformationId,
              "advise": body.advise,
              "workingDiagnosis": body.workingDiagnosis,
              "investigations": body.investigations,
              "investigations": body.prescriptionOrAdvise,
              "doctorId": body.doctorId,
              "referrals": body.referrals
          }
      }, 
  })
        return callback(messageHandler("Post Consultation Form successfully created", true, SUCCESS, consultPost))
    } catch (error) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message)) 
    }
}

const getPostConsultationHistoryService = async ( query,  callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt' , "Consultations" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, {totalConsult: 0, consult: [] }))
    }
    try {
      const consults = await Consultations.find({ ...params }).populate({path :'doctorId', select: "fullName"}).populate({path: 'caregiverId', select: "fullName"}).populate({path: "childInformationId", select: "childName ", model: ChildInformation}).limit(limit).skip(skip).sort(sort)
      let totalConsult = await Consultations.find({ ...params }).countDocuments()
      
      if (!consults.length > 0) {
        return callback(messageHandler("No consultation history available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Consultation history successfully fetched", true, SUCCESS, {totalConsult: totalConsult , consults }))
    } catch (err) {
      return callback(messageHandler(`${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports = { createPostConsultationService, getPostConsultationHistoryService }

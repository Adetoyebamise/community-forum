const {Consultations} = require("../../schema/consultationFormSchema/consultationForm")
const { ChildInformation } = require("../../schema/childInformation/childInformation")
const { queryConstructor, messageHandler} = require("../../utils/index")
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")


const getPostConsultationHistoryService = async ( {query, param},  callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt' , "Consultations" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, {totalConsult: 0, consult: [] }))
    }
    try {
      const consults = await Consultations.find({ ...params }).populate('doctorId').populate('caregiverId').populate({path: "childInformationId", select: "childName ", model: ChildInformation}).limit(limit).skip(skip).sort(sort)
      let totalConsult = await Consultations.find({ ...params }).countDocuments()
      
      if (!consults.length > 0) {
        return callback(messageHandler("No consultation history available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Consultation history successfully fetched", true, SUCCESS, {totalConsult: totalConsult , consults }))
    } catch (err) {
      return callback(messageHandler(`${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports = { getPostConsultationHistoryService }
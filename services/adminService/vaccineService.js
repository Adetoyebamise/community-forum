const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const Vaccine = require("../../schema/vaccineSchema/vaccineSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")

const createVaccineService = async (payload, callback) => {
  try {
    const vaccine = new Vaccine(payload)
    await vaccine.save()
    return callback(messageHandler("Vaccine Data successfully collected", true, SUCCESS, vaccine))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}

const getVaccineService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "vaccine" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalVaccine: 0, vaccine: [] }))
    }
    try {
      const vaccine = await Vaccine.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Vaccine.find({ ...params }).countDocuments()
      if (!vaccine.length > 0) {
        return callback(messageHandler("No available vaccine", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Available Vaccine Data fetched", true, SUCCESS, { totalVaccine:total, vaccine }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateVaccineService = async ({param, body}, callback) => {
  try {
      let result = await Vaccine.updateOne({ _id: param.vaccineId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Vaccine not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Vaccine Data successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, error.message));
  }
}

const deleteVaccineService =  ({ param}, callback) => {
  try {
    Vaccine.findOne({ _id: mongoose.Types.ObjectId(param.vaccineId) }, async (err,  vaccine) => {
        if (err) {
          return callback(messageHandler("Unable to delete vaccine data, Please Try Again", false, BAD_REQUEST, {}))
        } if (vaccine === null) {
          return callback(messageHandler("No vaccine with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            Vaccine.deleteOne({ _id:mongoose.Types.ObjectId(param.vaccineId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, {}))
            } 
              return callback(messageHandler("Vaccine Data successfully deleted", true, SUCCESS, success))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { createVaccineService, getVaccineService, updateVaccineService, deleteVaccineService }

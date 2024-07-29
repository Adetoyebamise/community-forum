const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const {Bookings} = require("../../schema/bookingSchema/bookingSchema")
const mongoose = require('mongoose');
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema");
const childInformation = require("../../schema/childInformation/childInformation");
const {BookVaccination} = require("../../schema/bookVaccinationSchema.js/bookVaccinationSchema");

const bookVaccinationService = async (payload, callback) => {
    const bookings = new BookVaccination(payload)
    await bookings.save((err, result) => {
        if (err) {
            return callback(messageHandler("Cannot book Vaccination", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Vaccination appointment Booked", false, SUCCESS, result))
        }
    })
}

const getBookedVaccinationService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, 'date', "BookedVaccination" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalbookedVaccination: 0, bookVaccination: [] }))
    }
    try{
        let key = Object.keys(param)[0]
        let value = Object.values(param)[0]
        const currentDate = new Date().toISOString()
        const bookVaccination = await BookVaccination.find({$or : [{...params, [key]: value, startDate: { $gt: currentDate} }, {...params, startDate: { $gt: currentDate}, Caregiver: {$elemMatch: { caregiverId: mongoose.Types.ObjectId(param.caregiverId)}}}]}).sort({startDate: 1}).skip(skip).limit(limit)
        const totalbookedVaccination = await BookVaccination.find({$or : [{...params, [key]: value, startDate: { $gt: currentDate} }, {...params, startDate: { $gt: currentDate}, caregiver: {$elemMatch: { caregiverId: mongoose.Types.ObjectId(param.caregiverId)}}}]}).countDocuments()

        if(bookVaccination.length === 0) {
            return callback(messageHandler("Bookings not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Booking fetched successfully", true, SUCCESS, { totalbookedVaccination: totalbookedVaccination, bookVaccination }))
    }
    catch(err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
    }
}

const updateBookedVaccinationService = async ({param, body}, callback) => {  
    try {
        let result = await BookVaccination.updateOne({ _id: param.bookVaccinationId }, { $set: { ...body } })
        if (result.modifiedCount == 0) {
             return callback(messageHandler("No Booked Vaccination found", false, BAD_REQUEST, {}))
            } else {
                return callback(messageHandler("Booking successfully updated", true, SUCCESS, result));
            } 
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message));
    }
}
  
  const deleteBookedVaccinationService =  ({ param }, callback) => {
    try {
        BookVaccination.deleteOne({ _id:mongoose.Types.ObjectId(param.bookVaccinationId) }, (err, booking) => {
        if (err) {
          return callback(messageHandler("An error Occurred, Please Try Again", false, BAD_REQUEST, {}))
        }
  
        if (booking.deletedCount === 0) {
          return callback(messageHandler("No booking with the details found, Please Try Again", false, BAD_REQUEST, {}))
        }
  
          return callback(messageHandler("booking successfully deleted", true, SUCCESS, booking))
      })
    } catch (error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
  }


module.exports = { bookVaccinationService , getBookedVaccinationService, updateBookedVaccinationService, deleteBookedVaccinationService}
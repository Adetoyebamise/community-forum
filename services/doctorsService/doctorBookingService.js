const { messageHandler, fileModifier, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const mongoose = require('mongoose');
const { Bookings } = require("../../schema/bookingSchema/bookingSchema")

const createBookingAcceptService = async ( body,  callback) => {
    try {
        let sik = await Doctors.findOne({_id:mongoose.Types.ObjectId(body.doctorId)}, {availability:mongoose.Types.ObjectId(body.availabilityId)})

   if (sik === null) {
    return callback(messageHandler("Availability not found", false, BAD_REQUEST, {}))
   }
     let booker = await Bookings.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.bookingsId)}, { $set: {status: 'ACCEPTED'} } )
      if (!booker){
        return callback(messageHandler("No bookings available", false, BAD_REQUEST, {}))
            }
            let acceptBookings = await Doctors.updateOne({bookingsId: {$elemMatch: {_id: mongoose.Types.ObjectId(body.bookingsId)}}}, { $set: {
    
                "bookingsId.$.status": "ACCEPTED",

            }
           })
     return callback(messageHandler("Your booking request has been accepted", true, SUCCESS, acceptBookings)) 
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))
    }
}


const createBookingRejectService = async ( body,  callback) => {
    try {
        let sik = await Doctors.findOne({_id:mongoose.Types.ObjectId(body.doctorId)}, {availability:mongoose.Types.ObjectId(body.availabilityId)})
   if (sik === null) {
    return callback(messageHandler("Availability not found", false, BAD_REQUEST, {}))
   }
     let booker = await Bookings.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.bookingsId)}, { $set: {status: 'REJECTED'} } )
      if (booker.modifiedCount === 0){
        return callback(messageHandler("No bookings available", false, BAD_REQUEST, {}))
            }
            let rejectBookings = await Doctors.updateOne({bookingsId: {$elemMatch: {_id: mongoose.Types.ObjectId(body.bookingsId)}}}, { $set: {

                "bookingsId.$.status": "REJECTED" 
            }
            })
   return callback(messageHandler("Your booking request has been rejected", true, SUCCESS, rejectBookings)) 
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))
    }
}

const getDoctorUpcomingBookingService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, 'date', "Bookings" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalBookings: 0, bookings: [] }))
    }
    try{
        let key = Object.keys(param)[0]
        let value = Object.values(param)[0]
        const currentDate = new Date().toISOString()
        const bookings = await Bookings.find({$or : [{...params, [key]: value, status: "ACCEPTED",  time: { $gt: currentDate} }, {...params, status: "ACCEPTED", time: { $gt: currentDate}, Doctors: {$elemMatch: { doctorId: mongoose.Types.ObjectId(param.doctorId)} }}]}).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).sort({time: 1}).skip(skip).limit(limit)
        const totalBookings = await Bookings.find({$or : [{...params, [key]: value, status: "ACCEPTED", time: { $gt: currentDate} }, {...params, status: "ACCEPTED", time: { $gt: currentDate}, Doctors: {$elemMatch: { doctorId: mongoose.Types.ObjectId(param.doctorId)}}}]}).countDocuments()

        if(bookings.length === 0) {
            return callback(messageHandler("Bookings not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Booking fetched successfully", true, SUCCESS, { totalBookings: totalBookings, bookings }))
    }
    catch(err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
    }
}

const getDoctorPendingBookingService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, 'date', "Bookings" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalBookings: 0, bookings: [] }))
    }
    try{
        let key = Object.keys(param)[0]
        let value = Object.values(param)[0]
        const currentDate = new Date().toISOString()
        const bookings = await Bookings.find({$or : [{...params, [key]: value, status: "PENDING",  time: { $gt: currentDate} }, {...params, status: "PENDING", time: { $gt: currentDate}, Doctors: {$elemMatch: { doctorId: mongoose.Types.ObjectId(param.doctorId)} }}]}).sort({time: 1}).populate({path:"caregiverId", select:"fullName role imageUrl", model: Caregiver}).skip(skip).limit(limit)
        const totalBookings = await Bookings.find({$or : [{...params, [key]: value, status: "PENDING", time: { $gt: currentDate} }, {...params, status: "PENDING", time: { $gt: currentDate}, Doctors: {$elemMatch: { doctorId: mongoose.Types.ObjectId(param.doctorId)}}}]}).countDocuments()

        if(bookings.length === 0) {
            return callback(messageHandler("Bookings not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Booking fetched successfully", true, SUCCESS, { totalBookings: totalBookings, bookings }))
    }
    catch(err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
    }
}
module.exports = { createBookingAcceptService, createBookingRejectService, getDoctorUpcomingBookingService, getDoctorPendingBookingService }

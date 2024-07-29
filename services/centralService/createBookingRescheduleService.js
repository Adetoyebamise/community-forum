const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const {Bookings} = require("../../schema/bookingSchema/bookingSchema")
const mongoose = require('mongoose');
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema");
const { Availability } = require("../../schema/availabilitySchema/availabilitySchema")

const createBookingRescheduleService = async ( body, callback) => {
    try {
        let avail = await Doctors.findOne( {_id: body.doctorId}) 
    if (!avail) {
        return callback(messageHandler("Doctor not available", false, BAD_REQUEST, {}))
    }

       let doctorActive = await Availability.findOne({ _id: body.availabilityId })

       if (!doctorActive) {
        return callback(messageHandler("Doctor not available, kindly choose another available date", false, BAD_REQUEST, {}))
       }
      let cart = await doctorActive.availability[0].time.filter(doctorActive => ((doctorActive.startTime === body.time) && (doctorActive.endTime === body.endTime)))

      if (cart) { 
        const bookings = new Bookings(body)
        let bok = await bookings.save()
        await Doctors.updateOne({_id: body.doctorId}, { $push: {
                
                      "bookingsId": {
                      "_id": bok._id,
                      "day": body.day,
                      "caregiverId": body.caregiverId
                      },
                  }
                })
   
       await Doctors.updateOne({_id: mongoose.Types.ObjectId(body.doctorId )},{$pull: {

            "bookingsId": {
                "_id": mongoose.Types.ObjectId(body.bookingsId)
            }
         }
        })
    
     await Bookings.deleteOne({_id: mongoose.Types.ObjectId(body.bookingsId )})
    
     return callback(messageHandler("Booking reschedule successfully created ", true, SUCCESS, bok ))

    } else {
       return callback(messageHandler("Unable to reschedule Booking, choose other available dates", false, BAD_REQUEST, err.message, {}))
     }
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))
    }
}

const getDoctorsListService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "doctors" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctors: 0, doctors: [] }))
    }
    try {
        const doctors =  await Doctors.find({status: "ACTIVE" }).limit(limit).skip(skip).sort(sort)
        let totalDoctors = await Doctors.find({status: "ACTIVE"}).countDocuments()
        if(!doctors.length > 0) {
            return callback(messageHandler("No doctors available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Doctors successfully fetched", true, SUCCESS, { totalDoctors, doctors }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

module.exports = { createBookingRescheduleService, getDoctorsListService }

const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const {Bookings} = require("../../schema/bookingSchema/bookingSchema")
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { Availability } = require("../../schema/availabilitySchema/availabilitySchema")
const mongoose = require('mongoose');

const getCaregiversListService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "caregivers" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalCaregivers: 0, caregivers: [] }))
    }
    try {
        const caregivers =  await Caregiver.find({ ...params }).limit(limit).skip(skip).sort(sort)
        let totalCaregivers = await Caregiver.find({ ...params }).countDocuments()
        if(!caregivers.length > 0) {
            return callback(messageHandler("No caregivers available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Caregivers successfully fetched", true, SUCCESS, { totalCaregivers, caregivers }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const updateCaregiverStatusService = async ({param, body}, callback) => {
    Caregiver.updateOne({ _id: mongoose.Types.ObjectId(param.caregiverId) }, { $set: { ...body } }, (err, caregiver) => {
        if(err) {
            return callback(messageHandler("An error occured", false, BAD_REQUEST, {}))
        } else if(caregiver.modifiedCount === 0) {
            return callback(messageHandler("Caregiver not found", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Caregiver successfully updated", true, SUCCESS, caregiver))
        }
    })
}

const searchCaregiverService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "caregiver" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalCaregivers: 0, caregivers: [] }))
    }
    try {
        const results = await Caregiver.find({ ...params, fullName: { $regex: params.search, $options: "i" } }).limit(limit).skip(skip).sort(sort)
        const totalresults = await Caregiver.find({ ...params, fullName: { $regex: params.search, $options: "i" } }).countDocuments()
        if(!results.length > 0) {
            return callback(messageHandler("No caregiver available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Caregivers successfully fetched", true, SUCCESS, { totalCaregivers: totalresults, caregivers: results }))
    }
    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const deleteCaregiverService = (param, callback) => {
    Caregiver.deleteOne({ _id: mongoose.Types.ObjectId(param.caregiverId) }, (err, caregiver) => {
        if(err) {
            return callback(messageHandler("An error occured", false, BAD_REQUEST, {}))
        } else if(caregiver.deletedCount === 0) {
            return callback(messageHandler("Caregiver not found", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Caregiver successfully deleted", true, SUCCESS, caregiver))
        }
    })
}

const createBookingService = async ( payload, callback ) => {

    try {
    if (payload.payload.typeOfService === 'Wellness Checkup') {
            
                let avail = await Doctors.findOne( {_id: payload.payload.doctorId}) 
            if (!avail) {
                return callback(messageHandler("Doctor not available", false, BAD_REQUEST, {}))
            }
        
               let doctorActive = await Availability.findOne({ _id: payload.payload.availabilityId })
        
               if (!doctorActive) {
                return callback(messageHandler("Doctor not available, kindly choose another available date", false, BAD_REQUEST, {}))
               }
              let cart = await doctorActive.availability[0].time.filter(doctorActive => ((doctorActive.startTime === payload.payload.time) && (doctorActive.endTime === payload.payload.endTime)))
        
              if (cart) { 
                const bookings = new Bookings(payload.payload)
                let bok = await bookings.save()
                await Doctors.updateOne({_id: payload.payload.doctorId}, { $push: {
                        
                              "bookingsId": {
                              "_id": bok._id,
                              "day": payload.payload.day,
                              "caregiverId": payload.payload.caregiverId
                              }
                          }
                        })
             return callback(messageHandler("Doctor wellness appointment Booked", true, SUCCESS, bok))
        } 
    }
        else if (payload.payload.typeOfService === "Virtual Consultation") {
                let avail = await Doctors.findOne( {_id: payload.payload.doctorId}) 
    if (!avail) {
        return callback(messageHandler("Doctor not available", false, BAD_REQUEST, {}))
    }
       let doctorActive = await Availability.findOne({ _id: payload.payload.availabilityId })
       if (!doctorActive) {
        return callback(messageHandler("Doctor not available, kindly choose another available date", false, BAD_REQUEST, {}))
       }
      let cart = await doctorActive.availability[0].time.filter(doctorActive => ((doctorActive.startTime === payload.payload.time) && (doctorActive.endTime === payload.payload.endTime)))
      if (cart) { 
        const bookings = new Bookings(payload.payload)
        let bok = await bookings.save()
        const detailBok = bok.populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
        await Doctors.updateOne({_id: payload.payload.doctorId}, { $push: {
                      "bookingsId": {
                      "_id": bok._id,
                      "day": payload.payload.day,
                      "caregiverId": payload.payload.caregiverId
                      }
                  }
                })
     return callback(messageHandler("Doctor virtual consultation appointment Booked", true, SUCCESS, bok))
            }
    } else {
        return callback(messageHandler("Unable to create Booking, choose other available dates", false, BAD_REQUEST, err.message, {}))
    }
    } catch (err) {
        return callback(messageHandler("Unable to create Booking, kindly choose another available date", false, BAD_REQUEST, err.message, {}))
    }
}
  



module.exports = { getCaregiversListService, updateCaregiverStatusService, searchCaregiverService, deleteCaregiverService, createBookingService } 

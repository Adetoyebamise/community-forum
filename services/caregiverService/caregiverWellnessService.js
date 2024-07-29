const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const {Bookings} = require("../../schema/bookingSchema/bookingSchema")
const mongoose = require('mongoose');
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema");
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { Availability } = require("../../schema/availabilitySchema/availabilitySchema")


const createWellnessBookingService = async ({payload, param}, callback) => {
    try {
        let validatite = await verifyPaystackPaymentService(payload)
    if (!validatite) {
        return callback(messageHandler("Please do kindly Subscribe", false, BAD_REQUEST, {}))
    }
        let avail = await Doctors.findOne( {_id: payload.doctorId}) 
    if (!avail) {
        return callback(messageHandler("Doctor not available", false, BAD_REQUEST, {}))
    }
       let doctorActive = await Availability.findOne({ _id: payload.availabilityId })
       if (!doctorActive) {
        return callback(messageHandler("Doctor not available, kindly choose another available date", false, BAD_REQUEST, {}))
       }
      let cart = await doctorActive.availability[0].time.filter(doctorActive => ((doctorActive.startTime === payload.time) && (doctorActive.endTime === payload.endTime)))
      if (cart) { 
        Caregiver.find({_id : mongoose.Types.ObjectId(payload.caregiverId)}, async (err, caregiver) => {
            const customerPlan = caregiver[0].plan[0]
            const custormerPlanVerified = caregiver[0].plan[1] 
            if (customerPlan && custormerPlanVerified.isSubscribed) {
                const bookings = new Bookings(payload)
                let bok = await bookings.save()
                const detailBok = bok.populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
                const careBok = bok.populate({path:"caregiverId", select:"fullName roleDescription imageUrl", model: Caregiver})
                await Doctors.updateOne({_id: payload.doctorId}, { $push: {
                    "bookingsId": {
                        "_id": bok._id,
                        "day": payload.day,
                        "caregiverId": payload.caregiverId
                      }
                  }
              })
              let { wellnessCheckup } = customerPlan
              let { planDurationId, subscriptionName, isSubscribed} = custormerPlanVerified
              wellnessCheckup = wellnessCheckup ? Number(wellnessCheckup) : 0
              if (wellnessCheckup && wellnessCheckup > 0  ) {
                  // reduce by updating
                  await Caregiver.findOneAndUpdate({ _id:mongoose.Types.ObjectId(caregiverId)}, { $inc: {"plan.0.wellnessCheckup" : -1 } }, {multi: true })
                  return callback(messageHandler(`Doctor appointment Booked: Type of Service ${typeOfService}`, true, SUCCESS, bok))
                  } 
              else if ( wellnessCheckup === 0) {
                  return callback(messageHandler("You Exhausted your subscription Services" , false, BAD_REQUEST, {}))
              } else {
                      return callback(messageHandler("subscription Due for renewal" , false, BAD_REQUEST, {}))
              }                
          } else {
           return callback(messageHandler("You have no subscription plan, kindly subscribe", false, BAD_REQUEST, {}))
          }
        })
  } else {
      return callback(messageHandler("Unable to create Booking, choose other available dates", false, BAD_REQUEST, err.message, {}))
   }
  } catch (err) {
      return callback(messageHandler("Unable to create Booking", false, BAD_REQUEST, err.message, {}))
  }
} 

const getUpcomingWellnessEventService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, 'date', "Event" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalEvents: 0, events: [] }))
    }
    try{
        let key = Object.keys(param)[0]
        let value = Object.values(param)[0]
        const currentDate = new Date().toISOString()
        const bookings = await Bookings.find({$or : [{...params, [key]: value, startDate: { $gt: currentDate} }, {...params, startDate: { $gt: currentDate}, Caregiver: {$elemMatch: { caregiverId: mongoose.Types.ObjectId(param.caregiverId)}}}]}).sort({startDate: 1}).skip(skip).limit(limit)
        const totalBookings = await Bookings.find({$or : [{...params, [key]: value, startDate: { $gt: currentDate} }, {...params, startDate: { $gt: currentDate}, caregiver: {$elemMatch: { caregiverId: mongoose.Types.ObjectId(param.caregiverId)}}}]}).countDocuments()

        if(bookings.length === 0) {
            return callback(messageHandler("Bookings not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Booking fetched successfully", true, SUCCESS, { totalBookings: totalBookings, bookings }))
    }
    catch(err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
    }
}

const updateWellnessEventService = async ({param, body}, callback) => {  
    try {
        let result = await Bookings.updateOne({ _id: param.bookingId }, { $set: { ...body } })
        if (result.modifiedCount == 0) {
             return callback(messageHandler("Booking not found", false, BAD_REQUEST, {}))
            } else {
                return callback(messageHandler("Booking successfully updated", true, SUCCESS, result));
            } 
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message, {}));
    }
  }
  
  const deleteWellnessEventService  =  ({ param }, callback) => {
    try {
      Bookings.deleteOne({ _id:mongoose.Types.ObjectId(param.bookingId) }, (err, booking) => {
        if (err) {
          return callback(messageHandler("An error Occurred, Please Try Again", false, BAD_REQUEST, {}))
        }
  
        if (booking.deletedCount === 0) {
          return callback(messageHandler("No booking with the details found, Please Try Again", false, BAD_REQUEST, {}))
        }
  
          return callback(messageHandler("booking successfully deleted", true, SUCCESS, success))
      })
    } catch (error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
  }

module.exports = {createWellnessBookingService, getUpcomingWellnessEventService,updateWellnessEventService ,deleteWellnessEventService}
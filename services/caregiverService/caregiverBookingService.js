const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor, AlphaNumeric, camelize, formatDate} = require("../../utils/index")
const {Bookings} = require("../../schema/bookingSchema/bookingSchema")
const mongoose = require('mongoose');
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema");
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { Availability } = require("../../schema/availabilitySchema/availabilitySchema")
const { conn } = require("../../mongoConnection");
const { newMeeting } = require("../../modules/zoom/zoom");
const { sendMailNotification, sendMultiEmailNotification } = require("../../modules/notification/email")
const { createPaymentNotificationService } = require("../../services/centralService/notificationService")

const createCaregiverBookingService = async (payload, callback) => {
    let uniqueId = AlphaNumeric(4, 'numeric')
    let {caregiverId, typeOfService, time } = payload
    var camelizeTypeOfService = camelize(`${typeOfService}`)
    try {
        let doctorToSessionWith = await Doctors.findOne( {_id: payload.doctorId}) 
        if (!doctorToSessionWith) {
        return callback(messageHandler("Doctor not available for consultation", false, BAD_REQUEST, {}))
        }
       let doctorActive = await Availability.findOne({ _id: payload.availabilityId })
       const doctorAvailabiltySetTimes = doctorActive.availability[0].time
       const getMeetingTimestoMail = (getTime) => { 
        return getTime.filter( doctorTimeranges => time.some(doctorTimerangesTwo => doctorTimeranges.startTime === doctorTimerangesTwo.startTime))
       }
       const getMeetingTimestoMailToRefine = getMeetingTimestoMail(doctorAvailabiltySetTimes)
       const mappedData = getMeetingTimestoMailToRefine.map(({startTime, endTime})  => ({startTime, endTime}))
       var result = mappedData.reduce(function(acc, obj) {
        acc.push(obj.startTime) 
        acc.push(obj.endTime);
        return acc;
      }, [])
       const formattedDate = formatDate(result)
       if (!doctorActive) {
        return callback(messageHandler("Doctor not available, kindly choose another available date", false, BAD_REQUEST, {}))
       }
      let cart = await doctorActive.availability[0].time.filter(doctorActive => ((doctorActive.startTime === payload.time) && (doctorActive.endTime === payload.endTime)))
      if (cart) { 
          Caregiver.find({_id : mongoose.Types.ObjectId(caregiverId)}, async (err, caregiver) => {
              const customerPlan = caregiver[0].plan[0]
              const custormerPlanVerified = caregiver[0].plan[1] 
              if (customerPlan && custormerPlanVerified.isSubscribed) {
                const savedData = { ...payload, uniqueId }
                let bookings = new Bookings(savedData)
                let bok = await bookings.save()
                const detailBok = bok.populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
                const careBok = bok.populate({path:"caregiverId", select:"fullName roleDescription imageUrl", model: Caregiver})
                await Doctors.updateOne({_id: payload.doctorId}, { $push: {"bookingsId": {"_id": bok._id, "day": payload.day,"caregiverId": payload.caregiverId }}})
                var {chat, planAmount, wellnessCheckup, virtualConsultation, endDate, StartDate } = customerPlan
                chat == chat ? Number(chat) : 0 
                wellnessCheckup == wellnessCheckup ? Number(wellnessCheckup) : 0
                virtualConsultation == virtualConsultation ? Number(wellnessCheckup) : 0
                camelizeTypeOfService = virtualConsultation 
                if (camelizeTypeOfService && camelizeTypeOfService > 0  ) {
                    await Caregiver.findOneAndUpdate({ _id:mongoose.Types.ObjectId(caregiverId)}, { $inc: {"plan.0.virtualConsultation" : -1 } }, {multi: true })
                    const zoomMeeting = await newMeeting({topic : payload.topic, start_time: payload.start_time, password : payload.password, agenda : payload.agenda}, caregiver[0].zoomId)
                    if (zoomMeeting.status = "") {
                        throw new Error("something went wrong, zoom meeting not created")
                    }
                        bookings.hostMeetingLink = zoomMeeting.start_url
                        bookings.joinMeetingLink = zoomMeeting.join_url
                        await bookings.save()
                        const substitutional_parameters = { caregiverName : caregiver[0].fullName, caregiverEmail : caregiver[0].emailAddress, hostMeetingLink: zoomMeeting.start_url, joinMeetingLink: zoomMeeting.join_url, doctorName: doctorToSessionWith.fullName, doctorEmail: doctorToSessionWith.emailAddress,  formattedDate: formattedDate } 
                        await sendMailNotification(caregiver[0].emailAddress, `${typeOfService}`, substitutional_parameters, "BOOKING_REQUEST", true )
                        await sendMailNotification( doctorToSessionWith.emailAddress, `${typeOfService}`, substitutional_parameters, "BOOKING_REQUEST_DOC", true )
                        const data = {doctorId : doctorToSessionWith._id, text:`Earning from ${typeOfService}`, amount: 300 }
                        await createPaymentNotificationService(data)
                        return callback(messageHandler(`Doctor appointment Booked: Type of Service ${typeOfService}`, true, SUCCESS, bok))
                    } 
                    else if (camelizeTypeOfService === 0) {
                        return callback(messageHandler("You Exhausted your subscirption Services" , false, BAD_REQUEST, {}))
                    } else {
                        return callback(messageHandler("subscription Due for renewal" , false, BAD_REQUEST, {}))
                    }
                } else {
                return callback(messageHandler("No available subscription plan", false, BAD_REQUEST, {}))
                }
           })
        } else {
            return callback(messageHandler("Unable to create Booking, choose other available dates", false, BAD_REQUEST, err.message, {}))
        }
    } catch (err) {
        return callback(messageHandler("Unable to create Booking", false, BAD_REQUEST, err.message, {}))
    }
} 

const getUpcomingDoctorEventService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, { status: "status", createdAt: 'createdAt'}, "Booking" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalEvents: 0, events: [] }))
    }
    try{
        let key = Object.keys(param)[0]
        let value = Object.values(param)[0]
        const currentDate = new Date().toISOString()
        let bookings = await Bookings.aggregate([
            {
                $lookup: {
                    from: "availability",
                    localField: "availabilityId",
                    foreignField: "_id",
                    as: "availabilityId"
                }
            },
            { $unwind: {path: "$availability", preserveNullAndEmptyArrays: true} },
            {
                $lookup: {
                    from: "doctors",       
                    localField: "doctorId",  
                    foreignField: "_id",
                    as: "doctorId"     
                }
            },
            { $unwind: {path: "$doctors", preserveNullAndEmptyArrays: true} },     // $unwind used for getting data in object or for one record only
        ]).skip(skip).limit(limit).sort(sort);
        const totalBookings = await Bookings.find({$or : [{...params, [key]: value, time: { $gt: currentDate} }, {...params, time: { $gt: currentDate}, caregiver: {$elemMatch: { caregiverId: mongoose.Types.ObjectId(param.caregiverId)}}}]}).countDocuments()

        if(bookings.length === 0) {
            return callback(messageHandler("Bookings not found", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Booking fetched successfully", true, SUCCESS, { totalBookings: totalBookings, bookings }))
    }
    catch(err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
    }
}

const updateBookingService = async ({param, body}, callback) => {  
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
  
  const deleteBookingEventService  =  ({ param }, callback) => {
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

module.exports = {createCaregiverBookingService, getUpcomingDoctorEventService,updateBookingService ,deleteBookingEventService}
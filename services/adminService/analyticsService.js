const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const { Bookings } = require("../../schema/bookingSchema/bookingSchema");
const { Doctors } = require("../../schema/doctorsSchema/doctorSchema");
const { SocketCollection } = require('../../schema/socketConnectionSchema')
const  { Post }  = require("../../schema/forumSchema/postSchema")
const {Consultations} = require("../../schema/consultationFormSchema/consultationForm")

const getAnalyticsService = async (callback) => {
    try{
        const registeredCaregivers = await Caregiver.find().countDocuments()
        const onlineCaregivers = await SocketCollection.find({externalModelType: "Caregivers"}).countDocuments()
        const activeCaregivers = await Caregiver.find({status: "ACTIVE"}).countDocuments()
        const registeredDoctors = await Doctors.find().countDocuments()
        const onlineDoctors = await SocketCollection.find({externalModelType: "Doctors"}).countDocuments()
        const activeDoctors = await Doctors.find({status: "ACTIVE"}).countDocuments()
        const totalConsultations = await Caregiver.find().countDocuments()
        const pendingBookings = await Bookings.find({status: "PENDING"}).countDocuments()

        let analytics = { registeredCaregivers, onlineCaregivers, activeCaregivers, registeredDoctors, onlineDoctors, activeDoctors, totalConsultations, pendingBookings };
        return callback(messageHandler("Analytics generated successfully", true, SUCCESS, analytics ));
    }
    catch(err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message));
    }
}

const getBookingAnalyticsService = async (callback) => {
    try{
        const totalConsultationsCompleted = await Consultations.find().countDocuments()
        const pendingBookings = await Bookings.find({status: "PENDING"}).countDocuments()
        const completedBooking = await Bookings.find({status: "COMPLETED"}).countDocuments()
        const ongoingBooking = await Bookings.find({status: "ONGOING"}).countDocuments()
        let analytics = { totalConsultationsCompleted, pendingBookings,ongoingBooking, completedBooking };
        return callback(messageHandler("Analytics generated successfully", true, SUCCESS, analytics ));
    }
    catch(err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message));
    }
}

const getUserStatAnalyticsService = async (callback) => {
    try {
        const registeredCaregivers = await Caregiver.find().countDocuments()
        const registeredDoctors = await Doctors.find().countDocuments()
        const registerdUsers = registeredCaregivers + registeredDoctors
        const registeredCaregiversPercentage = registeredCaregivers/registerdUsers * 100
        const registeredDoctorsPercentage = registeredDoctors/registerdUsers * 100
        let userStatAnalytics = { registeredCaregiversPercentage, registeredDoctorsPercentage }
        return callback(messageHandler("Analytics generated successfully", true, SUCCESS, userStatAnalytics ));
    } catch (error) {
        return callback(messageHandler("Something went wrong: can't fetch user stat", false, BAD_REQUEST, error));
    }
}

const getSpecialistStatService = async (callback) => {
    try {
        const registeredDoctors = await Doctors.find().countDocuments()
        const lactationistSpecialist = await Doctors.find({role: "Lactationist"}).countDocuments()
        const dentistSpecialist = await Doctors.find({role: "Dentist"}).countDocuments()
        const generalPractitionerSpecialist = await Doctors.find({role: "General Practitioner"}).countDocuments()
        const dermatologistSpecialist = await Doctors.find({role: "Dermatologist"}).countDocuments()
        const therapistSpecialist = await Doctors.find({role: "Therapist"}).countDocuments()
        const paediatricianSpecialist = await Doctors.find({role: "Paediatrician"}).countDocuments()
        const nutritionistSpecialist = await Doctors.find({role: "Nutritionist"}).countDocuments()

        const lactationistSpecialistPercentage = lactationistSpecialist/registeredDoctors * 100
        const dentistSpecialistPercentage = dentistSpecialist/registeredDoctors * 100
        const generalPractitionerSpecialistPercentage = generalPractitionerSpecialist/registeredDoctors * 100
        const dermatologistSpecialistPercentage = dermatologistSpecialist/registeredDoctors * 100
        const therapistSpecialistPercentage = therapistSpecialist/registeredDoctors * 100
        const paediatricianSpecialistPercentage = paediatricianSpecialist/registeredDoctors * 100
        const nutritionistSpecialistPercentage = nutritionistSpecialist/registeredDoctors * 100

        let specialistStatAnalytics = { lactationistSpecialistPercentage,dentistSpecialistPercentage , generalPractitionerSpecialistPercentage, dermatologistSpecialistPercentage, therapistSpecialistPercentage, paediatricianSpecialistPercentage, nutritionistSpecialistPercentage}
        return callback(messageHandler("Specialist Analytics generated successfully", true, SUCCESS, specialistStatAnalytics));
    } catch (error) {
        return callback(messageHandler("Something went wrong: can't fetch specialist stat", false, BAD_REQUEST, error.message));
    }
}

const getUserActivityService = async ({query, param}, callback) => {
    const date = new Date()
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "date" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalUserActivity: 0, activity: [] }))
    }
    try {
        let monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct", "Nov", "Dec"]
        const post = await Post.find({caregiverId: {$exists: true }})
        let array = []
        for (let index = 1; index < 13; index++) {
        // index = ("0" + index).slice(-2)

        const data = post.filter(element => {
            return element.createdAt.getMonth() + 1 === index
        });
        array.push({[monthArray[index]]: data.length * 100})

        }
        const docPost = await Post.find({doctorId: {$exists: true }})
        let docArray = []
        for (let index = 1; index < 13; index++) {
        // index = ("0" + index).slice(-2)
        const docData = docPost.filter(element => {
            return element.createdAt.getMonth() + 1 === index
        });
        docArray.push({[monthArray[index]]: docData.length * 100})
        }
        if(!post.length > 0) {
            return callback(messageHandler("No userActivity available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("userActivity successfully fetched", true, SUCCESS, { array : array , docArray:docArray }))
    }

    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}

const getYearlyUserActivityService = async ({query, param}, callback) => {
    const date = new Date()
    const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "date" )
    if(error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalUserActivity: 0, activity: [] }))
    }
    try {
        const post = await Post.find({caregiverId: {$exists: true }})
        let yearArray = []
        for (let index = 2000; index < index.length ; index++) {
        // index = ("0" + index).slice(-2)

        const data = post.filter(element => {
            return element.createdAt.getFullYear() === index
        });
        console.log("data", data)
        yearArray.push({[yearArray[index]]: data.length * 100})
        }
        const docPost = await Post.find({doctorId: {$exists: true }})
        let docArray = []
        for (let index = 0; index < index.length; index++) {
        // index = ("0" + index).slice(-2)
        const docData = docPost.filter(element => {
            return element.createdAt.getFullYear()  
        });
        console.log("docData", docData)
        docArray.push({[docArray[index]]: docData.length * 100})
        }
        if(!post.length > 0) {
            return callback(messageHandler("No Annual User Activity available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Annual User Activity successfully fetched", true, SUCCESS, { yearArray : yearArray , docArray:docArray }))
    }

    catch(error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
}
module.exports = { getAnalyticsService, getUserStatAnalyticsService, getSpecialistStatService, getBookingAnalyticsService, getUserActivityService, getYearlyUserActivityService }
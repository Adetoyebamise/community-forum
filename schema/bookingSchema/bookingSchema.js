const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookSchedule: {
        type: String,
    },
    consultationType: {
        type: String,
        enum: ["Paediatrician", "General Practitioner", "Dentist", "Lactationist", "Dermatologist", "Therapist", "Nutritionist"]
    },
    bookWellnessCheckup: {
        type: String,
    },
    timePeriods: {
        type: String,
     },
    typeOfService: {
        type: String,
        required: true,
        enum: ["Wellness Checkup", "Virtual Consultation"]
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum : ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    },
    uniqueId : {
        type: Number,
    },
    hostMeetingLink : {
        type : String
    },
    joinMeetingLink : {
        type : String
    },
    doctorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctors'
    },
    caregiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver'
    },
    availability: {
    type: Boolean,
    default: true
    },
    availabilityId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Doctors'
    },
    timeInterval: {
    type: String,
    ref: 'Doctors'
    },
},  { timestamps: true })

let bookings = mongoose.model('Bookings', bookingSchema, 'bookings')
module.exports = { Bookings:bookings }
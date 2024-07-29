const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Paediatrician", "General Practitioner", "Dentist", "Lactationist", "Dermatologist", "Therapist", "Nutritionist"]
    },
    phoneNumber: {
        type: String,
        required: true
    },
    verificationCode : {
        type: String
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    profileURL : {
        type: String,
    },
    medicalLicenseURL : {
        type: String,
        // required: true
    },
    validIdCardURL : {
        type: String,
        // required: true,
        enum: ["NationalIdCard", "DriversLicense"]
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    cityOrState: {
        type: String,
        required: true
    },
    posts: {
        type: Array,       
    },
    is_SavedPosts: {
        type: Array
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    timePeriods: {
        type: String
     },
    timeInterval: {
        type: String
    },
    status: {
        type: String,
        enum: ["PENDING", "ACTIVE", "RESTRICTED"],
        default: "PENDING",
    },
   emailToken: {
       type: String
   },
   bio: {
    type: String
   },
   consultationHistory: {
       type: Array,
       ref: "Consultations"
   },
   isVerified: {
       type: Boolean,
       default: false
   },
   availabilityId: [{
    //   type: Object,
     _id :  { type : mongoose.Types.ObjectId,
      ref: "Availability"
    },
    day : String
   }],
   bookingsId: {
     type: Array,
     ref: "Bookings"
   },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true})

let doctors = mongoose.model('Doctors',  doctorSchema, 'doctors' );
module.exports = {Doctors: doctors}

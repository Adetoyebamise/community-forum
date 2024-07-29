const mongoose = require('mongoose');

const bookVaccinationSchema = new mongoose.Schema({
    childInformation: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ChildInformation'
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    allergies : {
        type : String,
        required : true
    },
    specialNeedsPartA : {
        type : String,
        required : true
    },
    specialNeedsPartB: {
        type : String,
        required : true
    },
    vaccineType: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'vaccine'
    },
},  { timestamps: true })

let bookVaccination = mongoose.model('BookVaccination', bookVaccinationSchema, 'bookVaccination')
module.exports = { BookVaccination:bookVaccination }
const mongoose = require("mongoose");

let vaccineSchema = new mongoose.Schema({
 vaccineName : {
    type: String,
    required: true
 },
 vaccineType : {
    type : String,
    required: true
 },
 vaccineDescription: {
    type: String,
    required: true
 },
 periodOfVaccination: {
    startDate: String,
    endDate: String,
 },
}, {timestamps: true})

module.exports = mongoose.model("Vaccine", vaccineSchema )
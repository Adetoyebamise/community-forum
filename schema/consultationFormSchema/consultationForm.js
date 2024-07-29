const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let consultationSchema = new Schema({
    caregiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Caregiver"
    },
    doctorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors"
    },
    childInformationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "childInformation"
    },
    presentingComplaint: {
        type: String,
        required: true
    },
    observations: {
        type: String
    },
    workingDiagnosis: {
        type: String,
        required: true
    },
    investigations: {
        type: String
    },
    prescription: {
        type: String,
        required: true
    },
    advise: {
        type: String,
        required: true
    },
    referrals: {
        type: String
    }
}, { timestamps: true})

let consultations = mongoose.model('Consultations', consultationSchema, 'consultations' );
module.exports = { Consultations: consultations }
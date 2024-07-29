const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let doctorAvailabilitySchema = new Schema({

availability: [{
    day: String,
    time: [{ startTime: String, endTime: String}],
    doctorId: {
        type: String,
        ref: 'Doctors'
    }
}],
isActive: {
    type: Boolean,
    default: true,
}
}, { timestamps: true})

let availability = mongoose.model('Availability', doctorAvailabilitySchema, 'availability' );
module.exports = {Availability: availability}
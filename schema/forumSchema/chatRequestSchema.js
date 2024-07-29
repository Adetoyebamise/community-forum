const mongoose = require('mongoose');

const chatRequestSchema = new mongoose.Schema({
doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctors',
      required: true
   },
caregiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver',
    required: true
 },
hasExpired: {
   type: Boolean,
   default: false,
   // required: true
},
status: {
    type: String,
    default: "PENDING",
   //  required: true
 }
}, {timestamps: true})

module.exports = mongoose.model('ChatRequest', chatRequestSchema);

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
       roomName: {
        type: String,
        enum: ["Paediatrician", "General Practitioner", "Dentist", "Lactationist", "Dermatologist", "Therapist", "Nutritionist"],
    },
       chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
       },
//       doctorId: {
//         type: mongoose.Schema.Types.ObjectId,         // each comment can only relates to one Post, so it's not in array    
//         ref: 'Doctors'
//       },
//       caregiverId: {
//       type: mongoose.Schema.Types.ObjectId,         // each comment can only relates to one Post, so it's not in array    
//       ref: 'Caregiver'
//    },

},  { timestamps: true})

let rooms = mongoose.model('Rooms', roomSchema, 'rooms')
module.exports = { Rooms:rooms }
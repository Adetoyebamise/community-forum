const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
text: {
      type: String,
      trim: true,
      required: true
   },
chatRoom: {
   type: mongoose.Schema.Types.ObjectId,           
   ref: 'Rooms'
},
doctorId: {
      type: mongoose.Schema.Types.ObjectId,        
      ref: 'Doctors'
   },
caregiverId: {
    type: mongoose.Schema.Types.ObjectId,           
    ref: 'Caregiver'
 },
chatRequestId: {
   type: mongoose.Types.ObjectId,
   ref: 'ChatRequest'
},
type : {
   type : String
},
}, {timestamps: true})

module.exports = mongoose.model('Chat', chatSchema);

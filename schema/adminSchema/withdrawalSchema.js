const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    doctorId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctors'
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum : ['PENDING', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING'
    },
},  { timestamps: true })

let withdrawals = mongoose.model('Withdrawals', withdrawalSchema, 'withdrawals')
module.exports = { Withdrawals: withdrawals }
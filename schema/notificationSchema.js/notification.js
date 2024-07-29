const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
   doctorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Doctors'
     },
   caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caregiver'
   },
   adminId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Admin'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active'
    },
    amount: { 
        type : Number
    }
}, {timestamps : true});

const paymentNotificationSchema = new mongoose.Schema({
    doctorId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Doctors'
      },
    adminId: {
     type: mongoose.Schema.Types.ObjectId,  
     ref: 'Admin'
     },
     title: {
         type: String,
     },
     text: {
         type: String,
         required: true
     },
     amount: { 
         type : Number
     }
 }, {timestamps : true});

const notification = mongoose.model('Notification', notificationSchema, 'notifications')
const paymentnotification = mongoose.model('Paymentnotification', paymentNotificationSchema, 'paymentnotifications')

module.exports = { Notification: notification , Paymentnotification: paymentnotification }

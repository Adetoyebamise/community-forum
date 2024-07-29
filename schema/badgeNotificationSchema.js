const mongoose = require('mongoose');

const badgeNotificationSchema = new mongoose.Schema({
    caregiverId : {
        type: String,
    },
    doctorId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    title : {
        type: String,
        required: true,
    },
    momTypes : {
        type: String,
    },
    doctorTypes : {
        type: String,
    },
    points: {
        type: Number
    },
    body: {
        type: String,
    },
    is_read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const badgeNotification =  mongoose.model('BadgeNotification', badgeNotificationSchema);
module.exports = { badgeNotification: badgeNotification };
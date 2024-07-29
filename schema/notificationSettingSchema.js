const mongoose = require('mongoose');

const notificationSettingSchema = new mongoose.Schema({
    pushNotification: {
        type : Boolean,
        default : false
    },
    emailNotification: {
        type : Boolean,
        default : false
    },
    smsNotification: {
        type : Boolean,
        default : false
    },
}, {timestamps: true})

let notificationSetting = mongoose.model('NotificationSetting',  notificationSettingSchema, 'notificationSettings' );
module.exports = { NotificationSetting: notificationSetting  }

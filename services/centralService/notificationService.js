const { Notification , Paymentnotification} = require("../../schema/notificationSchema.js/notification")
const { messageHandler , queryConstructor} = require('../../utils');
const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const { DoctorEarnings } = require("../../schema/subscriptionSchema/subscriptionSchema")

module.exports.sendNotificationMessageService = async (data, callback) => {
    const notification = new Notification(data)
    await notification.save(async (err, success) => {
      if(err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
      }
        return callback(messageHandler("Notification Notices successfully Saved", true, SUCCESS, success))
    })
}

module.exports.createPaymentNotificationService = async (data) => {
  const paymentNotification = new Paymentnotification(data)
  await paymentNotification.save(async (err, success) => {
    if(err) {
      throw err
    }
    return (`Payment Notification Notices successfully Saved ${success}`)
  })
}

module.exports.getPaymentHistoryNotificationService = async ( query, callback ) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "notifications" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalNotifications: 0, notifications: [] }))
    }
    try {
      const paymentNotifications = await Paymentnotification.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Paymentnotification.find({ ...params }).countDocuments()
      if (!paymentNotifications.length > 0) {
        return callback(messageHandler("No Paynment available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Payment successfully fetched", true, SUCCESS, { totalNotifications:total, paymentNotifications }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports.getEarningHistoryNotificationService = async ( query, callback ) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "doctorearnings" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totaldoctorearnings: 0, doctorearnings: [] }))
    }
    try {
      const doctorearnings = await DoctorEarnings.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await DoctorEarnings.find({ ...params }).countDocuments()
      if (!doctorearnings.length > 0) {
        return callback(messageHandler("Doctor Needs to start Earning", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Doctor Earnings successfully fetched", true, SUCCESS, { totaldoctorearnings:total, doctorearnings }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}
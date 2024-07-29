const { Payment } = require("../../schema/paymentSchema/paymentSchema")
const { messageHandler , queryConstructor} = require('../../utils');
const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const AppSubscription = require("../../schema/subscriptionSchema/subscriptionSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const mongoose = require('mongoose')

module.exports.planDurationDetailService = async ({body, param}, callback) => {  
    try {
      Payment.findOne({_id: mongoose.Types.ObjectId(body.paymentId)}, async (err, payment) => {
        if (payment.status === "APPROVED") {
          AppSubscription.find({}, async (err , success) => {
          const output = await success.filter(element =>  { element.monthlyPlan[0]._id === payment.planDurationId || element.yearlyPlan[0]._id === payment.planDurationId
          }).reduce(
            (previousValue, currentValue) => previousValue + currentValue , 0);
         })
          await Caregiver.updateOne({ _id:mongoose.Types.ObjectId(body.caregiverId)}, { $set: { "plan" :{"planDurationId" : mongoose.Types.ObjectId(payment.planDurationId), "subscriptionName": payment.subscriptionName}} })
          return callback(messageHandler(" successfully updated", true, SUCCESS, {}))
        } else {  
          return callback(messageHandler("Transaction Has not been approved", false, BAD_REQUEST, err))
        }
      })
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message))
    }
}

module.exports.getDoctorLatestSubscriptionService = async ({query}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "caregiver" )
  if(error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalCaregivers: 0, caregivers: [] }))
  }
  try {
      const results = await Caregiver.find({ ...params}).limit(limit).skip(skip).sort(sort)
      if(!results.length > 0) {
          return callback(messageHandler("No caregiver available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Caregivers subscription plan fetched", true, SUCCESS, { caregivers: results }))
  }
  catch(error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports.getPaymentService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "Payments" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalTags: 0, payments: [] }))
    }
    try {
      const payments = await Payment.aggregate([{
          $lookup: {
              from: "appSubscription",      
              localField: "appSubscriptions.monthlyPlan[]._id",  
              foreignField: "_id",
              as: "planDuration"
          }
      }, { $unwind: {path: "$AppSubscription", preserveNullAndEmptyArrays: true} },]).limit(limit).skip(skip).sort(sort)
      let total = await payments.countDocuments()
      if (!payments.length > 0) {
        return callback(messageHandler("No payment available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Payment successfully fetched", true, SUCCESS, { totalPayments:total, payments }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}
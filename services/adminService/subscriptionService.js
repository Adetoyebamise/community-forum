const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const  {AppSubscription}  = require("../../schema/subscriptionSchema/subscriptionSchema")
const  DoctorEarnings  = require("../../schema/subscriptionSchema/subscriptionSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")

const createSubscrptionService = async (body, callback) => {
  try {
    const appSubscription = new AppSubscription(body)
    await appSubscription.save()
    return callback(messageHandler("App Subscription successfully created", true, SUCCESS, appSubscription))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}

const getSubscriptionService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "AppSubscriptions" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalAppSubscription: 0, appSubscription: [] }))
    }
    try {
      const appSubscription = await AppSubscription.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await AppSubscription.find({ ...params }).countDocuments()
      if (!appSubscription.length > 0) {
        return callback(messageHandler("No available subscription", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler(" Available App Subscription successfully fetched", true, SUCCESS, { totalAppSubscription:total, appSubscription }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateSubscriptionService = async ({param, body}, callback) => {
  try {
      let result = await AppSubscription.updateOne({ _id: param.subscriptionId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("App Subscription not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Subscription successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, error.message));
  }
}

const deleteSubscriptionService =  ({ param}, callback) => {
  try {
    AppSubscription.findOne({ _id: mongoose.Types.ObjectId(param.subscriptionId) }, async (err,  appsubscription) => {
        if (err) {
          return callback(messageHandler("Unable to delete tag, Please Try Again", false, BAD_REQUEST, {}))
        } if (appsubscription === null) {
          return callback(messageHandler("No appsubscription with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            AppSubscription.deleteOne({ _id:mongoose.Types.ObjectId(param.subscriptionId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, success))
            } 
              return callback(messageHandler("AppSubscription successfully deleted", true, SUCCESS, {}))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, {}))
  }
}

const createDoctorEarningService = async (body, callback) => {
  try {
    const earnings = new DoctorEarnings(body)
    await earnings.save()
    return callback(messageHandler("Doctor earnings successfully created", true, SUCCESS, earnings))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}


const updateEarningsService = async ({param, body}, callback) => {
  try {
      let result = await DoctorEarnings.updateOne({ _id: param.earningsId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Doctor earnings not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Doctor earnings successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, error.message));
  }
}


module.exports = { createSubscrptionService, getSubscriptionService, updateSubscriptionService, deleteSubscriptionService, createDoctorEarningService, updateEarningsService  }

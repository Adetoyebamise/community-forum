const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode");
const { messageHandler, queryConstructor } = require("../../utils/index");
const {AppSubscription} = require("../../schema/subscriptionSchema/subscriptionSchema")
const mongoose = require("mongoose")


module.exports.getSubscriptionService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "App Subscription" )
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
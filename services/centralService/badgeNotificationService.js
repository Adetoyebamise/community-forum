const { badgeNotification } = require("../../schema/badgeNotificationSchema");
const { queryConstructor, messageHandler } = require("../../utils")
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const mongoose = require("mongoose")

const badgeNotificationService = async (payload) => {
   try {
    const newNotice = new badgeNotification(payload)
    await newNotice.save()
   }
    catch (error) {
        throw error;
    }
}

const getBadgeNotificationService = async (query, callback) => {
    const { error, params, limit, skip, sort} = await queryConstructor(query, 'createdAt', "pointHistory" )
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalPointHistory: 0, pointHistory: [] }))
    }
    try {
        const pointHistories = await badgeNotification.find({...params}).sort(sort).skip(skip).limit(limit)
        let totalPointHistories = await badgeNotification.find({ ...params }).countDocuments()
        if (!pointHistories.length > 0) {
          return callback(messageHandler("No Point Hstory is available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Point History successfully fetched", true, SUCCESS, { totalPointHistories, pointHistories }))
      } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
      }
}

const updateBadgeNotificationService = async ({params, body}, callback) => {
   badgeNotification.findOne({_id: mongoose.Types.ObjectId(params.badgenotificationId)}, (err, pointhistory) => {
      if (err) {
          return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err))
      } else if (pointhistory === null) {
          return callback(messageHandler("No badge or point History found, Please Try Again", false, BAD_REQUEST, {}))
      } else {
        badgeNotification.updateOne({_id: mongoose.Types.ObjectId(params.badgenotificationId)} , { $set: { ...body } }, (error, success) => {
              if (error) {
                  return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
              } else {
                  return callback(messageHandler("Point History Successfully Updated", true, SUCCESS, success))
              }
          });
      }
  })
}

module.exports = { badgeNotificationService, getBadgeNotificationService, updateBadgeNotificationService };
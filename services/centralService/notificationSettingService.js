const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const { queryConstructor, messageHandler } = require("../../utils")
const mongoose = require('mongoose')
const { NotificationSetting } = require('../../schema/notificationSettingSchema')

const createNotificationSettingService = async ({param, body}, callback) => {
  try {
    NotificationSetting.findOne({caregiver: body.caregiverId}, async (err, success) => {
      if (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
      }
       if (success === null) {
        let notificationSetting = new NotificationSetting({ ...body })
      
        notificationSetting.save((err, success) => {
          if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
          }
      
          return callback(messageHandler("notification Setting successfully created", true, SUCCESS, success))
        })
      } else {
        NotificationSetting.updateOne( {caregiver: body.caregiverId},{$set: {...body}}, (err, success) => {
          if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
          }
          if(success.modifiedCount == 0) {
            return callback(messageHandler("notification Setting not found", false, BAD_REQUEST, {}))
        }
        return callback(
          messageHandler("notification Setting successfully updated", true, SUCCESS, success)
        )
      })
      }
    })
  } catch (err) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err))
  }
}


const getNotificationSettingByParamsService = async (query, callback) => {
  const { error, params, limit, skip, sort} = await queryConstructor(query, 'createdAt', "notification setting" )
  if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalNotificationSetting: 0, notificationSetting: [] }))
  }

  try {
      const notificationSetting = await NotificationSetting.find({...params}).sort(sort).skip(skip).limit(limit)
      let totalNotificationSetting = await NotificationSetting.find({ ...params }).countDocuments()
      if (!notificationSetting.length > 0) {
        return callback(messageHandler("No notification seeting available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Notification setting successfully fetched", true, SUCCESS, { totalNotificationSetting, notificationSetting }))
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}

const deleteNotificationSettingService = async(params, callback) => {
  NotificationSetting.deleteOne({ _id: mongoose.Types.ObjectId(params.notificationSettingId) }, (err, success) => {
    if (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
    if(success.deletedCount == 0) {
      return callback(messageHandler("Notification setting not found", false, BAD_REQUEST, {}))
  }
  
  return callback(
    messageHandler("Notification setting successfully deleted", true, SUCCESS, success)
  )
  })
}

module.exports = { createNotificationSettingService, getNotificationSettingByParamsService,  deleteNotificationSettingService }
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const { Badge } = require("../../schema/badgeSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")

const createBadgeService = async (body, callback) => {
  try {
    const badge = new Badge({...body})
    await badge.save()
    return callback(messageHandler("Badge successfully created", true, SUCCESS, badge))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}

const getBadgeByParamService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "Badges" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalBadges: 0, badges: [] }))
    }
    try {
      const badges = await Badge.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Badge.find({ ...params }).countDocuments()
      if (!badges.length > 0) {
        return callback(messageHandler("No badges available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Badges successfully fetched", true, SUCCESS, { totalBadges:total, badges }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateBadgeService = async ({param, body}, callback) => {
  delete body.adminId
  try {
      let result = await Badge.updateOne({ _id: param.badgeId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Badge not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Badge successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, error.message, {}));
  }
}

const deleteBadgeService =  ({ param}, callback) => {
  try {
        Badge.findOne({ _id: mongoose.Types.ObjectId(param.badgeId) }, async (err,  badge) => {
        if (err) {
          return callback(messageHandler("Unable to delete badge, Please Try Again", false, BAD_REQUEST, {}))
        } if (badge === null) {
          return callback(messageHandler("No badge with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
           Badge.deleteOne({ _id:mongoose.Types.ObjectId(param.badgeId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, {}))
            } 
              return callback(messageHandler("Badge successfully deleted", true, SUCCESS, success))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { createBadgeService, getBadgeByParamService, updateBadgeService, deleteBadgeService }

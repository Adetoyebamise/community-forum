const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const  {Userpoint}  = require("../../schema/userPointSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")
const {badgeNotificationService} = require("../../services/centralService/badgeNotificationService")

const getPointService = async ( {param, query}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "userPoints" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalUserPoints: 0, userPoint: [] }))
    }
 
    try {
      const userPoint = await Userpoint.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Userpoint.find({ ...params }).countDocuments()
      
      if (!userPoint.length > 0) {
        return callback(messageHandler("No userPoint available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("User Point Data successfully fetched", true, SUCCESS, { totalUserPoint:total, userPoint :userPoint[0] }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}


const awardBadgeService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "userPoints" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalUserPoints: 0, userPoint: [] }))
    }
      const userPoint = await Userpoint.find({ ...params }).limit(limit).skip(skip).sort(sort)
      const pointValue = userPoint[0].point
      if (pointValue >= 30 && pointValue < 60) {
        if (pointValue == 30) {
          const data = {caregiverId: userPoint[0].userId, title: "Point History", momTypes: "Neo mom", points:pointValue, body: `Congratulations you just become a jojolo Neo mom ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Neo mom badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 60 && pointValue < 120) {
        if (pointValue == 60) {
          const data = {caregiverId: userPoint[0].userId, title: "Point History", momTypes: "Awesome mom", points:pointValue, body: `Congratulations you just become a jojolo Awesome mom ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Awesome mom badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 120 && pointValue < 300) {
        if (pointValue == 120) {
          const data = {caregiverId: userPoint[0].userId, title: "Point History", momTypes: "Amazing Mom", points:pointValue, body: `Congratulations you just become a jojolo Amazing Mom ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Amazing mom badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 300) {
        if (pointValue == 300) {
          const data = {caregiverId: userPoint[0].userId, title: "Point History", momTypes: "Super mom", points:pointValue, body: `Congratulations you just become a jojolo Super mom ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Super mom badge awarded", true, SUCCESS, {}))
      } else 
      return callback(messageHandler("No Badge Awarded", true, SUCCESS, {}))
}

module.exports = { getPointService, awardBadgeService }
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const  {Userpoint}  = require("../../schema/userPointSchema")
const Doctor = require("../../schema/doctorsSchema/doctorSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")
const {badgeNotificationService} = require("../../services/centralService/badgeNotificationService")

const getPointService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "userPoints" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalUserPoints: 0, userPoint: [] }))
    }
 
    try {
    const userPoint = await Userpoint.find({ ...params}).limit(limit).skip(skip).sort(sort)
    let total = await Userpoint.find({ ...params }).countDocuments()
      
      if (!userPoint.length > 0) {
        return callback(messageHandler("No userPoint available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("User Point Data successfully fetched", true, SUCCESS, { totalUserPoint:total, userPoint: userPoint[0] }))
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
          const data = {doctorId: userPoint[0].userId, title: "Point History", doctorType: "Neo doctor", points:pointValue, body: `Congratulations you just become a jojolo Neo doctor ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Neo doctor badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 60 && pointValue < 120) {
        if (pointValue == 60) {
          const data = {doctorId: userPoint[0].userId, title: "Point History", doctorType: "Awesome doctor", points:pointValue, body: `Congratulations you just become a jojolo Awesome doctor ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Awesome doctor badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 120 && pointValue < 300) {
        if (pointValue == 120) {
          const data = {doctorId: userPoint[0].userId, title: "Point History", doctorType: "Amazing Mom", points:pointValue, body: `Congratulations you just become a jojolo Amazing Mom ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Amazing doctor badge awarded", true, SUCCESS, {}))
      }
      if (pointValue >= 300) {
        if (pointValue == 300) {
          const data = {doctorId: userPoint[0].userId, title: "Point History", doctorType: "Super doctor", points:pointValue, body: `Congratulations you just become a jojolo Super doctor ${pointValue} points`}
          await badgeNotificationService(data)
        }
        return callback(messageHandler("Super doctor badge awarded", true, SUCCESS, {}))
      } else 
      return callback(messageHandler("No Badge Awarded", true, SUCCESS, {}))
}

module.exports = { getPointService, awardBadgeService }
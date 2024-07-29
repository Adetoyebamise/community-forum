const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const ChatRequest = require('../../schema/forumSchema/chatRequestSchema')
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")

module.exports.updateChatRequestService = async ({param, body}, callback) => {
  try {
      let result = await ChatRequest.updateOne({ _id: param.chatrequestId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("ChatRequest not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("ChatRequest successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, error.message, {}));
  }
}
module.exports.getPendingChatRequestService = async ( query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "ChatRequest" )
      if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalChatRequests: 0, ChatRequest: [] }))
      }
      try {
        const chatrequest = await ChatRequest.find({ ...params }).populate({path:"caregiverId", select:"fullName role imageUrl", model: Caregiver}).limit(limit).skip(skip).sort(sort)
        // let total = await ChatRequest.find({ ...params }).countDocuments()
        if (!chatrequest.length > 0) {
          return callback(messageHandler("No chatrequest available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Chat Request successfully fetched", true, SUCCESS, { chatrequest }))
      } catch (err) {
        return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
      }
  }
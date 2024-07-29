const { messageHandler, fileModifier, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Rooms }  = require('../../schema/forumSchema/chatRoom')
const  ChatRequest  = require("../../schema/forumSchema/chatRequestSchema")

const createChatRoomService = async (body, callback) => {
    try {
        const chatRoom = new Rooms({...body})
        await chatRoom.save()
        return callback(messageHandler("Room successfully created", true, SUCCESS, chatRoom))

    } catch (error) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message)) 
    }
}

const getChatRequestService = async ({param, query}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "ChatRequests" )

    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalChatRequests: 0, ChatRequests: [] }))
    }
    try {
      const ChatRequests = await ChatRequest.find({ ...params }).populate({path:'doctorId', select: "fullName role phoneNumber"}).populate({path:'caregiverId', select: "fullName rolesDescription phoneNumber"}).limit(limit).skip(skip).sort(sort)
      let totalEncryptedRequest = ChatRequests.length
      if (!ChatRequests.length > 0) {
        return callback(messageHandler("No Chat Requests available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Chat Requests successfully fetched", true, SUCCESS, { totalEncryptedRequest:totalEncryptedRequest, ChatRequests }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}
module.exports = { createChatRoomService, getChatRequestService}

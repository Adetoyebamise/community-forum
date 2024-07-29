const Chat = require('../../schema/forumSchema/chatSchema')
const { messageHandler , queryConstructor} = require('../../utils');
const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const  mongoose  = require('mongoose');

const sendChatMessageService = async (data, callback) => {
    const newChat = new Chat(data);
    await newChat.save(async (err, success) => {
        if(err) {
          return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
        }
          return callback(messageHandler("Chat sent successfully", true, SUCCESS, success))
    })
}

const receiveChatMessageService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, "createdAt", "chats" )
      if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalPost: 0, post: [] }))
      }
      try {
        const chats = await Chat.find({doctorId: mongoose.Types.ObjectId(param.doctorId), chatRequestId: mongoose.Types.ObjectId(params.chatRequestId)}).populate({path:'doctorId', select: "fullname role phoneNumber"}).populate({path:'caregiverId', select: "fullname rolesDescription phoneNumber"}).limit(limit).skip(skip).sort(sort)
        let totalEncryptedChats =  chats.length
        if (!chats.length > 0) {
          return callback(messageHandler("No chat available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("chats successfully fetched", true, SUCCESS, { totalEncryptedChats: totalEncryptedChats, chats }))
      } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message))
      }
  }

module.exports = { sendChatMessageService, receiveChatMessageService } 

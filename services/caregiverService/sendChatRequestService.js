const ChatRequest = require('../../schema/forumSchema/chatRequestSchema')
const { messageHandler , queryConstructor} = require('../../utils');
const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const mongoose = require('mongoose');

module.exports.sendChatRequestService = async (data, callback) => {
    let existingChatRequest = await ChatRequest.findOne({caregiverId: mongoose.Types.ObjectId(data.caregiverId), doctorId: mongoose.Types.ObjectId(data.doctorId),status: "PENDING"}); 
    if (existingChatRequest) {
      return callback(messageHandler("Chill :), Chat request already sent : Awiating doctor's response", false, BAD_REQUEST, {}));
    } else {
      const newChatRequest = new ChatRequest(data);
      await newChatRequest.save(async (err, success) => {
      if(err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
      }
        return callback(messageHandler("Chat Request sent successfully", true, SUCCESS, success))
    })
  }
}
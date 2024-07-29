const { sendChatRequestService } = require("../../services/caregiverService/sendChatRequestService")

module.exports.sendChatRequestController = async (req, res) => {
  
    return await sendChatRequestService(req.body, result => {
        return res.status(result.statusCode).json(result );
    });
};

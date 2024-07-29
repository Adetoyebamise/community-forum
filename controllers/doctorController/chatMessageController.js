const { sendChatMessageService, receiveChatMessageService } = require("../../services/caregiverService/sendChatMessageService")

const sendChatMessageController = async (req, res) => {
    return await sendChatMessageService(req.body, result => {
        return res.status(result.statusCode).json(result );
    });
};

const receiveChatMessageController = async (req, res) => {
    return await receiveChatMessageService({query:req.query, param:req.params}, result => {
        return res.status(result.statusCode).json( result );
    });
};

module.exports = { sendChatMessageController, receiveChatMessageController }; 

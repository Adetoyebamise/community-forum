const { sendChatMessageService, receiveChatMessageService } = require("../../services/doctorsService/sendChatMessageService")

const sendChatMessageController = async (req, res) => {
    return await sendChatMessageService(req.body, result => {
        return res.status(result.statusCode).json( result );
    });
};

const receiveChatMessageController = async (req, res) => {
    return await receiveChatMessageService({param: req.query, query:req.query}, result => {
        return res.status(result.statusCode).json( result );
    });
};

module.exports = { sendChatMessageController, receiveChatMessageController }; 
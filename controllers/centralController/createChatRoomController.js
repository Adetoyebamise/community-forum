const { createChatRoomService, getChatRequestService } = require("../../services/centralService/createRoomService")

const createChatRoomController = async(req, res)=> {
    return await createChatRoomService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const getChatRequestController = async(req, res)=> {
    return await getChatRequestService({param: req.params, query: req.query}, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

module.exports = { createChatRoomController, getChatRequestController }

const { updateChatRequestService , getPendingChatRequestService} = require("../../services/doctorsService/updateChatRequestService")

module.exports.updateChatRequestController = async (req, res) => {
  return await updateChatRequestService({body: req.body, param: req.params}, (result) => {
    res.status(result.statusCode).json( result )
  })
}

module.exports.getPendingChatRequestController = async  (req, res) => {
  return await getPendingChatRequestService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}
const { createPaystackPaymentService } = require("../../services/paymentService/paymentService")

module.exports.createPaystackPaymentController = async (req, res) => {
  return await createPaystackPaymentService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}
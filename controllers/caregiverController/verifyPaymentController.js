const { INTERNAL_SERVER_ERROR, SUCCESS, BAD_REQUEST } = require('../../constants/statusCode');
const { verifyPaystackPaymentService } = require('../../services/caregiverService/subscriptionService');
const { VerifyPayment } = require('../../modules/payment/paystack')();

const verifyPaymentController = async (req, res) => {
  let { reference } = req.body;
  let response = await VerifyPayment(reference);
  let { status, data } = response;
  
  let message = data.hasOwnProperty("gateway_response") ? data.gateway_response : data.message
  if (status && data.status === 'success') {
      return await verifyPaystackPaymentService({ fees: data.fees / 100, ...req.body }, (result) => {
          return res.status(result.statusCode).json({ result: { ...result } });
      });
  } else {
      return res.status(BAD_REQUEST).json({ result: { message, success: false } });
  }
}

module.exports = { verifyPaymentController }
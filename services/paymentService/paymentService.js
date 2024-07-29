const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const { Payment } = require('../../schema/paymentSchema/paymentSchema');
const { messageHandler } = require('../../utils');
const mongoose = require('mongoose');

module.exports.createPaystackPaymentService = async (data, callback) => {
    const payment = new Payment(data);
    return await payment.save((error, payment) => { 
        // 10% = 0.01 0f ammount sent if subscriptionType is true (0.01 * amountSent)
        // find the userPoints by the userId and increase the points
        if (error) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
        } else {
            return callback(messageHandler("Payment Successfully Created", true, SUCCESS, payment))
        }
    })
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        // refPath: 'externalModelType'
        required: true
    },
    // externalModelType: {
    //     type: String,
    // },
    amountCredited: {
        type: Number,
        required: true,
    },
    amountSent: {
        type: Number,
        required: true,
    },
    payer: {
        type: String,
        required: true,
    },
    planDurationId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reference: {
        type: String,
        // required: true,
    },
    isSubscribed: {
        type :Boolean,
        default  : true,
        required : true
    },
    subscriptionName: {
        type:String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING',
    },
}, { timestamps: true })

let paystack_payments = mongoose.model("Payment", PaymentSchema, 'paystack_payments');

module.exports = { Payment: paystack_payments };
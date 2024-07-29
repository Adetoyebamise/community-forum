const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode");
const { messageHandler, queryConstructor } = require("../../utils/index");
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema");
const { AppSubscription }  = require("../../schema/subscriptionSchema/subscriptionSchema")
const { Payment } = require("../../schema/paymentSchema/paymentSchema")
const { InitializePayment, VerifyPayment } = require('../../modules/payment/paystack')();
const {getSubscriptionService} = require("../../services/adminService/subscriptionService");
const { createTransactionCreditWalletService } = require("../doctorsService/walletService")
const mongoose = require("mongoose")

const createSubscriptionService = async (payload, callback) => {
    const { caregiverId, appSubscriptionId, timeInterval, plan} = payload
     AppSubscription.findOne({_id: mongoose.Types.ObjectId(appSubscriptionId)}, async (err, subscriptionType) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message)) 
        } if (subscriptionType.subscriptionName) {
            Caregiver.findOne({_id : mongoose.Types.ObjectId(caregiverId)}, async (err, caregiver) => {
                if (caregiver) {
                    getSubscriptionService(payload, async (res) => {
                        const guess = res.data.appSubscription
                        let planFile = await guess.filter( value => value.subscriptionName === `${plan}`).reduce(
                            (previousValue, currentValue) => previousValue + currentValue ,)
                        AppSubscription.findOne({_id: planFile._id}, async (err, success) => {
                            if (timeInterval) {
                                const value = success[`${timeInterval}`][0]
                                let amount = success[`${timeInterval}`][0].planAmount * 100
                                const asset = { userId: caregiverId, amount , email: caregiver.emailAddress, full_name: caregiver.fullName }
                                let responseObj = await InitializePayment({ amount, full_name: caregiver.fullName, email: caregiver.emailAddress })
                                let { status, message, data } = responseObj;
                                if (status) {
                                    let payload = await { userId: caregiverId, amountSent: amount, amountCredited: 0, payer: caregiver.fullName, isSubscribed: true, subscriptionName: success.subscriptionName , status: "PENDING", planDurationId: success[`${timeInterval}`][0]._id, reference: data.data.reference }
                                    const payment = new Payment(payload);
                                    payment.save()
                                    await Caregiver.updateOne({ _id:mongoose.Types.ObjectId(caregiverId)}, { $set: { "plan" : value,  }})
                                    // 0.01 amount payed
                                    return callback(messageHandler("Paystack successfully initialized.", true, SUCCESS,  data))
                                }
                                    return callback(messageHandler(`Subscription Type Available, subscribed to ${success.subscriptionName}`, true, SUCCESS, {planName: success.subscriptionName, planDetails: success[`${timeInterval}`]}))
                            }
                             else {
                                return callback(messageHandler("Something went wrong... unable to state subscription type or paystack issue", false, BAD_REQUEST, {err}))
                            }
                        })
                    })
                } 
            })
        }
         else {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, {}))
        }
    })
}

const verifyPaystackPaymentService = async (data, callback) => {
    let { userId, reference, fees } = data
    return await Payment.findOne({ userId: mongoose.Types.ObjectId(userId), reference }).exec((err, payment) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", true, BAD_REQUEST, err))
        } else if (payment === null) {
            return callback(messageHandler("No payment attached to this details, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            if (payment.status === "PENDING") {
                let { amountSent } = payment;
                let amountCredited = Number(amountSent) - fees

                savedData = { amountCredited, status: 'APPROVED' };

                return Payment.updateOne({ userId: mongoose.Types.ObjectId(userId), reference }, { $set: { ...savedData } }, async  (error, success) => {
                    if (error) {
                        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                    }
                     await Caregiver.updateOne({ _id:mongoose.Types.ObjectId(userId)}, { $push: { "plan" :{"planDurationId" : mongoose.Types.ObjectId(payment.planDurationId), "subscriptionName": payment.subscriptionName, "isSubscribed" : payment.isSubscribed}} })
                     let dataObject = {
                        userId, transactionChannel: "Paystack", services: "Create Doctor Wallet", benefeciary: "Doctor",
                        transactionType: "Credit", amount: amountCredited, balanceAfter: 0, transactionRef: reference,
                    }
                    let bill = {
                        ...dataObject, transactioninfo: dataObject
                    }
                    return createTransactionCreditWalletService(bill, (result) => {
                        if (result.success) {
                            return callback({ ...result })
                        } else {
                            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
                        }
                    })
                    // return callback(messageHandler("Transaction verified.", true, SUCCESS, {}))
                })
            } else {
                return callback(messageHandler("Transaction already completed.", false, BAD_REQUEST, {}))
            }

        }
    })
}

module.exports = { createSubscriptionService, verifyPaystackPaymentService};
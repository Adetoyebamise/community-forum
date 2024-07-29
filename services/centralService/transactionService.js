const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const { Wallet } = require('../../schema/walletSchema');
const { messageHandler } = require('../../utils');
const mongoose = require('mongoose');
const { Caregiver } = require('../../schema/caregiverSchema/caregiverSchema');
const { Doctor } = require('../../schema/doctorsSchema/doctorSchema');

module.exports.creditWalletTransactionService = async (data, callback) => {
    let { userId, amount } = data;

    return await Wallet.findOne({ userId: mongoose.Types.ObjectId(userId) }).exec(async (err, suc) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err))
        } else if (suc === null) {
            const wallet = new Wallet({ userId, balance: amount });
            return await wallet.save((error, res) => {
                if (error) {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                } else {
                    return callback(messageHandler("Transaction Successfully", true, SUCCESS, res))
                }
            })
        } else {
            Wallet.updateOne({ userId: mongoose.Types.ObjectId(userId) }, { $inc: { balance: amount } }, (error, success) => {
                if (error) {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                } else {
                    return callback(messageHandler("Transaction Successfully", true, SUCCESS, success))
                }
            })
        }
    })
}

module.exports.debitWalletTransactionService = async (data, callback) => {
    let { userId, amount } = data;

    Wallet.updateOne({ userId: mongoose.Types.ObjectId(userId) }, { $inc: { balance: -Number(amount) } }, (error, success) => {
        if (error) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
        } else {
            return callback(messageHandler("Transaction Successfully", true, SUCCESS, success))
        }
    })
}

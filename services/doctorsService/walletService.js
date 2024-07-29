const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const { Transaction, BankAccount, Wallet, Withdrawal } = require('../../schema/walletSchema');
const { messageHandler, queryConstructor, AlphaNumeric } = require('../../utils');
const { creditWalletTransactionService, debitWalletTransactionService } = require('../centralService/transactionService');
const mongoose = require('mongoose');
const { Doctors } = require('../../schema/doctorsSchema/doctorSchema');
const { createPaymentNotificationService } = require("../../services/centralService/notificationService")

module.exports.createTransactionService = async (data, callback) => {
    const transaction = new Transaction(data);
    return await transaction.save((error, trans) => {
        if (error) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
        } else {
            return callback(messageHandler("Transaction Successfully", true, SUCCESS, trans))
        }
    })
}

module.exports.createTransactionCreditWalletService = async (data, callback) => {
    let { userId, amount } = data
    await creditWalletTransactionService({ userId, amount }, async (res) => {
        if (res.success) {
            return await this.createTransactionService(data, (ress) => {
                if (ress.success) {
                    return callback(messageHandler("Wallet Successfully Credited", true, SUCCESS, ress.data))
                } else {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
                }
            })
        } else {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
        }

    })
}

module.exports.createTransactionDebitWalletService = async (data, callback) => {
    let { userId, amount } = data
    await debitWalletTransactionService({ userId, amount }, async (res) => {
        if (res.success) {
            return await this.createTransactionService(data, (ress) => {
                if (ress.success) {
                    return callback(messageHandler("Transaction Successful", true, SUCCESS, ress.data))
                } else {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
                }
            })
        } else {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
        }
    })
}

module.exports.createWithdrawService = async (data, callback) => {
    const { doctorId, amount, withdrawReason } = data;
    
    await BankAccount.findOne({ doctorId: mongoose.Types.ObjectId(doctorId) })
        .exec(async (err, account) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", true, err))
        } else if (account === null) {
            return callback(messageHandler("Please setup your bank account, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            let doctor = await Wallet.findOne({ userId: mongoose.Types.ObjectId(doctorId) })/*.populate({path: 'doctorId', option: {strictPopulate: false}, select: "fullName", model: Doctors})*/
            if (Number(amount) > doctor.balance) {
                return callback(messageHandler("Insufficient balance, Check your balance and try again", false, BAD_REQUEST, {}))
            } else {
                let balanceAfter = doctor.balance - Number(amount);

                let referrence = AlphaNumeric(20).toUpperCase()
                let payload = { ...data, referrence, status: 'Pending', balanceAfter}

                const withdraw = new Withdrawal({...payload, userId: doctorId, externalModelType: "Doctors"});
                return await withdraw.save((error, trans) => {
                    if (error) {
                        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                    } else {

                        let bill = {
                            userId: doctorId, transactionChannel: "Withdraw", status: 'Pending', services: "Withdraw", benefeciary: account.accountNumber,
                            transactionType: "Debit", amount, balanceAfter, transactionRef: referrence, transactioninfo: payload
                        }
                        return this.createTransactionDebitWalletService(bill, async (result) => {
                                const data = {doctorId : doctorId, text:"Withdral Made", amount: `${amount}`}
                                await createPaymentNotificationService(data)
                                return callback(messageHandler("Withdraw request successfully submitted, Please check your bank account balance, after few hours due to too many withdraw request ", true, SUCCESS, trans))
                        })
                    }
                })
            }
        }
    }) 
}

module.exports.getWalletBalanceService = async ( query, callback) => {
    const { error, limit, skip, sort, params } = await queryConstructor(query, "createdAt", "Wallet");
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalWallets: 0, Wallets: [] }));
    }
    try {
        const wallets = await Wallet.find({ ...params }).populate("userId").limit(limit).skip(skip).sort(sort);
        let totalWallets = await Wallet.find({ ...params }).countDocuments();

        if (wallets.length > 0) {
            return callback(messageHandler("Wallets List Successfully Fetch", true, SUCCESS, { wallets, totalWallets }))
        } else {
            return callback(messageHandler("No wallets List Found", false, BAD_REQUEST, {}))
        }
    } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
    }
}
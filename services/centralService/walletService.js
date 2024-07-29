const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode");
const { Withdrawal, Transaction, BankAccount, Wallet } = require("../../schema/walletSchema");
const { queryConstructor, messageHandler } = require("../../utils");
const mongoose = require("mongoose");
const doctor = require("../../schema/doctorsSchema/doctorSchema");

const getWithdrawalRequestByParamsService = async (query, callback) => {
    const { error, limit, skip, sort, params } = await queryConstructor(query, "createdAt", "withdraw");
    console.log("params", params)
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalWithdrawals: 0, withdrawals: [] }));
    }
    try {
        let withdrawals = await Withdrawal.aggregate([
            {
                $lookup: {
                    from: "doctors",      
                    localField: "userId",   
                    foreignField: "_id",
                    as: "doctors"    
                }
            },
            { $unwind: {path: "$doctors", preserveNullAndEmptyArrays: true} },    
            {
                $lookup: {
                    from: "bankAccounts",
                    localField: "docotors._id",
                    foreignField: "docotorId",
                    as: "bankAccounts"
                }
            },
            { $unwind: {path: "$bankAccounts", preserveNullAndEmptyArrays: true} },
            // define some conditions here 
            {
                $match: {
                    $and: [{ ...params }]
                }
            },
        ]).skip(skip).limit(limit).sort(sort);
        const totalWithdrawals = await Withdrawal.find({ ...params }).countDocuments();
        if (!withdrawals.length > 0) {
            return callback(messageHandler("No withdrawal request available, Please try again later", false, BAD_REQUEST, {}));
        }
        return callback(messageHandler("Withdrawal successfully fetched ", true, SUCCESS, { totalWithdrawals, withdrawals }));
    } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
    }
}

const getTransactionsService = async ( query, callback) => {
    const { error, limit, skip, sort, params } = await queryConstructor(query, "createdAt", "transaction");
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalTransactions: 0, transactions: [] }));
    }
    try {
        const transactions = await Transaction.find({ ...params }).populate("userId").limit(limit).skip(skip).sort(sort);
        let totalTransactions = await Transaction.find({ ...params }).countDocuments();

        if (transactions.length > 0) {
            return callback(messageHandler("Transaction List Successfully Fetch", true, SUCCESS, { transactions, totalTransactions }))
        } else {
            return callback(messageHandler("No Transaction List Found", false, BAD_REQUEST, {}))
        }
    } catch (err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
    }
}

const updateWithdrawalRequestService = async ({param, body}, callback) => {
    delete body.userId
    return Withdrawal.updateOne({ _id: mongoose.Types.ObjectId(param.withdrawId), status: 'Pending'}, { $set: { status: body.status }}, async (err, result) => {
        let withdrawalDetails = await Withdrawal.findOne({ _id: mongoose.Types.ObjectId(param.withdrawId) }).populate("userId");
        if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
        } else if (result.n === 0) {
            return callback(messageHandler("Withdrawal request not found", false, BAD_REQUEST, err));
        } else if (body.status === 'Declined') {
             Withdrawal.findOne({ _id: mongoose.Types.ObjectId(param.withdrawId) }, async (err, withdrawal) => {
                if (err) {
                  return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
                }
                 Wallet.findOne({ userId: withdrawal.userId }, async (err, wallet) => {
                    if (err) {
                        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
                    }
                    
                    wallet.balance = withdrawal.amount + wallet.balance
                    wallet.save(async (err, success) => {
                        if (err) {
                            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err));
                        }
                        return callback(messageHandler("Withdrawal declined and wallet credited", true, SUCCESS, {}))
                    })
                })
            })
        } else {
            return callback(messageHandler("Withdrawal succesfully approved", true, SUCCESS, result))
        }
    }).clone()
}

const getBankDetailsByParamsService = (params, callback) => {
    Withdrawal.findOne({ _id: params.withdrawalId }, (err, result) => {
        if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, {}));
        }

        BankAccount.find({userId: result.userId}, (err, bankDetails) => {
            if (err) {
                return callback(messageHandler("Something went wrong", false, BAD_REQUEST, {}));
            }
        
            return callback(messageHandler("Bank details succesfully fetched", true, SUCCESS, bankDetails))
        })
    })
}

const getWithdrawalRequestByNameService =  (query, callback) => {
    getWithdrawalRequestByParamsService({}, (result) => {
        const array = []
        const data = result.data.withdrawals.filter(res => {
            return res.bankAccounts.accountName === query.accountName
        })
        array.push(data)
        return callback(messageHandler("Search result succesfully fetched", true, SUCCESS, array))
    })
}

const getWithdrawalRequestByRoleService =  (query, callback) => {
    getWithdrawalRequestByParamsService({}, (result) => {
        console.log("result", result.data)
        const array = []
        const data = result.data.withdrawals.filter(res => {
            return res.doctors.role === query.role
        })
        array.push(data)
        return callback(messageHandler("Search result succesfully fetched", true, SUCCESS, array))
    })
}

module.exports = { getWithdrawalRequestByParamsService, getTransactionsService, updateWithdrawalRequestService, getBankDetailsByParamsService, getWithdrawalRequestByNameService, getWithdrawalRequestByRoleService };
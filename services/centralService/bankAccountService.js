const { BankAccount } = require('../../schema/walletSchema');
const { BAD_REQUEST, SUCCESS } = require('../../constants/statusCode');
const { messageHandler } = require('../../utils');
const mongoose = require("mongoose");
const { body } = require('express-validator');

const createBankAccountService = async (body, callback) => {
    
  let existingAccount = await BankAccount.findOne({accountNumber: body.accountNumber});
  if (existingAccount) {
    return callback(messageHandler("Bank Account already existing", false, BAD_REQUEST, {}));
  } else {
    const newBankAccount = new BankAccount(body);
 return await newBankAccount.save((error, account) => {
     if(error) {
         return callback(messageHandler("Something went wrong", false, BAD_REQUEST, {}));
     }
     return callback(messageHandler("Bank account created successfully", true, SUCCESS, account));
    });
   };
}
 

const getBankAccountService = async ({ doctorId}, callback) => {
    return await BankAccount.findOne({ doctorId: mongoose.Types.ObjectId(doctorId) }).exec((err, account) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", true, err))
        } else if (account === null) {
            return callback(messageHandler("No bank account is not found for the details", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Bank Account successfully fetched", true, SUCCESS, account))
        }
    })
};

const updateBankAccountService = async (data, callback) => {
    const { params, body } = data;
    return await BankAccount.findOne({ userId: mongoose.Types.ObjectId(params.userId) }).exec((err, account) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", true, err))
        } else if (account === null) {
            return callback(messageHandler("No account with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            return BankAccount.findOneAndUpdate({ userId: mongoose.Types.ObjectId(params.userId) }, body, { new: true }).exec((error, newAccount) => {
                if (error) {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                } else {
                    return callback(messageHandler("Bank Account Details Successfully Updated", true, SUCCESS, newAccount))
                }
            });
        }
    })
};

const deleteBankAccountService = async ({ userId }, callback) => {
    return await BankAccount.findOne({ userId: mongoose.Types.ObjectId(userId) }).exec((err, account) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", true, err))
        } else if (account === null) {
            return callback(messageHandler("No account with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
            return BankAccount.findOneAndDelete({ userId: mongoose.Types.ObjectId(userId) }, (error, deletedAccount) => {
                if (error) {
                    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                } else {
                    return callback(messageHandler("Bank Account Successfully Deleted", true, SUCCESS, deletedAccount))
                }
            });
        }
    })
};

module.exports = { createBankAccountService, getBankAccountService, updateBankAccountService, deleteBankAccountService };
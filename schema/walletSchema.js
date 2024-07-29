const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        refPath: 'externalModelType'
    },
    externalModelType: {
      type: String,
     },
    transactionChannel: {
        type: String,
        required: true,
    },
    services: {
        type: String,
        required: true,
    },
    benefeciary: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balanceAfter: {
        type: Number,
        required: true,
    },
    transactionRef: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Approved',
    },
    transactioninfo: {
        type: Object,
        required: true,
    },
}, { timestamps: true })

const WalletSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        refPath: 'externalModelType'
    },
    externalModelType: {
      type: String,
  },
    balance: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Active',
    },
}, { timestamps: true })

const BankSchema = new Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        refPath: 'externalModelType'
    },
    externalModelType: {
      type: String,
    },
    bankName: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

const WithdrawalSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        refPath: 'externalModelType'
    },
    externalModelType: {
      type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: true
    },
    referrence: {
        type: String,
        required: true
    },
    withdrawReason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, { timestamps: true });


let transaction = mongoose.model("Transaction", TransactionSchema, 'transactions');
let wallet = mongoose.model("Wallet", WalletSchema, 'wallets');
let bankAccount = mongoose.model("BankAccount", BankSchema, 'bankAccounts');
let withdrawal = mongoose.model("Withdrawal", WithdrawalSchema, 'withdrawals');

module.exports = { Transaction: transaction, Wallet: wallet, BankAccount: bankAccount, Withdrawal: withdrawal };
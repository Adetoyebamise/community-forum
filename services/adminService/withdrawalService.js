const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const mongoose = require('mongoose');
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { Withdrawals } = require("../../schema/adminSchema/withdrawalSchema");
const {getWithdrawalRequestByParamsService} = require("../../services/centralService/walletService")

const getWithdrawalsService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", 'createdAt': 'createdAt' }, "withdrawals" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalWithdrawals: 0, withdrawals: [] }))
    }
    try {
      const withdrawals = await Withdrawals.find({ ...params }).limit(limit).populate('doctorId').skip(skip).sort(sort)
      let total = await Withdrawals.find({ ...params }).countDocuments()
      const withdrawal = withdrawals[0]
      if (!withdrawal.length > 0) {
        return callback(messageHandler("No withdrawals available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Withdrawals successfully fetched", true, SUCCESS, { totalWithdrawals: total, withdrawal }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateWithdrawalsService = async ({param, body}, callback) => {
  delete body.adminId
  try {
      let result = await Withdrawals.updateOne({ _id: param.withdrawalId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Withdrawal not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Withdrawal successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message, {}));
  }
}

const deleteWithdrawalsService =  ({ param }, callback) => {
  try {
    Withdrawals.deleteOne({ _id:mongoose.Types.ObjectId(param.withdrawalId) }, (err, withdrawal) => {
      if (err) {
        return callback(messageHandler("An error Occurred, Please Try Again", false, BAD_REQUEST, {}))
      }
      if (withdrawal.deletedCount === 0) {
        return callback(messageHandler("No withdrawal with the details found, Please Try Again", false, BAD_REQUEST, {}))
      }
        return callback(messageHandler("Withdrawal successfully deleted", true, SUCCESS, {}))
    })
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

const searchWithdrawalByNameService = async ({param, query}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalWithdrawals': 'totalWithdrawals', 'createdAt': 'createdAt', }, "name" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalwithdrawals: 0, withdrawals: [] }))
    }
    try {
      if (!query.search) {
        return callback(messageHandler("Search cannot be empty", false, BAD_REQUEST, []))
      }
      getWithdrawalRequestByParamsService(res => {
        console.log("res", res)
      })
      const withdrawals = await Withdrawals.find({ "withdrawReason.accountName" : { $regex: query.search, $options: 'i' } }).limit(limit).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors}).skip(skip).sort(sort)
      let total = await Withdrawals.find({ ...param }).countDocuments()
      
      if (!withdrawals.length > 0) {
        return callback(messageHandler("No Withdrawals available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Withdrawals successfully fetched", true, SUCCESS, { totalWithdrawals: total, withdrawals }))
    } catch (err) {
      return callback(messageHandler( `${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports = { getWithdrawalsService, updateWithdrawalsService, deleteWithdrawalsService, searchWithdrawalByNameService }

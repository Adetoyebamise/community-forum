const { createWithdrawService, getWalletBalanceService } = require('../../services/doctorsService/walletService')

const createWithdrawalController = async (req, res) => {
    return await createWithdrawService(req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

const getWalletBalanceController = async (req, res) => {
    return await getWalletBalanceService(req.query, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

module.exports = { createWithdrawalController, getWalletBalanceController }
const { getWithdrawalRequestByParamsService, getTransactionsService, updateWithdrawalRequestService, getBankDetailsByParamsService, getWithdrawalRequestByNameService, getWithdrawalRequestByRoleService } = require("../../services/centralService/walletService");

const getWithdrawalRequestByParamsController = async (req, res) => {
    return await getWithdrawalRequestByParamsService(req.query, result => {
        return res.status(result.statusCode).json({ result });
    });
}

const getWithdrawalRequestByNameController = async (req, res) => {
    return await getWithdrawalRequestByNameService(req.query, result => {
        return res.status(result.statusCode).json({ result });
    });
}

const getWithdrawalRequestByRoleController = async (req, res) => {
    return await getWithdrawalRequestByRoleService(req.query, result => {
        return res.status(result.statusCode).json({ result });
    });
}
const getTransactionController = async (req, res) => {
    return await getTransactionsService( req.query, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

const updateWithdrawalRequestController = async (req, res) => {
    return await updateWithdrawalRequestService({param: req.params, body: req.body}, (result) => {
        return res.status(result.statusCode).json({ result })
    })
}

const getBankDetailsByParamsController = async (req, res) => {
    return await getBankDetailsByParamsService(req.params, (result) => {
        return res.status(result.statusCode).json({ result })
    })
}

module.exports = { getWithdrawalRequestByParamsController, getTransactionController, updateWithdrawalRequestController, getBankDetailsByParamsController, getWithdrawalRequestByNameController, getWithdrawalRequestByRoleController };
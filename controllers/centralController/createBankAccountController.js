const { createBankAccountService, getBankAccountService, updateBankAccountService, deleteBankAccountService } = require('../../services/centralService/bankAccountService');

const createBankAccountController = async (req, res) => {
    return await createBankAccountService(req.body, result => {
        return res.status(result.statusCode).json({ result });
    });
};

const getBankAccountController = async (req, res) => {
    return await getBankAccountService(req.params, result => {
        return res.status(result.statusCode).json({ result });
    });
};

const updateBankAccountController = async (req, res) => {
    return await updateBankAccountService(req, result => {
        return res.status(result.statusCode).json({ result });
    });
};

const deleteBankAccountController = async (req, res) => {
    return await deleteBankAccountService(req.params, result => {
        return res.status(result.statusCode).json({ result });
    });
};


module.exports = { createBankAccountController, getBankAccountController, updateBankAccountController, deleteBankAccountController };
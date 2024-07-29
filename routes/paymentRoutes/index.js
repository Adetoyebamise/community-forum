const router = require("express").Router()
const { validate } = require("../../validations/validate");
const { tokenVerifier } = require("../../utils")
const { checkSchema } = require('express-validator');
const { verifyPaymentController } = require("../../controllers/caregiverController/verifyPaymentController");
const { paymentVerifyValid } = require("../../validations/caregiver/wallet");
const { createWithdrawalController, getWalletBalanceController } = require("../../controllers/doctorController/walletController");
const { getWithdrawalRequestByParamsController, getBankDetailsByParamsController,  updateWithdrawalRequestController, getWithdrawalRequestByNameController, getWithdrawalRequestByRoleController} = require("../../controllers/centralController/walletController");

router.post("/verify-payment", validate(checkSchema(paymentVerifyValid)), verifyPaymentController)
router.post("/withdrawal-request",tokenVerifier, createWithdrawalController)
router.get("/wallet-balance",tokenVerifier, getWalletBalanceController)
router.get("/withdrawal-request", tokenVerifier, getWithdrawalRequestByParamsController)
router.get("/withdrawal-request-name/search", tokenVerifier, getWithdrawalRequestByNameController)
router.get("/withdrawal-request-role/search", tokenVerifier, getWithdrawalRequestByRoleController)
router.get('/withdrawal-request/:userId/:withdrawalId/bank-details', tokenVerifier, getBankDetailsByParamsController)
router.put('/withdrawal-request/:withdrawId', tokenVerifier, updateWithdrawalRequestController)

module.exports = router
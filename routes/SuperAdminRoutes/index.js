const router = require("express").Router()
const {signUpController, loginController, updateAdminPasswordController, createAdminController,getAdminByParamController, updateAdminController, updateBanAdminController, deleteAdminByParamController } = require("../../controllers/superAdminController/superAdminController")
const { createDoctorEarningController, updateEarningsController } = require("../../controllers/adminController/subscriptionController")
const { adminVerifier, tokenVerifier, secondLevelVerifier } = require("../../utils")

router.post('/sign-up', signUpController)
router.post('/login', loginController)
router.put('/reset-password/:adminId', tokenVerifier, updateAdminPasswordController)
router.post('/admin',tokenVerifier, createAdminController)
router.get('/admins', tokenVerifier, getAdminByParamController)
router.put('/admins/:adminId/admins/:adminId', tokenVerifier, updateAdminController)
router.put('/ban-admin/:adminId/admins/:adminId',tokenVerifier, updateBanAdminController)
router.delete("/admins/:adminId", deleteAdminByParamController)

router.post("/admins/create-doctor-earnings", tokenVerifier, createDoctorEarningController) 
router.put("/admins/earnings/:earningsId", tokenVerifier, updateEarningsController)


module.exports = router
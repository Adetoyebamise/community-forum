const { forgotPasswordAdminCodeService, validateVerificationCodeService, forgotAdminPasswordService } = require("../../services/adminService/adminForgotPasswordService")


const forgotPasswordAdminCodeController = async (req, res) => {
    return await forgotPasswordAdminCodeService(req.body, result => {
      return res.status(result.statusCode).json( result )
    })
}

const validateCodeAdminController = async (req, res) => {
    return await validateVerificationCodeService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json( result )
    })
}

const forgotAdminPasswordController = async (req, res) => {
    return await forgotAdminPasswordService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json( result )
    })
}

module.exports = { forgotPasswordAdminCodeController, validateCodeAdminController, forgotAdminPasswordController }
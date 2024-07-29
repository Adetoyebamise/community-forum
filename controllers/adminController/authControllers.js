const { signUpService, LoginService, updateAdminPasswordService } = require('../../services/adminService/authServices')

const signUpController = async (req, res) => {
    return await signUpService(req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

const loginController = async (req, res) => {
    let userType = req.originalUrl.split('/')[3]
    return await LoginService({ data: req.body, userType }, (result) => {
        return res.status(result.statusCode).json({ result })
    })
}

const updateAdminPasswordController = async (req, res) => {
    return await updateAdminPasswordService({param: req.params, body: req.body}, result => {
        return res.status(result.statusCode).json( result );
    })
}
module.exports = { signUpController, loginController, updateAdminPasswordController }
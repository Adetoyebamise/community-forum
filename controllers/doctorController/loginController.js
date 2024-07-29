const { doctorLoginService } = require("../../services/doctorsService/loginService");

const doctorLoginController = async (req, res) => {
    let userType = req.originalUrl.split('/')[3]  // split the url "/" to an array and select the 4th element
    return await doctorLoginService( {data: req.body, userType }, (result) => {
        res.status(result.statusCode).json( result );
    })
}


module.exports = { doctorLoginController };
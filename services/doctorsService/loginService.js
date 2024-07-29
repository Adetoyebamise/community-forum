const { BAD_REQUEST, UNAUTHORIZED, SUCCESS } = require("../../constants/statusCode")
const { messageHandler, tokenHandler, verifyPassword } = require("../../utils")
const { Doctors } = require("../../schema/doctorsSchema/doctorSchema")

module.exports.doctorLoginService = async ({data, userType}, callback) => {
    const { emailAddress, password } = data
    Doctors.findOne({ emailAddress },async (err, doct) => {
        if(err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message,{}))
        } else {
            if(!doct) {
                return callback(messageHandler("Invalid Email or Password, Please Try Again", false, UNAUTHORIZED, {}))
            }

            if (await verifyPassword(password, doct.password)) {
                const userData = tokenHandler(doct, userType)
                const dataInch = {id : doct._id, fullName: doct.fullName, email:doct.emailAddress, role: doct.role, imageUrl: doct.imageUrl}
                if(userData) {
                    return callback(messageHandler("Login Successful", true, SUCCESS, {userData, userType, dataInch}))
                }
            } else {
                return callback(messageHandler("Invalid Email or Password, Please Try Again", false, UNAUTHORIZED, {}))
            }
        }
    })
}
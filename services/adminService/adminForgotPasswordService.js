const { messageHandler, hashPassword, AlphaNumeric, tokenHandler  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  Admin  = require("../../schema/adminSchema/adminSchema")
const { sendMailNotification } = require("../../modules/notification/email")



const forgotPasswordAdminCodeService =  (body, callback) => {
    const {email} = body

     Admin.findOne({email}, async (err, admin) => {
        if (err) {
            return callback(messageHandler("Email is not availlable", false, BAD_REQUEST, {}))
        } if (!admin) {
            return callback(messageHandler("Admin is not availlable", false, BAD_REQUEST, {}))
        } else {
           admin.verificationCode = AlphaNumeric(5, "alpha")
            await admin.save(async (err, res) => {
                if (err) {
                    return callback(messageHandler("Email is not availlable", false, BAD_REQUEST, {}))
                } 
                else {
                    const substitutional_parameters = {adminName:res.name, adminEmail:res.email, code:admin.verificationCode }
                    await sendMailNotification(res.email, "password reset request", substitutional_parameters, "PASSWORD_RESET_REQUEST", true )
                    return callback(messageHandler("Verification code sent", true, SUCCESS, res))
                }
            })
        }
    })
  }
  
  const validateVerificationCodeService = (payload, callback) => {
    const {body,verificationCode} = payload
    Admin.findOne({verificationCode: body.verificationCode}, (err, success) => {
        if(err) {
        return callback(messageHandler("Verification Code is not availlable", false, BAD_REQUEST, {}))
        } if (!success) {
            return callback(messageHandler("Admin is not availlable", false, BAD_REQUEST, {}))
        }
        else {
            message = "Code validated"
            if(payload.verificationCode === verificationCode) {
                return callback(messageHandler(message, true, SUCCESS, success))
            }
        }
    })
  }
  
  const forgotAdminPasswordService = async ({ body, param }, callback) => {
    const { newPassword, confirmPassword} = body
    if (newPassword === confirmPassword) {
      Admin.updateOne({_id: param.adminId}, {$set: { password: await hashPassword(body.newPassword), confirmPassword: await hashPassword(body.confirmPassword) }}, (err, success) => {
        if (err) {
          return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err.message))
        } else if (success.modifiedCount === 0) {
          return callback(messageHandler("Admin not found", false, BAD_REQUEST, {}))
        }
          return callback( messageHandler("Admin password is successfully Updated", true, SUCCESS, success))
      })
    } else {
        return messageHandler("New Password and confirm Password should match", false, BAD_REQUEST, {})
      }
  }


module.exports = { forgotPasswordAdminCodeService, validateVerificationCodeService, forgotAdminPasswordService  }
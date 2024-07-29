const { messageHandler, hashPassword, verifyPassword, tokenHandler  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS, UNAUTHORIZED } = require("../../constants/statusCode")
const  Admin  = require("../../schema/adminSchema/adminSchema")

module.exports.signUpService = async (data, callback) => {
    const {email} = data;
    Admin.findOne({email}).exec(async (err, result) => {
      if(err){
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
      } else if(result !== null) {
        return callback(messageHandler("Sorry, this email already exist", true, SUCCESS, {}))
        } else {
          let saveData = { ...data, password: await hashPassword(data.password) }
          const admin = new Admin(saveData);
          return await admin.save(async (error, res) => {
              if (error) {
                  return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
              } else {
                  return callback(messageHandler("Admin Successfully Created", true, SUCCESS, res))
              }
        })
      }
    })
}

module.exports.LoginService = async ({ data, userType }, callback) => {
  const { email, password } = data
  Admin.findOne({ email }).exec(async (err, admin) => {
      if (err) {
          return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
      } else {
          if (!admin) {
              return callback(messageHandler("Account not found, Please signup to continue", false, UNAUTHORIZED, {}))
          } else {
              if (await verifyPassword(password, admin.password)) {
                  if (admin.status === 'Active') {
                      const userData = tokenHandler( admin, userType, admin.accountType )
                      return callback(messageHandler("Successfully Login", true, SUCCESS, userData))
                  } else {
                      return callback(messageHandler(`Sorry your account has been disabled`, false, FORBIDDEN, {}))
                  }
              } else {
                  return callback(messageHandler("Password entered was incorrect!, Please Try Again", false, UNAUTHORIZED, {}))
              }
          }
      }
  })
}

module.exports.updateAdminPasswordService = async ({param, body}, callback) => {
    let { oldPassword, newPassword, confirmPassword} = body;
    try {
        let admin = await Admin.findOne({ _id: param.adminId })
        if (!admin) {
            return callback(messageHandler("Account not found, Please Try Again", false, UNAUTHORIZED, {}))
        }
        const checkPassword = await verifyPassword(oldPassword, admin.password);
        if (!checkPassword) {
            return callback(messageHandler("Password is incorrect...", false, BAD_REQUEST, {}))
        } else if ( newPassword === oldPassword) { 
            return callback(messageHandler("Password has been used before, Use a new one", false, UNAUTHORIZED, {}))
        } else if ( newPassword !== confirmPassword ) {        
            return callback(messageHandler("New Password and Confirm new password must match...", false, BAD_REQUEST, {}))    
        } else {
           const changePassword = await hashPassword(newPassword)
           const changeConfirmPassword = await hashPassword(confirmPassword)
           let success = await Admin.updateOne({ _id: param.adminId }, { $set: {password: changePassword, confirmPassword: changeConfirmPassword }})
            return callback(messageHandler("Admin Password Successfully updated", true, SUCCESS, success))
        }
    } catch (err) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
    }
}
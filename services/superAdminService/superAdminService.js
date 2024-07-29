const { SUCCESS, BAD_REQUEST, UNAUTHORIZED } = require("../../constants/statusCode")
const  Admin  = require("../../schema/adminSchema/adminSchema")
const { messageHandler, queryConstructor, AlphaNumeric, hashPassword, verifyPassword, tokenHandler } = require("../../utils")
const { sendMailNotification } = require("../../modules/notification/email")
const mongoose = require("mongoose")

const signUpService = async (data, callback) => {
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

const loginService = async ({ data, userType }, callback) => {
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

const updateAdminPasswordService = async ({param, body}, callback) => {
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

const createAdminService = async (body, callback) => {
  const password = AlphaNumeric(4)
  try {
    const admin = new Admin({...body, password : await hashPassword(password)})
    await admin.save()
    const substitutional_parameters = {adminName: admin.name, adminEmail : admin.email, password: password }
    await sendMailNotification(admin.email, "Admin Details", substitutional_parameters, "ADMIN_DETAILS", true )
    return callback(messageHandler("admin successfully created", true, SUCCESS, admin))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}

const getAdminByParamService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "admins" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totaladmins: 0, admins: [] }))
    }
    try {
      const admins = await Admin.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Admin.find({ ...params }).countDocuments()
      if (!admins.length > 0) {
        return callback(messageHandler("No admins available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("admins successfully fetched", true, SUCCESS, { totaladmins:total, admins }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateAdminService = async ({param, body}, callback) => {
  delete body.adminId
  try {
      let result = await Admin.updateOne({ _id: param.adminId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("admin not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("admin successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, error.message, {}));
  }
}

const updateBanAdminService = async ({param, body}, callback) => {
  delete body.adminId
  try {
      let result = await Admin.updateOne({ _id: param.adminId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("admin not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("admin successfully banned", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, error.message, {}));
  }
}

const deleteAdminService =  ({ param}, callback) => {
  try {
        Admin.findOne({ _id: mongoose.Types.ObjectId(param.adminId) }, async (err,  admin) => {
        if (err) {
          return callback(messageHandler("Unable to delete admin, Please Try Again", false, BAD_REQUEST, {}))
        } if (admin === null) {
          return callback(messageHandler("No admin with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
           admin.deleteOne({ _id:mongoose.Types.ObjectId(param.adminId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, {}))
            } 
              return callback(messageHandler("admin successfully deleted", true, SUCCESS, success))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { signUpService, updateAdminPasswordService, createAdminService, loginService, getAdminByParamService, updateAdminService, updateBanAdminService, deleteAdminService }

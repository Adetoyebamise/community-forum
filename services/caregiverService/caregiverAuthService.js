const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const {SUCCESS, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN} = require("../../constants/statusCode")
const {messageHandler, hashPassword, verifyPassword, tokenHandler, AlphaNumeric} = require("../../utils/index")
const { sendMailNotification } = require("../../modules/notification/email")
const  {Userpoint}  = require("../../schema/userPointSchema")
const mongoose = require('mongoose')
const { createUser, getUser } = require("../../modules/zoom/zoom");

const searchAccountService = (body, callback) => {
    const {emailAddress} = body
    Caregiver.findOne({emailAddress}, async (err, caregiver) => {
        if (err) {
            return callback(messageHandler("Email is not available", false, BAD_REQUEST, {}))
        } if (!caregiver) {
            return callback(messageHandler("Caregiver is not available", false, BAD_REQUEST, {}))
        } else {
            caregiver.verificationCode = AlphaNumeric(5, "alpha")
            await caregiver.save(async (err, res) => {
                if (err) {
                    return callback(messageHandler("Email is not available", false, BAD_REQUEST, {}))
                } 
                else {
                    const substitutional_parameters = {caregiverName:caregiver.fullName, caregiverEmail:res.emailAddress, code:caregiver.verificationCode }
                    await sendMailNotification(res.emailAddress, "password reset request", substitutional_parameters, "PASSWORD_RESET_REQUEST", true )
                    return callback(messageHandler("Verification code sent", true, SUCCESS, res))
                }
            })
        }
    })
}

const validateVerificationCodeService = (payload, callback) => {
    const {body, verificationCode} = payload
    Caregiver.findOne({verificationCode: body.verificationCode}, (err, success) => {
        if(err) {
            return callback(messageHandler("Caregiver is not available, Kindly revalidate caregiver", false, BAD_REQUEST, {}))
        } if (!success) {
            return callback(messageHandler("Verification Code is not valid", false, BAD_REQUEST, {}))
        }
        else {
            message = "Code validated"
            if(payload.verificationCode === verificationCode) {
                return callback(messageHandler(message, true, SUCCESS, success))
            }
        }
    })
}

const forgotPasswordService = async ({ body, param }, callback) => {
    const { newPassword, confirmPassword} = body
    if (newPassword === confirmPassword) {
        Caregiver.updateOne({emailAddress: body.emailAddress}, {$set: { password: await hashPassword(body.newPassword), confirmPassword: await hashPassword(body.confirmPassword) }}, (err, success) => {
          if (err) {
            return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
          } else if(success.modifiedCount === 0) {
            return callback(messageHandler("Caregiver not found", false, BAD_REQUEST, {}))
          }
            return callback(messageHandler("Caregiver Password successfully Updated", true, SUCCESS, success)
          )
        })
    } else {
        return messageHandler("New Password and confirm Password should match", false, BAD_REQUEST, {})
    }
}

const verifyEmailService = async ({param, query}, callback) => {
    const caregiver = await Caregiver.findOne({emailToken: query.token})
    if (!caregiver) {
        return callback(messageHandler("Account Not found", true, BAD_REQUEST, {message: "redirect User to re-register"} ));
    }
    // redirect the person to the home page to register agaain. 
    else {
        caregiver.emailToken = null
        caregiver.isVerified = true
        await caregiver.save( (err, success) => {
         if (err) {
                return callback(messageHandler("Account cannot be verified", false, BAD_REQUEST, {message: err.message} ));
            } else {
                return callback(messageHandler("Account verified Successful", true, SUCCESS, { success} ));
            }
        })
    }
}

const createCaregiverService = async ({payload, userType}, callback) => {
    const {emailAddress, phoneNumber, password, confirmPassword} = payload
    const workwithThisName = payload.fullName
    const splitArray = workwithThisName.split(/(\s+)/)
    firstName = splitArray[0]
    lastName = splitArray[2]
    const  toHash = await hashPassword(AlphaNumeric(4, "alpha"))
    Caregiver.findOne({emailAddress} || {phoneNumber}, async(err, caregiver)  => {
        if(err){
            return callback(messageHandler("You have used this email before", false, BAD_REQUEST, {}))
        } 
        else if (caregiver !== null) {
            return callback(messageHandler("Sorry, this email or phone number already exist", true, SUCCESS, {}))  
        } 
        else if (password === confirmPassword) {
            const  toHash = await hashPassword(AlphaNumeric(4, "alpha"))
            let saveData = {...payload, emailToken: toHash, password: await hashPassword(payload.password), confirmPassword: await hashPassword(payload.confirmPassword)}
            let caregiver = new Caregiver(saveData)
            let jojoloPoint = new Userpoint({userId: caregiver._id})
            await jojoloPoint.save()
            const userData = tokenHandler( caregiver, userType )
            await createUser({ email: payload.emailAddress, firstName: firstName, lastName: lastName, type: 1}, async (data) => {
                if (data.error) {
                  const { id } = await getUser(payload.emailAddress)
                  console.log("id", data.id)
                  if (id) {
                      data.id = id
                    } else {
                        return callback(messageHandler(`zoom error: ${data.error}`, false, BAD_REQUEST, {}))
                    }
                }
            caregiver['zoomId'] = data.id
            return caregiver.save(async (error, result) => {
                caregiver.confirmPassword = undefined
                caregiver.password = undefined
                if (error) {
                    return callback(messageHandler("Something went wrong... Cannot create Caregiver account", false, BAD_REQUEST, error.message))
                } else {
                    const substitutional_parameters = {caregiverName:caregiver.fullName, caregiverEmail:result.emailAddress, code:caregiver.verificationCode } 
                        await sendMailNotification(result.emailAddress, "Welcome to Jojolo", substitutional_parameters, "WELCOME_MESSAGE", true )
                        return callback(messageHandler("Caregiver Account Successfully Created", true, SUCCESS, {result
                        , userData}))
                }
                })
            })
            } else {
            return callback(messageHandler("Password must match", false, BAD_REQUEST, {}))
        }
    })
}
 


const signInService = async ({ data, userType }, callback) => {
    const { emailAddress, password } = data

    Caregiver.findOne({ emailAddress }).exec(async (err, caregiver) => {
        if (err) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, {}))
        } else {
            if (!caregiver) {
                return callback(messageHandler("Invalid Email or Password, Please Try Again", false, UNAUTHORIZED, {}))
            } else {
                if (await verifyPassword(password, caregiver.password)) {
                    if (caregiver) {

                        const userData = tokenHandler( caregiver, userType )
                        const dataInch = {id : caregiver._id, fullName: caregiver.fullName, email:caregiver.emailAddress, roleDescription: caregiver.rolesDescription, imageUrl: caregiver.imageUrl}
                        return callback(messageHandler("Successfully Login", true, SUCCESS, {userData, userType, dataInch}))
                    }
                    else {
                        return callback(messageHandler(`Sorry your account has been disabled, Contact the Administrator.`, false, FORBIDDEN, {}))
                    }
                } else {
                    return callback(messageHandler("Password entered was incorrect!, Please Try Again", false, UNAUTHORIZED, {}))
                }
            }
        }
    })
}

module.exports = {searchAccountService, validateVerificationCodeService, forgotPasswordService, verifyEmailService, createCaregiverService, signInService}
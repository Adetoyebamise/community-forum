const { BAD_REQUEST, SUCCESS, FORBIDDEN, UNAUTHORIZED } = require('../../constants/statusCode')
const Caregiver = require('../../schema/caregiverSchema/caregiverSchema')
const { messageHandler, queryConstructor, verifyPassword, hashPassword } = require('../../utils/index')

const updateProfileService = async (payload, callback) => {
    let { body, params, image } = payload
    delete body.CaregiverId

    if (body) {
        return Caregiver.findOne({ _id: params.caregiverId }).exec((err, cat) => {
            if (err) {
                return callback(messageHandler("Something went wrong...", true, BAD_REQUEST, err))
            } else if (cat === null) {
                return callback(messageHandler("No user with the details found, Please Try Again", false, BAD_REQUEST, {}))
            } else {
                return Caregiver.updateOne({ _id: params.caregiverId }, { $set: { ...body, imageUrl: image } }, (error, success) => {
                    if (error) {
                        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error))
                    } else {
                        return callback(messageHandler("Profile Successfully Updated", true, SUCCESS, success))
                    }
                });
            }
        })
    } else {
        return callback(messageHandler(message, false, BAD_REQUEST, {}))
    }
}

    const updateCargiverPasswordService = async ({param, body}, callback) => {
        let { oldPassword, newPassword, confirmPassword} = body;
        try {
            let guardian = await Caregiver.findOne({ _id: param.caregiverId })
            if (!guardian) {
                return callback(messageHandler("Account not found, Please Try Again", false, UNAUTHORIZED, {}))
            }
            const checkPassword = await verifyPassword(oldPassword, guardian.password);
            if (!checkPassword) {
                return callback(messageHandler("Password is incorrect...", false, BAD_REQUEST, {}))
            } else if ( newPassword === oldPassword) { 
                return callback(messageHandler("Password has been used before, Use a new one", false, UNAUTHORIZED, {}))
            } else if ( newPassword !== confirmPassword ) {        
                return callback(messageHandler("New Password and Confirm new password must match...", false, BAD_REQUEST, {}))    
            } else {
               const changePassword = await hashPassword(newPassword)
               const changeConfirmPassword = await hashPassword(confirmPassword)
               let success = await Caregiver.updateOne({ _id: param.caregiverId }, { $set: {password: changePassword, confirmPassword: changeConfirmPassword }})
                return callback(messageHandler("Caregiver Password Successfully updated", true, SUCCESS, success))
            }
        } catch (err) {
            return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, err.message))
        }
    }


    const searchCaregiverByIdService = async (query, callback) => {
        const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "caregiver" )
        if(error) {
            return callback(messageHandler(error, false, BAD_REQUEST, { totalCaregivers: 0, caregivers: [] }))
        }
        try {
            const results = await Caregiver.find({ ...params,}).limit(limit).skip(skip).sort(sort)
        const totalresults = await Caregiver.find({ ...params,}).countDocuments()
    
            if(!results.length > 0) {
                return callback(messageHandler("No caregiver available", false, BAD_REQUEST, {}))
            }
            return callback(messageHandler("Caregivers successfully fetched", true, SUCCESS, { totalCaregivers: totalresults, caregivers: results }))
        }
        catch(error) {
            return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
        }
    }


module.exports = { updateProfileService, updateCargiverPasswordService, searchCaregiverByIdService }
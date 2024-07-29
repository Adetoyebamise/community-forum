const { updateCargiverPasswordService, updateProfileService ,searchCaregiverByIdService, updateNotificationService} = require('../../services/caregiverService/accountSettingsService');
const { fileModifier } = require('../../utils');

const updateCargiverPasswordController = async (req, res) => {
    return await updateCargiverPasswordService({param: req.params, body: req.body}, result => {
        return res.status(result.statusCode).json( result );
    })
}

const updateProfileController = async (req, res) => {
    let data = await fileModifier(req)
    return await updateProfileService(data, result => {
        return res.status(result.statusCode).json( result );
    })
}


const searchCaregiverByIdController = async (req, res) => {
    return await searchCaregiverByIdService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

module.exports = { updateProfileController, updateCargiverPasswordController, searchCaregiverByIdController }
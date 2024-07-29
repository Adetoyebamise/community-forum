const { getCaregiversListService, updateCaregiverStatusService, searchCaregiverService, deleteCaregiverService, createBookingService } = require("../../services/adminService/caregiverService")

const getCaregiversListController = async (req, res) => {
    return await getCaregiversListService(req.query, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const updateCaregiverStatusController = async (req, res) => {
    return updateCaregiverStatusService({param: req.params, body: req.body}, (result) => {
        return res.status(result.statusCode).json(result)
    })
}

const searchCaregiverController = async (req, res) => {
    return await searchCaregiverService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const deleteCaregiverController = async (req, res) => {
    return deleteCaregiverService(req.params, (result) => {
        return res.status(result.statusCode).json(result )
    })
}

const createBookingController = async (req, res) => {
    return await createBookingService({payload: req.body}, result => {
        return res.status(result.statusCode).json( result );
    })
};  

module.exports = { getCaregiversListController, updateCaregiverStatusController, searchCaregiverController, deleteCaregiverController, createBookingController }
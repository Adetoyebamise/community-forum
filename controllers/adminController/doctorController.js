const { getDoctorsListService, getDoctorsByParamService, updateDoctorStatusService, deleteDoctorService, searchDoctorService } = require("../../services/adminService/doctorService");

const getDoctorsListController = async (req, res) => {
    return await getDoctorsListService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const getDoctorsByParamController = async (req, res) => {
    return await getDoctorsByParamService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const updateDoctorStatusController = async (req, res) => {
    return await updateDoctorStatusService({param: req.params, body: req.body}, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const searchDoctorController = async (req, res) => {
    return await searchDoctorService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const deleteDoctorController = async (req, res) => {
    return await deleteDoctorService(req.params, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

module.exports = { getDoctorsListController, getDoctorsByParamController, updateDoctorStatusController, searchDoctorController, deleteDoctorController }
const {bookVaccinationService, getBookedVaccinationService, updateBookedVaccinationService,deleteBookedVaccinationService, } = require("../../services/caregiverService/caregiverVaccinationService")

const caregiverVaccinationController = async (req, res) => {
    return await bookVaccinationService(req.body, result => {
        return res.status(result.statusCode).json( result );
    })
};  

const getBookedVaccinationController = async (req, res) => {
    return await getBookedVaccinationService({query: req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}; 

const updateBookedVaccinationController = async (req, res) => {
    return await updateBookedVaccinationService({body : req.body, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}; 

const deleteBookedVaccinationController = async (req, res) => {
    return await deleteBookedVaccinationService({param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}; 

module.exports = {caregiverVaccinationController, getBookedVaccinationController, updateBookedVaccinationController, deleteBookedVaccinationController}
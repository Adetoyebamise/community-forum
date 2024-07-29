const { createVaccineService, getVaccineService, updateVaccineService, deleteVaccineService} = require("../../services/adminService/vaccineService")

const createVaccineController = async (req, res) => {
  return await createVaccineService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const getVaccineController = async (req, res) => {
    return await getVaccineService({query: req.query, param: req.params}, (result) => {
      res.status(result.statusCode).json( result )
    })
}

const updateVaccineController = async (req, res) => {
    return await updateVaccineService({param: req.params, body: req.body}, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const deleteVaccineController = async (req, res) => {
    return await deleteVaccineService({param: req.params}, (result) => {
        res.status(result.statusCode).json( result )
    })
}

module.exports = {  createVaccineController, getVaccineController, updateVaccineController, deleteVaccineController}
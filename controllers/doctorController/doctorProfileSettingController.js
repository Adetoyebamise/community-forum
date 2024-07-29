const {updateDoctorProfileService, updateDoctorPasswordService, updateMedicalLicenseService, updateValidCardService, searchDoctorByIdService} = require("../../services/doctorsService/doctorProfileSettingService")
const { fileModifier } = require('../../utils');
  
  
const updateDoctorProfileController = async (req, res) => {
    let data = await fileModifier(req)
    return await updateDoctorProfileService(data, result => {
       return res.status(result.statusCode).json( result );
      })
  }

const updateDoctorPasswordController = async (req, res) => {
    return await updateDoctorPasswordService({param: req.params, body : req.body}, (result) => {
      return res.status(result.statusCode).json( result )
    })
}

const updateMedicalLicenseController = async (req, res) => {
  let data = await fileModifier(req)
  return await updateMedicalLicenseService(data, result => {
     return res.status(result.statusCode).json( result );
    })
}

const updateValidCardController = async (req, res) => {
  let data = await fileModifier(req)
  return await updateValidCardService(data, result => {
     return res.status(result.statusCode).json( result );
    })
}

const searchDoctorByIdController = async (req, res) => {
  return await searchDoctorByIdService(req.query, (result) => {
      return res.status(result.statusCode).json( result )
  })
}

module.exports = { updateDoctorProfileController, updateDoctorPasswordController, updateMedicalLicenseController, updateValidCardController, searchDoctorByIdController  }


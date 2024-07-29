const { registerDoctorService, forgotPasswordCodeService, forgotDoctorPasswordService, validateVerificationCodeService, updateDoctorAvailabilityService, setDoctorAvailabilityService, createAvailabilityService, deleteDoctorAvailabilityService  }= require("../../services/doctorsService/doctorService")
const { fileModifier } = require("../../utils/")

const registerDoctorController = async (req, res) => {
    let data = await fileModifier(req)
    let userType = req.originalUrl.split('/')[3]  // split the url "/" to an array and select the 4th element
    return await registerDoctorService( {payload: data, userType}, (result) => {
        return res.status(result.statusCode).json( result );
    })
}

const forgotPasswordCodeController = async (req, res) => {
    return await forgotPasswordCodeService(req.body, result => {
      return res.status(result.statusCode).json( result )
    })
}

const validateCodeController = async (req, res) => {
    return await validateVerificationCodeService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json( result )
    })
}

const setDoctorAvailabilityController = async (req, res) => {
  return await setDoctorAvailabilityService({payload: req.body, param: req.params}, result => {
    return res.status(result.statusCode).json( result )
  })
}

const updateDoctorAvailabilityController  = async (req, res) => {
  return await updateDoctorAvailabilityService ( {body: req.body, param: req.params}, (result) => {
    return res.status(result.statusCode).json( result )
  })
}

const forgotDoctorPasswordController = async (req, res) => {
    return await forgotDoctorPasswordService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json( result )
    })
}

const createAvailabilityController = async (req, res) => {
  return await createAvailabilityService( req.body, (result) => {
      return res.status(result.statusCode).json( result );
  })
}

const deleteDoctorAvailabilityController = async (req, res) => {
  return await deleteDoctorAvailabilityService( {param:req.params, query: req.query}, (result) => {
      return res.status(result.statusCode).json( result );
  })
}


module.exports = { registerDoctorController, forgotDoctorPasswordController, forgotPasswordCodeController, validateCodeController, updateDoctorAvailabilityController, setDoctorAvailabilityController, createAvailabilityController, deleteDoctorAvailabilityController }
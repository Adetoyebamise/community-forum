const {searchAccountService, forgotPasswordService, validateVerificationCodeService, verifyEmailService, createCaregiverService , signInService} = require("../../services/caregiverService/caregiverAuthService")

const searchAccountController = async (req, res) => {
    return await searchAccountService(req.body, result => {
      return res.status(result.statusCode).json( result )
    })
}

const forgotPasswordController = async (req, res) => {
    return await forgotPasswordService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json( result )
    })
}

const validateCodeController = async (req, res) => {
    return await validateVerificationCodeService({body:req.body, param: req.params}, result => {
      return res.status(result.statusCode).json(result )
    })
}

const verifyEmailController = async (req, res) => {
  return await verifyEmailService(({query:req.query, param:req.params}),result => {
      res.status(result.statusCode).json( result );
  })
};

const createCaregiverController = async (req, res) => {
  let userType = req.originalUrl.split('/')[3]  // split the url "/" to an array and select the 4th element
    return await createCaregiverService({payload: req.body, userType}, result => {
        return res.status(result.statusCode).json( result )
    })
}

const signInController = async (req, res) => {
    let userType = req.originalUrl.split('/')[3]  // split the url "/" to an array and select the 4th element
    return await signInService({data: req.body, userType }, (result) => {
        return res.status(result.statusCode).json( result );
    });
}

module.exports =  {createCaregiverController, signInController, searchAccountController, forgotPasswordController, validateCodeController, verifyEmailController}
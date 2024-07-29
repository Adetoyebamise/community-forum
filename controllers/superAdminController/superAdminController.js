const { signUpService, loginService, updateAdminPasswordService, createAdminService, getAdminByParamService, updateAdminService, updateBanAdminService, deleteAdminService } = require("../../services/superAdminService/superAdminService")

const signUpController = async (req, res) => {
    return await signUpService(req.body, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

const loginController = async (req, res) => {
    let userType = req.originalUrl.split('/')[3]
    return await loginService({ data: req.body, userType }, (result) => {
        return res.status(result.statusCode).json({ result })
    })
}

const updateAdminPasswordController = async (req, res) => {
  return await updateAdminPasswordService({param: req.params, body: req.body}, result => {
      return res.status(result.statusCode).json( result );
  })
}

const createAdminController = async (req, res) => {
  return await createAdminService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const getAdminByParamController = async (req, res) => {
  return await getAdminByParamService(req.query, (result) => {
      res.status(result.statusCode).json( result )
  })
}

const updateAdminController = async (req, res) => {
  return await updateAdminService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json( result )
  });
};

const updateBanAdminController = async (req, res) => {
  return await updateBanAdminService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json( result )
  });
};

const deleteAdminByParamController = async (req, res) => {
  return await deleteAdminService({param: req.params}, (result) => {
      res.status(result.statusCode).json(result )
  })
}

module.exports = {signUpController, loginController, updateAdminPasswordController, createAdminController, getAdminByParamController, updateAdminController, updateBanAdminController, deleteAdminByParamController }
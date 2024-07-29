const { createBadgeService, getBadgeByParamService, updateBadgeService, deleteBadgeService } = require("../../services/adminService/badgesService")

const createBadgeController = async (req, res) => {
  return await createBadgeService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const getBadgeByParamController = async (req, res) => {
  return await getBadgeByParamService(req.query, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const updateBadgeController = async (req, res) => {
  return await updateBadgeService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json( result )
  });
};

const deleteBadgeByParamController = async (req, res) => {
  return await deleteBadgeService({param: req.params}, (result)=>{
      res.status(result.statusCode).json(result )
  })
}

module.exports = { createBadgeController, getBadgeByParamController, updateBadgeController, deleteBadgeByParamController }
const { createTagService, getTagByParamService, updateTagService, deleteTagService } = require("../../services/adminService/tagsService")

const createTagController = async (req, res) => {
  return await createTagService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const getTagByParamController = async (req, res) => {
  return await getTagByParamService(req.query, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const updateTagController = async (req, res) => {
  return await updateTagService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json( result )
  });
};

const deleteTagByParamController = async (req, res) => {
  return await deleteTagService({param: req.params}, (result)=>{
      res.status(result.statusCode).json(result )
  })
}

module.exports = { createTagController, getTagByParamController, updateTagController, deleteTagByParamController }
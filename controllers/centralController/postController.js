const { getPostByParamService, updatePostService, changePostStatusService, deletePostService, getSharedPostByParamService } = require('../../services/centralService/postService')

const getPostByParamController = async (req, res) => {
  return await getPostByParamService( req.query, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const getSharedPostByParamController = async (req, res) => {
  return await getSharedPostByParamService( req.query, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const updatePostController = async (req, res) => {
  return await updatePostService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json(result )
  });
};

const changePostStatusController = async (req, res) => {
  return await changePostStatusService( {param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json(result )
  });
};

const deletePostByParamController = async (req, res) => {
  return await deletePostService({param: req.params}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

module.exports = { getPostByParamController, updatePostController, changePostStatusController, deletePostByParamController, getSharedPostByParamController }
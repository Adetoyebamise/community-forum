const { getTagService , getFilterByPopularService,getTagByParamService, getUnansweredPostService} = require("../../services/centralService/tagService");

const getTagsByParamsController = async (req, res) => {
    return await getTagService(req.query, result => {
        return res.status(result.statusCode).json( result );
    })
}

const getFilterByPopularController = async (req, res) => {
    return await getFilterByPopularService(req.query, result => {
        return res.status(result.statusCode).json( result );
    })
}

const getUnansweredPostController = async (req, res) => {
    return await getUnansweredPostService(req.query, result => {
        return res.status(result.statusCode).json( result );
    })
}

const getTagByParamController = async (req, res) => {
    return await getTagByParamService(req.query, (result)=>{
        res.status(result.statusCode).json( result )
    })
  }

module.exports = { getTagsByParamsController, getFilterByPopularController,getTagByParamController, getUnansweredPostController }
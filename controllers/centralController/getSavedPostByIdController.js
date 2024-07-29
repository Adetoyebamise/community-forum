const { getSavedPostByIdService, getPostFeedService, getTopContributorService } = require("../../services/centralService/getSavedPostByIdService");

const getSavedPostByIdController = async (req, res) => {
    return await getSavedPostByIdService({param: req.params, query : req.query}, result => {
        return res.status(result.statusCode).json( result );
    })
};

const getPostFeedController = async (req, res) => {
    return await getPostFeedService({ param: req.params, query : req.query}, result => {
        return res.status(result.statusCode).json( result );
    })
};
 

const getTopContributorController = async (req, res) => {
    return await getTopContributorService({ param: req.params, query : req.query}, result => {
        return res.status(result.statusCode).json( result );
    })
};
module.exports = { getSavedPostByIdController, getPostFeedController , getTopContributorController }
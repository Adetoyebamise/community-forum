const {  searchPostByTitleService } = require("../../services/doctorsService/searchPostByTitleService");



const searchPostByTitleController = async (req, res) => {
    return await searchPostByTitleService({param: req.params, query: req.query}, result => {
        return res.status(result.statusCode).json( result );
    })
};


module.exports = {  searchPostByTitleController }
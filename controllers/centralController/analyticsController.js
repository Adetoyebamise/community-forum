const { analyticsService } = require("../../services/centralService/analyticsService")

const analyticsController = async (req, res) => {
    return await analyticsService(result => {
        res.status(result.statusCode).json( result );
    })
};
module.exports = { analyticsController }
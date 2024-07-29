const { getBadgeNotificationService, updateBadgeNotificationService } = require("../../services/centralService/badgeNotificationService");

const getBadgeNotificationController = async (req, res) => {
    return await getBadgeNotificationService(req.query, result => {
        return res.status(result.statusCode).json( result );
    })
}

const updateBadgeNotificationController = async (req, res) => {
    return await updateBadgeNotificationService({params: req.params, body: req.body}, (result) => {
        return res.status(result.statusCode).json( result )
    })
  }

module.exports = { getBadgeNotificationController, updateBadgeNotificationController };
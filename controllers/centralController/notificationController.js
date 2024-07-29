const { sendNotificationMessageService, getPaymentHistoryNotificationService, getEarningHistoryNotificationService } = require("../../services/centralService/notificationService")

module.exports.sendNotificationMessageController = async (req, res) => {
    return await sendNotificationMessageService(req.body, result => {
        return res.status(result.statusCode).json(result );
    });
};

module.exports.getPaymentHistoryNotificationController = async (req, res) => {
    return await getPaymentHistoryNotificationService(req.query, result => {
        return res.status(result.statusCode).json(result );
    });
}

module.exports.getEarningHistoryNotificationController = async (req, res) => {
    return await getEarningHistoryNotificationService(req.query, result => {
        return res.status(result.statusCode).json(result );
    });
}
const { createNotificationSettingService, getNotificationSettingByParamsService,  deleteNotificationSettingService } = require('../../services/centralService/notificationSettingService')

const createNotificationSettingController = async (req, res) => {
  return await createNotificationSettingService({body: req.body, param: req.params}, result => {
    return res.status(result.statusCode).json( result )
  })
}

const getNotificationSettingByParamsController = async (req, res) => {
  return await getNotificationSettingByParamsService(req.query, result => {
    return res.status(result.statusCode).json( result )
  })
}

const deleteNotificationSettingController = async (req, res) => {
  return await deleteNotificationSettingService(req.params, result => {
      return res.status(result.statusCode).json( result );
  })
}

module.exports = { createNotificationSettingController, getNotificationSettingByParamsController,  deleteNotificationSettingController }
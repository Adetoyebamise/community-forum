const { getAnalyticsService , getUserStatAnalyticsService, getSpecialistStatService, getUserActivityService, getBookingAnalyticsService, getYearlyUserActivityService} = require("../../services/adminService/analyticsService")

const getAnalyticsController = async (req, res) => {
  return await getAnalyticsService((result) => {
    res.status(result.statusCode).json(result )
  })
}

const getUserStatAnalyticsController = async (req, res) => {
  return await getUserStatAnalyticsService((result) => {
    res.status(result.statusCode).json(result )
  })
}

const getSpecialistStatController = async (req, res) => {
  return await getSpecialistStatService((result) => {
    res.status(result.statusCode).json(result )
  })
}

const getBookingAnalyticsController = async (req, res) => {
  return await getBookingAnalyticsService((result) => {
    res.status(result.statusCode).json(result )
  })
}

const getUserActivityController = async (req, res) => {
  return await getUserActivityService({query: req.query, param: req.params}, (result) => {
    res.status(result.statusCode).json(result )
  })
}

const getYearlyUserActivityController = async (req, res) => {
  return await getYearlyUserActivityService({query: req.query, param: req.params}, (result) => {
    res.status(result.statusCode).json(result)
  })
}
module.exports = { getAnalyticsController, getUserStatAnalyticsController, getSpecialistStatController,getBookingAnalyticsController, getUserActivityController,getYearlyUserActivityController }

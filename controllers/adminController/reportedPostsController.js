const { getReportedPostsService, deleteReportedPostService } = require("../../services/adminService/reportedPostsService")

const getReportedPostsController = async (req, res) => {
  return await getReportedPostsService(req.query, (result) => {
    res.status(result.statusCode).json(result )
  })
}

const deleteReportedPostController = async (req, res) => {
  return await deleteReportedPostService({query : req.query, param : req.params}, (result) => {
    res.status(result.statusCode).json(result )
  })
}

module.exports = { getReportedPostsController, deleteReportedPostController }
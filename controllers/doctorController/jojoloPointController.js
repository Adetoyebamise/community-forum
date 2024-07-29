const {getPointService, awardBadgeService}  = require("../../services/doctorsService/jojoloPointService")

const getPointController = async (req, res) => {
  return await getPointService( req.query, result => {
      return res.status(result.statusCode).json( result );
  })
};

// update achievement badge
const awardBadgeController = async (req, res) => {
  return await awardBadgeService({param: req.params, query : req.query}, result => {
      return res.status(result.statusCode).json( result );
  })
};

module.exports = { getPointController, awardBadgeController }
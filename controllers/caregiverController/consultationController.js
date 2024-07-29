const {getPostConsultationHistoryService}  = require("../../services/caregiverService/consultationService")

const getConsultationController = async (req, res) => {
  return await getPostConsultationHistoryService({param: req.params, query : req.query}, result => {
      return res.status(result.statusCode).json( result );
  })
};

module.exports = { getConsultationController }
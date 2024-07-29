const { getDoctorEarningService, getDoctorTypeOfServiceService } = require('../../services/doctorsService/earningService')

module.exports.getDoctorEarningController = async (req, res) => {
    return await getDoctorEarningService({query: req.query, param: req.parms}, (result) => {
        return res.status(result.statusCode).json({ result });
    });
}

module.exports.getDoctorTypeOfServiceController = async (req, res) => {
  return await getDoctorTypeOfServiceService({query: req.query, param: req.parms}, (result) => {
      return res.status(result.statusCode).json({ result });
  });
}
const { planDurationDetailService, getDoctorLatestSubscriptionService , getPaymentService} = require("../../services/caregiverService/planDurationDetailService.js");

module.exports.updatePlanDurationDetailController = async (req, res) => {
    return await planDurationDetailService({body: req.body, param:req.params}, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

module.exports.getDoctorLatestSubscriptionController = async (req, res) => {
    return await getDoctorLatestSubscriptionService({query:req.query}, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

module.exports.getPaymentController = async (req, res) => {
    return await getPaymentService({query:req.query, param : req.params}, (result) => {
        return res.status(result.statusCode).json( result )
    })
}
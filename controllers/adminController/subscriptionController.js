const { createSubscrptionService, getSubscriptionService, updateSubscriptionService, deleteSubscriptionService, createDoctorEarningService, updateEarningsService} = require("../../services/adminService/subscriptionService")

const createSubscrptionController = async (req, res) => {
  return await createSubscrptionService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const getSubscriptionController = async (req, res) => {
    return await getSubscriptionService({param: req.params, query: req.query}, (result) => {
      res.status(result.statusCode).json( result )
    })
}

const updateSubscriptionController = async (req, res) => {
    return await updateSubscriptionService({param: req.params, body: req.body}, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const deleteSubscriptionController = async (req, res) => {
    return await deleteSubscriptionService({param: req.params}, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const createDoctorEarningController = async (req, res) => {
  return await createDoctorEarningService(req.body, (result) => {
    res.status(result.statusCode).json( result )
  })
}

const updateEarningsController = async (req, res) => {
  return await updateEarningsService({param: req.params, body: req.body}, (result) => {
      res.status(result.statusCode).json( result )
  })
}
module.exports = {  createSubscrptionController, getSubscriptionController, updateSubscriptionController, deleteSubscriptionController, createDoctorEarningController, updateEarningsController}
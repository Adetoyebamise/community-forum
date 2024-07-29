const { createSubscriptionService } = require("../../services/caregiverService/subscriptionService");
const {getSubscriptionService} = require("../../services/caregiverService/getSubscriptionService");

const subscribePlanController = async (req, res) => {
  return await createSubscriptionService(req.body,
    (result) => {return res.status(result.statusCode).json( result )});
};

const getSubscriptionController = async (req, res) => {
    return await getSubscriptionService({param: req.params, query: req.query}, (result) => {
      res.status(result.statusCode).json( result )
    })
}
module.exports = { subscribePlanController, getSubscriptionController };

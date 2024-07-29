const {createWellnessBookingService, getUpcomingWellnessEventService, updateWellnessEventService, deleteWellnessEventService } = require("../../services/caregiverService/caregiverWellnessService")

const createWellnessBookingController = async (req, res) => {
    return await createWellnessBookingService({payload : req.body, param: req.params}, result => {
        return res.status(result.statusCode).json(result );
    })
};  

const getUpcomingWellnessEventController = async (req, res) => {
    return await getUpcomingWellnessEventService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};  

const updateWellnessEventController = async (req, res) => {
    return await updateWellnessEventService({body : req.body, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};

const deleteWellnessEventController = async (req, res) => {
    return await deleteWellnessEventService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};

module.exports = {createWellnessBookingController, getUpcomingWellnessEventController, updateWellnessEventController, deleteWellnessEventController }
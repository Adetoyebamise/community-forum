const {
  createCaregiverBookingService,
  getUpcomingDoctorEventService,
  updateBookingService,
  deleteBookingEventService,
} = require("../../services/caregiverService/caregiverBookingService");

const createCaregiverBookingController = async (req, res) => {
    return await createCaregiverBookingService(req.body, result => {
        return res.status(result.statusCode).json( result );
    })
};  

const getUpcomingDoctorEventController = async (req, res) => {
    return await getUpcomingDoctorEventService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};  

const updateBookingEventController = async (req, res) => {
    return await updateBookingService({body : req.body, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};

const deleteBookingEventController = async (req, res) => {
    return await deleteBookingEventService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};

module.exports = {
  createCaregiverBookingController,
  getUpcomingDoctorEventController,
  updateBookingEventController,
  deleteBookingEventController,
};

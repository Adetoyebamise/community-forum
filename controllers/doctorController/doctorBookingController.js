const { createBookingAcceptService, createBookingRejectService, getDoctorUpcomingBookingService , getDoctorPendingBookingService } = require("../../services/doctorsService/doctorBookingService")


const createBookingAcceptController = async(req, res)=> {
    return await createBookingAcceptService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createBookingRejecttController = async(req, res)=> {
    return await createBookingRejectService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const getDoctorUpcomingBookingController = async (req, res) => {
    return await getDoctorUpcomingBookingService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};  

const getDoctorPendingBookingController = async (req, res) => {
    return await getDoctorPendingBookingService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
};  

module.exports = { createBookingAcceptController, createBookingRejecttController,  getDoctorUpcomingBookingController , getDoctorPendingBookingController  }
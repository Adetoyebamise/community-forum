const { createBookingRescheduleService, getDoctorsListService  } = require('../../services/centralService/createBookingRescheduleService')


const createBookingRescheduleController = async(req, res)=> {
    return await createBookingRescheduleService({body:req.body} , result =>{
        return res.status(result.statusCode).json( result );
    })
}

const getDoctorsListController = async (req, res) => {
    return await getDoctorsListService(req.query, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

module.exports = { createBookingRescheduleController, getDoctorsListController }
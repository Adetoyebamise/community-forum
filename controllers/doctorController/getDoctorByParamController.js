const {getDoctorByService} = require("../../services/doctorsService/getDoctorByParamService")

const getDoctorByParamController = async( req, res) => {
    return await getDoctorByService(req.query, result => {
        return res.status(result.statusCode).json( result );
    });
}

module.exports = {getDoctorByParamController}
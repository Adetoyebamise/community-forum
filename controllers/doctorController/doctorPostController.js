const { createDoctorPostService, createPostLikedService, createSharePostService } = require("../../services/doctorsService/doctorPostService")

const createDoctorPostController = async(req, res)=> {
    return await createDoctorPostService(req, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostLikedController = async(req, res)=> {
    return await createPostLikedService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createSharePostController = async(req, res)=> {
    return await createSharePostService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

module.exports = { createDoctorPostController, createPostLikedController, createSharePostController }
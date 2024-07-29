const { createPostConsultationService, getPostConsultationHistoryService } = require("../../services/doctorsService/postConsultationFormServce")


const createPostConsultationController = async(req, res)=> {
    return await createPostConsultationService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const getPostConsultationHistoryController = async (req, res) => {
    return await getPostConsultationHistoryService( req.query, (result)=>{
        res.status(result.statusCode).json( result )
    })
  }

module.exports = { createPostConsultationController, getPostConsultationHistoryController  }
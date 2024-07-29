const {createCaregiverPostService, createPostLikedService, createSharePostService, createPostCommentReplyService, createPostCommentService
} = require("../../services/caregiverService/postService.js");
const { fileModifier } = require("../../utils");

const caregiverCreatePostController = async (req, res) => {
    let data = await fileModifier(req)
    return await createCaregiverPostService(data, (result) => {
        return res.status(result.statusCode).json( result )
    })
}

const createPostLikedController = async(req, res)=> {
    return await createPostLikedService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentReplyController = async(req, res)=> {
    return await createPostCommentReplyService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createSharePostController = async(req, res)=> {
    return await createSharePostService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentController = async(req, res)=> {
    return await createPostCommentService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

module.exports = { caregiverCreatePostController, createPostLikedController,createPostCommentReplyController, createPostCommentController, createSharePostController };

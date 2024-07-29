const { createPostCommentService, createPostCommentReplyService, createReportPostService, createPostCommentLikeService, createPostCommentUnlikeService, createPostCommentReplyLikeService, createPostCommentReplyUnlikeService } = require("../../services/centralService/commentService")

const createPostCommentController = async(req, res)=> {
    return await createPostCommentService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentReplyController = async(req, res)=> {
    return await createPostCommentReplyService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentLikeController = async(req, res)=> {
    return await createPostCommentLikeService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentUnliikeController = async(req, res)=> {
    return await createPostCommentUnlikeService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createReportPostController = async(req, res)=> {
    return await createReportPostService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentReplyLikeController = async(req, res)=> {
    return await createPostCommentReplyLikeService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

const createPostCommentReplyUnlikeController = async(req, res)=> {
    return await createPostCommentReplyUnlikeService(req.body, (result) =>{
        return res.status(result.statusCode).json( result );
    })
}

module.exports = { createPostCommentController, createPostCommentReplyController, createReportPostController, 
    createPostCommentLikeController, createPostCommentUnliikeController, createPostCommentReplyLikeController, createPostCommentReplyUnlikeController}
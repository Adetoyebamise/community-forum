const doctorCommentReplyValidation = {
    postId: {
        notEmpty: true,
        errorMessage: "Post Id field cannot be empty"
    },
    doctorId: {
        notEmpty: true,
        errorMessage: "Doctor Id Post field cannot be empty"
    },
    reply: {
        notEmpty: true,
        errorMessage: "Reply field cannot be empty"
    },
    commentId: {
        notEmpty: true,
        errorMessage: "Comment Id field cannot be empty"
    },
}

module.exports = { doctorCommentReplyValidation }
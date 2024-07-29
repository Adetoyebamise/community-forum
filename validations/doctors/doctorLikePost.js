const doctorLikePostValidation = {
    postId: {
        notEmpty: true,
        errorMessage: "Post Id field cannot be empty"
    },
    doctorId: {
        notEmpty: true,
        errorMessage: "Doctor Id Post field cannot be empty"
    },
}

module.exports = { doctorLikePostValidation }
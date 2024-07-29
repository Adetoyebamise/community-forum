const caregiverLikePostValidation = {
    postId: {
        notEmpty: true,
        errorMessage: "Post Id field cannot be empty"
    },
    caregiverId: {
        notEmpty: true,
        errorMessage: "Doctor Id Post field cannot be empty"
    },
}

module.exports = { caregiverLikePostValidation }
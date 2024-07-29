const commentValidation = {
    text: {
        notEmpty: true,
        errorMessage: "Text field cannot be empty"
    },
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    // caregiverId: {
    //     notEmpty: true,
    //     errorMessage: "CaregiverId field cannot be empty"
    // },
    doctorId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

module.exports = {commentValidation }
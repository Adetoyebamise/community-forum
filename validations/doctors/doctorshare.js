const sharePostDoctorValidation = {
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    doctorId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

module.exports = {sharePostDoctorValidation }
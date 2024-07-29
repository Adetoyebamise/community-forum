const commentDoctorValidation = {
    comments: {
        notEmpty: true,
        errorMessage: "Comment field cannot be empty"
    },
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    doctorId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

const reportPostDoctorValidation = {
    reportPost: {
        notEmpty: true,
        errorMessage: "Report Post field cannot be empty"
    },
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    doctorId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

module.exports = {commentDoctorValidation, reportPostDoctorValidation }
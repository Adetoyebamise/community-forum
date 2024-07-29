const commentCaregiverValidation = {
    comments: {
        notEmpty: true,
        errorMessage: "Comment field cannot be empty"
    },
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    caregiverId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

const sharePostCaregiverValidation = {
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    caregiverId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}

const reportPostCaregiverValidation = {
    reportPost: {
        notEmpty: true,
        errorMessage: "Report Post field cannot be empty"
    },
    postId: {
        notEmpty: true,
        errorMessage: "PostId field cannot be empty"
    },
    caregiverId: {
        notEmpty: true,
        errorMessage: "DoctorId field cannot be empty"
    },
}


module.exports = {commentCaregiverValidation, sharePostCaregiverValidation, reportPostCaregiverValidation }
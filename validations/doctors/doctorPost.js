const doctorPostValidation = {
    title: {
        notEmpty: true,
        errorMessage: "Title of Post field cannot be empty"
    },
    content: {
        notEmpty: true,
        errorMessage: "Content of Post field cannot be empty"
    },
}

module.exports = { doctorPostValidation }
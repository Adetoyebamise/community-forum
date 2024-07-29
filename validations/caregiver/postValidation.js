const postValidation = {
    title: {
        notEmpty: true,
        errorMessage: "Title field cannot be empty"
    },
    content: {
        notEmpty: true,
        errorMessage: "Content message cannot be empty"
    },
}

module.exports = { postValidation }
const caregiverLoginValidation = {
    emailAddress: {
        notEmpty: true,
        errorMessage: "Email cannot be empty"
    },
    password: {
        notEmpty: true,
        errorMessage: "Password cannot be empty"
    },
}

module.exports = { caregiverLoginValidation };
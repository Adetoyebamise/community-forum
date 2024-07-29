const { Caregivers } = require("../../schema/caregiverSchema/caregiverSchema")

const profileValidation = {
    fullName: {
        notEmpty: true,
        errorMessage: "fullName cannot be empty"
    },
    emailAddress: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",

    },
    phoneNumber: {
        notEmpty: true,
        errorMessage: "Phone Number cannot be empty",
        isLength: {
            errorMessage: 'Phone Number should be at least 11 digits long',
            options: { min : 11},
        },
    }
}

module.exports =  { profileValidation }
const { Doctors } = require("../../schema/doctorsSchema/doctorSchema")

const profileValidation = {
    fullName: {
        notEmpty: false,
        errorMessage: "Full name cannot be empty"
    },
    emailAddress: {
        notEmpty: false,
        errorMessage: "Email cannot be empty",
    },
    phoneNumber: {
        notEmpty: false,
        errorMessage: "Phone Number cannot be empty",
        isLength: {
            errorMessage: 'Phone Number should be at least 11 digits long',
            options: { min : 11},
        },
        notEmpty: false,
        errorMessage: "phone number cannot be empty",
    }
}

module.exports =  { profileValidation }
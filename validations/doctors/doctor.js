const { Doctors } = require("../../schema/doctorsSchema/doctorSchema")

const registerValidation = {
    fullName: {
        notEmpty: true,
        errorMessage: "Full name cannot be empty"
    },
    emailAddress: {
        notEmpty: true,
        errorMessage: "Email cannot be empty",
        custom: {
            options: value => {
                return Doctors.find({
                    emailAddress: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email already in use')
                    }
                })
            }
        }
    },
    phoneNumber: {
        notEmpty: true,
        errorMessage: "Phone Number cannot be empty",
        isLength: {
            errorMessage: 'Phone Number should be at least 11 digits long',
            options: { min : 11},
        },
        notEmpty: true,
        errorMessage: "phone number cannot be empty",
        custom: {
            options: value => {
                return Doctors.find({
                    phoneNumber: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Phone number already in use')
                    }
                })
            }
        }
    },
    address: {
        notEmpty: true,
        errorMessage: "address cannot be empty"
    },
    country: {
        notEmpty: true,
        errorMessage: "country cannot be empty"
    },
    cityOrState: {
        notEmpty: true,
        errorMessage: "City/State cannot be empty"
    },
    role: {
        notEmpty: true,
        errorMessage: "Role cannot be empty"
    },
    address: {
        notEmpty: true,
        errorMessage: "address cannot be empty"
    },
    yearsOfExperience: {
        notEmpty: true,
        errorMessage: "Years of experience cannot be empty"
    }
}

module.exports =  { registerValidation }
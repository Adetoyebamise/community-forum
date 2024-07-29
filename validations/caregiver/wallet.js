const paymentVerifyValid = {
  reference: {
      notEmpty: true,
      errorMessage: "Reference cannot be empty",
  },
  userId: {
      notEmpty: true,
      errorMessage: "Invalid user cannot be empty"
  },
}

module.exports = { paymentVerifyValid }
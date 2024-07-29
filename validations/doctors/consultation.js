const consultationValidation = {
    // childInformationId: {
    //     notEmpty: true,
    //     errorMessage: "Child Information field cannot be empty"
    // },
    presentingComplaint: {
        notEmpty: true,
        errorMessage: "Presenting Complaint field cannot be empty"
    },
    workingDiagnosis: {
        notEmpty: true,
        errorMessage: "Working Diagnosis field cannot be empty"
    },
    prescription: {
        notEmpty: true,
        errorMessage: "Prescription field cannot be empty"
    },
    // advise: {
    //     notEmpty: true,
    //     errorMessage: "Advice field cannot be empty"
    // },
    referrals: {
        notEmpty: true,
        errorMessage: "Referrals field cannot be empty"
    },
}

module.exports =  { consultationValidation }







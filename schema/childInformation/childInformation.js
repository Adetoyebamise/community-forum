const mongoose = require('mongoose');

const childInformationSchema = new mongoose.Schema({
  childName  : {
      type : String,
      required: true
  }, 
  dateOfBirth : {
      type : String,
      required : true,
  }, 
  gender : {
      type : String, 
      enum: ["male", "female"],
      required: true
  },
  address : {
    type : String,
    required: true
  },
  city : {
    type: String 
  },
  vaccinationPlace: {
    type: String,
    required: true
  },
  caregiverId : {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Caregiver",
  },
  vaccinationType: {
    type: String,
    required : true
  }, 
  bloodGroup : {
    type : String,
    enum: ["A", "B", "AB", "O"],
    required: true
  },
  genotype : {
    type : String,
    enum: ["AA", "SS", "AS" , "AC"],
    required :true
  },
  allergies: {
      type : String,
  },
  specialNeeds : {
      type : String,
  },
  medicalConditions : {
    type : String,
},
}, {timestamps: true })

let childInformation = mongoose.model('childInformation', childInformationSchema, 'childInformation')
module.exports = { ChildInformation: childInformation }
     

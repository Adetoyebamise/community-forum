const mongoose = require("mongoose");

let caregiverSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    rolesDescription: {
      type: String,
      required: true,
      enum: ["Father", "Mother", "Guardian"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    cityOrState: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    posts: {
      type: Array,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    numberOfChildren: {
      type: String,
    },
    nextOfKin: {
      type: String,
    },
    verificationCode: {
      type: String,
    },
    is_SavedPosts: {
      type: Array,
    },
    nextOfKinPhoneNumber: {
      type: String,
    },
    addChild: {
      type: Array,
    },
    childInformationId: [
      {
        childId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "childInformation",
        },
      },
    ],
    emailToken: {
      type: String,
    },
    consultationHistory: {
      type: Array,
      ref: "Consultations",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "RESTRICTED"],
      default: "ACTIVE",
    },
    plan: {
      type: Array,
    },
    zoomId : {
      type : String
    },
    appSubscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppSubscriptions",
    },
    userPoints: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPoint",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Caregiver", caregiverSchema);

const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const { Withdrawals } = require("../../schema/adminSchema/withdrawalSchema");
const { Bookings } = require("../../schema/bookingSchema/bookingSchema")


module.exports.getDoctorEarningService = async ({query, param}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "date" )
  if(error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalUserActivity: 0, activity: [] }))
  }
  try {
      let monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct", "Nov", "Dec"]

      const withdrawals = await Withdrawals.find({})
      let array = []
      for (let index = 1; index < 13; index++) {
      // index = ("0" + index).slice(-2)
      const data = withdrawals.filter(element => {
          return element.createdAt.getMonth() + 1 === index
      });
      array.push({[monthArray[index]]: data.length})
      }
      if(!Withdrawals.length > 0) {
          return callback(messageHandler("No User Activity available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("User Activity successfully fetched", true, SUCCESS, { array : array }))
  }

  catch(error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports.getDoctorTypeOfServiceService  = async ({query, param}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", createdAt: 'createdAt' }, "date" )
  if(error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalDoctorsEarning: 0, earning: [] }))
  }
  try {
      let monthArray = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct", "Nov", "Dec"]

      const wellnessCheckup = await Bookings.find({typeOfService : "Wellness Checkup"})
      let wellnessCheckupArray = []
      for (let index = 1; index < 13; index++) {
      // index = ("0" + index).slice(-2)
      const data = wellnessCheckup.filter(element => {
          return element.createdAt.getMonth() + 1 === index
      });
      wellnessCheckupArray.push({[monthArray[index]]: data.length})
      }
      
      const virtualConsultation = await Bookings.find({typeOfService : "Virtual Consultation"})
      let virtualConsultationArray = []
      for (let index = 1; index < 13; index++) {
      // index = ("0" + index).slice(-2)
      const data = virtualConsultation.filter(element => {
          return element.createdAt.getMonth() + 1 === index
      });
      virtualConsultationArray.push({[monthArray[index]]: data.length})
      }

      const physicalConsultation = await Bookings.find({typeOfService : "Physical Consultation"})
      let physicalConsultationArray = []
      for (let index = 1; index < 13; index++) {
      // index = ("0" + index).slice(-2)
      const data = physicalConsultation.filter(element => {
          return element.createdAt.getMonth() + 1 === index
      });
      physicalConsultationArray.push({[monthArray[index]]: data.length})
      }

      const privateChat = await Bookings.find({typeOfService : "Private Chat"})
      let privateChatArray = []
      for (let index = 1; index < 13; index++) {
      // index = ("0" + index).slice(-2)

      const data = privateChat.filter(element => {
          return element.createdAt.getMonth() + 1 === index
      });
      privateChatArray.push({[monthArray[index]]: data.length})

      }

      const representationalParameters = { wellnessCheckupArray, virtualConsultationArray , physicalConsultationArray, privateChatArray }
      if(!wellnessCheckup.length > 0) {
          return callback(messageHandler("No Graphical Illuastration available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Service Type Graphical Illustration ", true, SUCCESS, representationalParameters))
  }

  catch(error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

// getPaymentHistoryService 

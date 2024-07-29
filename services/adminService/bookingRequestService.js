const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const mongoose = require('mongoose');
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const {Doctors} = require ("../../schema/doctorsSchema/doctorSchema")
const { Bookings } = require("../../schema/bookingSchema/bookingSchema");

module.exports.getBookingRequestService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { status: "status", 'createdAt': 'createdAt' }, "Bookings" )
  console.log("params", params)
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalBookings: 0, bookings: [] }))
    }
    try {
      const bookings = await Bookings.find({ ...params }).limit(limit).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors}).skip(skip).sort(sort)
      console.log("bookings", bookings)
      let total = await Bookings.find({ ...params }).countDocuments()
      if (!bookings.length > 0) {
        return callback(messageHandler("No Bookings available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Bookings successfully fetched", true, SUCCESS, { totalBookings: total, bookings }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports.getRequestByStatusService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "Bookings" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalBookings: 0, bookings: [] }))
    }
    try {
      const bookings = await Bookings.find({ ...params }).limit(limit).skip(skip).sort(sort)
      console.log("bookings", bookings)
      let total = await Bookings.find({ ...params }).countDocuments()
      if (!bookings.length > 0) {
        return callback(messageHandler("No Bookings available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Bookings successfully fetched", true, SUCCESS, { totalBookings: total, bookings }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports.searchBookingRequestByNameService = async ({param, query}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalBookingRequests': 'totalBookingRequest', 'createdAt': 'createdAt', }, "fullname" )
  console.log("params", params)
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalBookingRequest: 0, BookingRequest: [] }))
    }
    try {
      if (!query.search) {
        return callback(messageHandler("Search cannot be empty", false, BAD_REQUEST, []))
      }
      const bookings = await Bookings.find({ fullname : { $regex: query.search, $options: 'i' } }).limit(limit).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors}).skip(skip).sort(sort)
      let array = []
      const data = bookings.filter((element) => {
        return element.caregiverId.fullName === params.search
      })
      array.push(data)
      console.log("array", array)
      if (!bookings.length > 0) {
        return callback(messageHandler("No bookings requested available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Sorted Bookings request successfully fetched", true, SUCCESS, { array }))
    } catch (err) {
      return callback(messageHandler( `${err.message}`, false, BAD_REQUEST, err))
    }
}

module.exports.searchBookingRequestByRoleService = async ({param, query}, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalBookingRequests': 'totalBookingRequest', 'createdAt': 'createdAt', }, "role" )
  console.log("params", params)
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalBookingRequest: 0, BookingRequest: [] }))
    }
    try {
      if (!query.search) {
        return callback(messageHandler("Search cannot be empty", false, BAD_REQUEST, []))
      }
      const bookings = await Bookings.find({ role : { $regex: query.search, $options: 'i' } }).limit(limit).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors}).skip(skip).sort(sort)
      let array = []
      const data = bookings.filter((element) => {
        return element.doctorId.role === params.search
      })
      array.push(data)
      console.log("array", array)
      if (!bookings.length > 0) {
        return callback(messageHandler("No bookings requested available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Sorted Bookings request successfully fetched", true, SUCCESS, { array }))
    } catch (err) {
      return callback(messageHandler( `${err.message}`, false, BAD_REQUEST, err))
    }
}
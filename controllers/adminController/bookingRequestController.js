const { getBookingRequestService, searchBookingRequestByNameService, getRequestByStatusService, searchBookingRequestByRoleService } = require('../../services/adminService/bookingRequestService')

module.exports.getBookingRequestController = async (req, res) => {
  return await getBookingRequestService({param: req.params, query: req.query}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

module.exports.searchBookingRequestByNameController = async (req, res) => {
  return await searchBookingRequestByNameService({param: req.params, query: req.query}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

module.exports.getRequestByStatusController = async (req, res) => {
  return await getRequestByStatusService( req.query, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

module.exports.searchBookingRequestByRoleController = async (req, res) => {
  return await searchBookingRequestByRoleService({param: req.params, query: req.query}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}
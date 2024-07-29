const { getWithdrawalsService, updateWithdrawalsService, deleteWithdrawalsService, searchWithdrawalByNameService } = require('../../services/adminService/withdrawalService')

const getWithdrawalsController = async (req, res) => {
  return await getWithdrawalsService({param: req.params, query: req.query}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const updateWithdrawalsController = async (req, res) => {
  return await updateWithdrawalsService( req.body, (result) => {
      res.status(result.statusCode).json( result)
  });
};

const deleteWithdrawalsController = async (req, res) => {
  return await deleteWithdrawalsService({param: req.params}, (result)=>{
      res.status(result.statusCode).json( result )
  })
}

const searchWithdrawalByNameController = async (req, res) => {
  return await searchWithdrawalByNameService({param: req.params, query:req.query}, result => {
      return res.status(result.statusCode).json( result );
  })
};

module.exports = { getWithdrawalsController, updateWithdrawalsController, deleteWithdrawalsController, searchWithdrawalByNameController }
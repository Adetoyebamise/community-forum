const { addChildService , getChildService, updateChildService, deleteChildService} = require("../../services/caregiverService/caregiverAddChildService")

const addChildController = async (req, res) => {
    return await addChildService(req.body, result => {
        return res.status(result.statusCode).json( result );
    })
}

const getChildController = async (req, res) => {
    return await getChildService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}

const updateChildController = async (req, res) => {
    return await updateChildService({body : req.body, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}

const deleteChildController = async (req, res) => {
    return await deleteChildService({query : req.query, param: req.params}, result => {
        return res.status(result.statusCode).json( result );
    })
}
module.exports = { addChildController, getChildController, updateChildController, deleteChildController }
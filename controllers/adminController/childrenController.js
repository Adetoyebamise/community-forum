const { getChildrenByParamService, deleteChildrenService, searchChildrenService } = require("../../services/adminService/childrenService")

const getChildrenByParamController = async (req, res) => {
    return await getChildrenByParamService(req.query, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const searchChildrenController = async (req, res) => {
    return await searchChildrenService(req.query, (result) => {
        res.status(result.statusCode).json( result )
    })
}

const deleteChildrenController = async (req, res) => {
    return await deleteChildrenService(req.params, (result) => {
        res.status(result.statusCode).json( result )
    })
}

module.exports = { getChildrenByParamController, searchChildrenController, deleteChildrenController }
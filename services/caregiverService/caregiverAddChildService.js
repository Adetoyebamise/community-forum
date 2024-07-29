const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const {ChildInformation} = require("../../schema/childInformation/childInformation")
const mongoose = require('mongoose');

const addChildService = async (payload, callback) => {
    const childInformation = new ChildInformation(payload)
    await childInformation.save((err, result) => {
        if (err) {
            return callback(messageHandler("Unable to add child", false, BAD_REQUEST, {}))
        } else {
            return callback(messageHandler("Child Successfully added", true, SUCCESS, result))
        }
    })
}

const getChildService = async ({query, param}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, "createdAt", "childInformation")
        if (error) {
            return callback(messageHandler(error, false, BAD_REQUEST, { totalchildInformation: 0, childInformations: [] }))
        }
    try {
        let childInformation = await ChildInformation.find({...params}).limit(limit).skip(skip).sort(sort)
        let totalchildInformation = await ChildInformation.find({ ...params}).countDocuments();
        if (childInformation.length > 0) {
            return callback(messageHandler("Child Information Successfully Fetched", true, SUCCESS, { totalchildInformation, childInformation }))
        } else {
            return callback(messageHandler("No child Information found", false, BAD_REQUEST, {}))
        }
    } catch (error) {
        return callback(messageHandler("Contact the administrator", false, BAD_REQUEST, error.message))
    }
}

const updateChildService = async ({param, body}, callback) => {  
    try {
        let result = await ChildInformation.updateOne({ _id: param.childInformationId }, { $set: { ...body } })
        if (result.modifiedCount == 0) {
             return callback(messageHandler("Child Information not found", false, BAD_REQUEST, {}))
            } else {
                return callback(messageHandler("Child Information successfully updated", true, SUCCESS, result));
            } 
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message, {}));
    }
  }

  const deleteChildService  =  ({ param }, callback) => {
    try {
        ChildInformation.deleteOne({ _id:mongoose.Types.ObjectId(param.childInformationId) }, (err, childInformation) => {
        if (err) {
          return callback(messageHandler("An error Occurred, Please Try Again", false, BAD_REQUEST, {}))
        }
  
        if (childInformation.deletedCount === 0) {
          return callback(messageHandler("No child Information with the details found, Please Try Again", false, BAD_REQUEST, {}))
        }
  
          return callback(messageHandler("Child Information successfully deleted", true, SUCCESS, childInformation))
      })
    } catch (error) {
        return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
    }
  }

module.exports = { addChildService, getChildService, updateChildService, deleteChildService}
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const { Tag } = require("../../schema/tagSchema/tagSchema")
const { messageHandler, queryConstructor } = require("../../utils")
const mongoose = require("mongoose")

const createTagService = async (body, callback) => {
  try {
    const tag = new Tag({...body})
    await tag.save()
    return callback(messageHandler("Tag successfully created", true, SUCCESS, tag))
  } catch (error) {
    return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {})) 
  }
}

const getTagByParamService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, 'createdAt', "Tags" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalTags: 0, tags: [] }))
    }
    try {
      const tags = await Tag.find({ ...params }).limit(limit).skip(skip).sort(sort)
      let total = await Tag.find({ ...params }).countDocuments()
      if (!tags.length > 0) {
        return callback(messageHandler("No tags available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Tags successfully fetched", true, SUCCESS, { totalTags:total, tags }))
    } catch (err) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, err))
    }
}

const updateTagService = async ({param, body}, callback) => {
  delete body.adminId
  try {
      let result = await Tag.updateOne({ _id: param.tagId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Tag not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Tag successfully updated", true, SUCCESS, result));
          } 
    } catch (error) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, error.message, {}));
    }
}

const deleteTagService =  ({ param}, callback) => {
  try {
        Tag.findOne({ _id: mongoose.Types.ObjectId(param.tagId) }, async (err,  tag) => {
        if (err) {
          return callback(messageHandler("Unable to delete tag, Please Try Again", false, BAD_REQUEST, {}))
        } if (tag === null) {
          return callback(messageHandler("No tag with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
           Tag.deleteOne({ _id:mongoose.Types.ObjectId(param.tagId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, {}))
            } 
              return callback(messageHandler("Tag successfully deleted", true, SUCCESS, success))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${error.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { createTagService, getTagByParamService, updateTagService, deleteTagService }

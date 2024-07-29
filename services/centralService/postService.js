const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Post }  = require("../../schema/forumSchema/postSchema")
const mongoose = require('mongoose');
const { Tag } = require("../../schema/tagSchema/tagSchema");

const getPostByParamService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalPost': 'totalPost', 'createdAt': 'createdAt' }, "posts" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalPost: 0, post: [] }))
    }
 
    try {
      const posts = await Post.find({ ...params }).limit(limit).populate({path :'caregiverId', select : "fullName imageUrl roleDescription"}).populate({path: 'doctorId', select : "fullName imageUrl role"}).populate({path:"tags", model: Tag}).skip(skip).sort(sort)
      let total = await Post.find({ ...params }).countDocuments()
      
      if (!posts.length > 0) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("posts successfully fetched", true, SUCCESS, { totalView:total, posts }))
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}

const getSharedPostByParamService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalPost': 'totalPost', 'createdAt': 'createdAt' }, "posts" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalPost: 0, post: [] }))
    }
 
    try {
      const posts = await Post.find({ postId: query.postId }).limit(limit).populate({path :'caregiverId', select : "fullName imageUrl roleDescription"}).populate({path: 'doctorId', select : "fullName imageUrl role"}).populate({path:"tags", model: Tag}).skip(skip).sort(sort)
      
      if (!posts.length > 0) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("posts successfully fetched", true, SUCCESS, { posts }))
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}

const updatePostService = async ({param, body}, callback) => {
  delete body.caregiverId
  delete body.doctorId

  try {
      let result = await Post.updateOne({ _id: param.postId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Post not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Post successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler("Oops, an error occurred", false, BAD_REQUEST, error.message));
  }
}

const changePostStatusService = async ({param, body}, callback) => {
  delete body.caregiverId
  delete body.doctorId

  try {
      let result = await Post.updateOne({ _id: param.postId }, { $set: { ...body } })
      if (result.modifiedCount == 0) {
           return callback(messageHandler("Post not found", false, BAD_REQUEST, {}))
          } else {
              return callback(messageHandler("Post successfully updated", true, SUCCESS, result));
          } 
  } catch (error) {
      return callback(messageHandler("Oops, an error occurred", false, BAD_REQUEST, error.message));
  }
}

const deletePostService =  ({ param}, callback) => {
  try {
        Post.findOne({ _id: mongoose.Types.ObjectId(param.postId) }, async (err,  post) => {
        if (err) {
          return callback(messageHandler("Unable to delete Post, Please Try Again", false, BAD_REQUEST, {}))
        } if (post === null) {
          return callback(messageHandler("No post with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
           Post.deleteOne({ _id:mongoose.Types.ObjectId(param.postId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error Occurred, Please Try Again", false, BAD_REQUEST, {}))
            } 
              return callback(messageHandler("Post Successfully Deleted", true, SUCCESS, success))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

module.exports = { getPostByParamService, updatePostService, changePostStatusService, deletePostService, getSharedPostByParamService }

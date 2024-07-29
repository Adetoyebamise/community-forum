const { messageHandler, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Post }  = require("../../schema/forumSchema/postSchema")
const mongoose = require('mongoose');
const { Doctors } = require("../../schema/doctorsSchema/doctorSchema");
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema");

const getReportedPostsService = async ( query, callback) => {
  const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalPost': 'totalPost', 'createdAt': 'createdAt', }, "posts" )
    if (error) {
      return callback(messageHandler(error, false, BAD_REQUEST, { totalPost: 0, post: [] }))
    }
 
    try {
      const posts = await Post.find({ reportPost : {$gt : {$size: 0 }}}).limit(limit).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName rolesDescription imageUrl", model: Doctors}).skip(skip).sort(sort)
      const reportedPosts = posts.length  
      if (!posts.length > 0) {
        return callback(messageHandler("Healthy Environment: No post Reported ", false, BAD_REQUEST, {}))
      }
      return callback(messageHandler("Reported posts successfully fetched", true, SUCCESS, {reportedPosts: reportedPosts, posts }))
    } catch (err) {
      return callback(messageHandler("Something went wrong", false, BAD_REQUEST, err))
    }
}

const deleteReportedPostService =  ({ param}, callback) => {
  try {
    Post.findOne({ _id: mongoose.Types.ObjectId(param.postId) }, async (err,  post) => {
        if (err) {
          return callback(messageHandler("Unable to delete post, Please Try Again", false, BAD_REQUEST, {}))
        } if (post === null) {
          return callback(messageHandler("No Post with the details found, Please Try Again", false, BAD_REQUEST, {}))
        } else {
          Post.deleteOne({ _id:mongoose.Types.ObjectId(param.postId) }, (err, success) => {
            if (err) {
              return callback(messageHandler("An error occurred, Please try again", false, BAD_REQUEST, success))
            } 
              return callback(messageHandler("Post successfully deleted", true, SUCCESS, {}))
          })
        }
      })        
  } catch (error) {
      return callback(messageHandler(`Error: ${err.message}`, false, BAD_REQUEST, {}))
  }
}

module.exports = { getReportedPostsService , deleteReportedPostService}
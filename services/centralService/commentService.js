const { messageHandler, fileModifier, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Post }  = require("../../schema/forumSchema/postSchema")
const {Caregiver} = require("../../schema/caregiverSchema/caregiverSchema")
const {Doctors} = require ("../../schema/doctorsSchema/doctorSchema")
const  {Userpoint}  = require("../../schema/userPointSchema")
const mongoose = require('mongoose');

const createPostCommentService = async (body, callback) => {
  let cavice = Doctors || Caregiver
  try {
   let camid = await cavice.findOne({fullName: body.fullName})
   if (!camid) {
    return callback(messageHandler("Names does not match", false, BAD_REQUEST, {}))
   }
   let real = await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)}, {$push: {"comments": {"_id": mongoose.Types.ObjectId(), "comment": {...body}, "likes": [], "replies":[], ...body}}}).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
  //  add 1 point to the jojolo point 
  const vibe = await Userpoint.find(mongoose.Types.ObjectId(body.caregiverId))
  const userPointIdentity = vibe[0]._id
  await Userpoint.findOneAndUpdate({ _id:mongoose.Types.ObjectId(userPointIdentity)}, { $inc: { point: 1 } }, {new: true })
   if (!real) {
    return callback(messageHandler("No post with the details found", false, BAD_REQUEST, {}))
   }
   return callback(messageHandler("comment successfully created", true, SUCCESS, {real}))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }

}

const createPostCommentReplyService = async (body, callback) => {
  let cavice = Doctors || Caregiver
  let replyId = mongoose.Types.ObjectId()
  try {
   let camid = await cavice.findOne({fullName: body.fullName})
   if (!camid) {
    return callback(messageHandler("Names does not match", false, BAD_REQUEST, {}))
   }
    let sik = await Post.findOne({_id: body.postId }).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
    if (sik === null) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
    }
   let real = await Post.updateOne({$and:[{"_id": mongoose.Types.ObjectId(body.postId)}, {"comments._id":  mongoose.Types.ObjectId(body.commentId)}]}, {$push: {"comments.$.replies": {"_id": replyId, "likes":[],"reply": {...body}}}}).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
   if (!real) {
    return callback(messageHandler("No post with the details found", false, BAD_REQUEST, {}))
   }
  return callback(messageHandler("Comment successfully created", true, SUCCESS, {real}))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

const createPostCommentLikeService = async (body, callback) => {
  const caregiverOrDoctor = body.caregiverId || body.doctorId
  try {
    let sik = await Post.findOne({_id: body.postId }).populate({path :'caregiverId'}).populate({path: 'doctorId'})
    if (sik === null) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
    }
    let mumu = await sik.comments.find(value => value._id)
    let criss = await mumu.likes.find(value => value._id === caregiverOrDoctor )
    if (criss) {
      return callback(messageHandler("comment already liked", false, BAD_REQUEST, {}))
    }
   let commentLike = await Post.updateOne({$and:[{"_id": mongoose.Types.ObjectId(body.postId)}, {"comments._id":  mongoose.Types.ObjectId(body.commentId)}]}, {$push: {"comments.$.likes": {"_id": caregiverOrDoctor /*,"reply":body.reply*/}}})
   if (!commentLike) {
    return callback(messageHandler("No Likes with the details found", false, BAD_REQUEST, {}))
   }
  return callback(messageHandler("A user Liked your comment ", true, SUCCESS, commentLike))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

const createPostCommentUnlikeService = async (body, callback) => {
  const caregiverOrDoctor = body.caregiverId || body.doctorId
  try {
   let commentLike = await Post.updateOne({$and:[{"_id": mongoose.Types.ObjectId(body.postId)}, {"comments._id":  mongoose.Types.ObjectId(body.commentId)}]}, {$pull: {"comments.$.likes": {"_id": caregiverOrDoctor /*,"reply":body.reply*/}}})
   if (!commentLike) {
    return callback(messageHandler("No Likes with the details found", false, BAD_REQUEST, {}))
   }
  return callback(messageHandler("A user unliked your comment ", true, SUCCESS, {...body}))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

const createReportPostService = async (body, callback) => {
  let userId = body.doctorId || body.caregiverId
  try {
    let sik = await Post.findOne({_id: body.postId }).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
    if (sik === null) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
    }
   if (sik.reportPost.find(value => value.account === body.doctorId)) {
    return callback(messageHandler("Post already reported", false, BAD_REQUEST, {}))
  }
   let real = await Post.updateOne({_id: mongoose.Types.ObjectId(body.postId)}, {$push: {"reportPost": { "_id": mongoose.Types.ObjectId(), "account": userId, "reportpost": body.reportPost}}})
  return callback(messageHandler("Report Post successfully logged, Admin will see to it", true, SUCCESS, sik))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

const createPostCommentReplyLikeService = async (body, callback) => {
  const caregiverOrDoctor = body.caregiverId || body.doctorId
  try {
    let sik = await Post.findOne({_id: body.postId }).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
    if (sik === null) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
    }
   
    //check for duplicate like only in the specific nested array within a document
    await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)}, { $pull: {"comments.$[].replies.$[j].likes": caregiverOrDoctor}}, {
      arrayFilters: [
        {
          "j._id": mongoose.Types.ObjectId(body.replyId)
        }
      ]
     
  })
  //update only the specific nested array within a document
  let commentReplyLike = await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)},  {$push: { "comments.$[].replies.$[j].likes": caregiverOrDoctor}}, {
    arrayFilters: [
      {
        "j._id": mongoose.Types.ObjectId(body.replyId)
      }
    ]
})
   if (!commentReplyLike) {
    return callback(messageHandler("No Likes with the details found", false, BAD_REQUEST, {}))
   }
  return callback(messageHandler("A user Liked your comment, comment can be liked only once ", true, SUCCESS, commentReplyLike))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}

const createPostCommentReplyUnlikeService = async (body, callback) => {
  const caregiverOrDoctor = body.caregiverId || body.doctorId
  try {
    let sik = await Post.findOne({_id: body.postId }).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).populate({path:"doctorId", select:"fullName role imageUrl", model: Doctors})
    if (sik === null) {
        return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
    }
   
    //update only the specific nested array within a document
    let commentReplyUnlike = await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)}, { $pull: {"comments.$[].replies.$[j].likes": caregiverOrDoctor}}, {
      arrayFilters: [
        {
          "j._id": mongoose.Types.ObjectId(body.replyId)
        }
      ]    
  })
   if (!commentReplyUnlike) {
    return callback(messageHandler("No Likes with the details found", false, BAD_REQUEST, {}))
   }
  return callback(messageHandler("A user unliked your comment ", true, SUCCESS, commentReplyUnlike))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }
}




module.exports = { createPostCommentService, createPostCommentReplyService, createReportPostService , createPostCommentLikeService, createPostCommentUnlikeService, createPostCommentReplyLikeService,
  createPostCommentReplyUnlikeService }

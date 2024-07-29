const { Post } = require("../../schema/forumSchema/postSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const {Doctors} = require ("../../schema/doctorsSchema/doctorSchema")
const {SUCCESS, BAD_REQUEST} = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const  { Tag }  = require("../../schema/tagSchema/tagSchema")
const  {Userpoint}  = require("../../schema/userPointSchema")
const mongoose = require('mongoose')

const createCaregiverPostService = async (payload, callback) => {
    const { body, image } = payload
    try {
      const caregiverPost = new Post({...body, imageUrl: image})
      const  awaitedCaregiverPost = await caregiverPost.save()
      await awaitedCaregiverPost.populate({path: "tags", model : Tag})
      await Caregiver.updateOne({_id: body.caregiverId}, {
          $push: {
              "posts": {
                  "_id": caregiverPost._id,
                  "likes": [],
                  "image": image,
                  "comments": [],
                  "shares": []
              }
          }, 
      })
      return callback(messageHandler("Post successfully created", true, SUCCESS,  awaitedCaregiverPost))
  } catch (error) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message)) 
  }
}

const createPostLikedService = async ( body, callback) => {
  const vibe = await Userpoint.find(mongoose.Types.ObjectId(body.caregiverId))
  const userPointIdentity = vibe[0]._id
    try {
      let sik = await Post.findById({_id: body.postId })
      if (sik === null) {
      return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
      }
      if (sik.likes.find(value => value._id === body.caregiverId)){
            await Post.updateOne({_id: mongoose.Types.ObjectId(body.postId)}, {$pull: {"likes": {"_id": body.caregiverId}}})
            // 1 Point removed from the jojolo points
            let unlike = await Caregiver.updateOne({$and: [{"_id": body.caregiverId}, {"posts._id": sik._id}]}, {$pull: {"posts.$[].likes": {"_id": body.caregiverId}}})
            await Userpoint.findOneAndUpdate({ _id:mongoose.Types.ObjectId(userPointIdentity)}, { $inc: { point: -1 } }, {new: true })
            return callback(messageHandler("The user has unliked the post", true, SUCCESS, unlike))
          } else {
            let realLike = await Post.updateOne({_id: mongoose.Types.ObjectId(body.postId)}, {$push: {"likes": {"_id": body.caregiverId}}})
            await Caregiver.updateOne({$and: [{"_id": body.caregiverId}, {"posts._id": sik._id}]}, {$push: {"posts.$[].likes": {"_id": body.caregiverId}}})
            // 1 point added to the jojolo points
            await Userpoint.findOneAndUpdate({ _id:mongoose.Types.ObjectId(userPointIdentity)}, { $inc: { point: 1 } }, {new: true })
            return callback(messageHandler("The user has liked the post", true, SUCCESS, realLike))
      }

      } catch (error) {
          return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))  
      }
}

const createPostCommentReplyService = async (body, callback) => {
  let cavice =  Caregiver
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

const createPostCommentService = async (body, callback) => {
  let cavice =  Caregiver
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

const createSharePostService = async (body, callback) => {
  try {
   let real = await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)}, {$push: {"shares": {"_id": body.caregiverId,}}})
   if (!real) {
    return callback(messageHandler("No post with the details found", false, BAD_REQUEST, {}))
   }
    return callback(messageHandler("comment Data to share is available. Cheers!", true, SUCCESS, real))
   } catch (error) {
    return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
  }

}

module.exports = {createCaregiverPostService, createPostLikedService, createSharePostService, createPostCommentService, createPostCommentReplyService}
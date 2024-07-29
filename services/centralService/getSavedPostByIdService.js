const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const mongoose = require('mongoose');
const  {Post}  = require("../../schema/forumSchema/postSchema")
const { Tag } = require("../../schema/tagSchema/tagSchema");
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const Doctor = require("../../schema/doctorsSchema/doctorSchema")

const getSavedPostByIdService = async ({param, query}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, {"totalpost":"totalpost", "createdAt": "createdAt"}, "posts")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totaltags: 0, tags: [] }))
    }
   try {
       if (!param) {
        return callback(messageHandler("Try again with another identity ", false, BAD_REQUEST, []))
       }
       let posts = await Post.find({is_SavedPosts: true }).populate({path : "caregiverId", select: "fullName imageUrl rolesDescription", model: Caregiver}).limit(limit).skip(skip).sort(sort)
       let totalSavedPosts = posts.length;
       if (posts.length > 0) {
           return callback(messageHandler("Posts Successfully Fetched", true, SUCCESS, { totalSavedPosts: totalSavedPosts, posts }))
       } else {
           return callback(messageHandler("No Post/tag Found", false, BAD_REQUEST, {}))
       }
   } catch (error) {
    return callback(messageHandler("Contact the administrator", false, BAD_REQUEST, {}))

   }
}

const getPostFeedService = async ({ query}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, "createdAt", "Post")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalposts: 0, posts: [] }))
    }
   try {
       let posts = await Post.find({...params}).populate({path : "caregiverId", select : "fullName rolesDescription imageUrl"}).populate({path : "doctorId", select : "fullName role imageUrl"}).populate({path: "tags", model: Tag}).limit(limit).skip(skip).sort(sort)
       let totalposts = await Post.find({ ...params}).countDocuments();
       if (posts.length > 0) {
           return callback(messageHandler("Posts Successfully Fetched", true, SUCCESS, { totalposts, posts }))
       } else {
           return callback(messageHandler("No Post found", false, BAD_REQUEST, {}))
       }
   } catch (error) {
    return callback(messageHandler("Contact the administrator", false, BAD_REQUEST, error.message))

   }
}

const getTopContributorService = async ({param,  query}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, "createdAt", "Post")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalposts: 0, posts: [] }))
    }
   try {
       let posts = await Post.aggregate([
        {
            $group: {
            _id: { doctorId : "$doctorId" },
            comments: { $max : "$comments" }
            }
          },
          {
            $lookup : {
            from: "doctors",     
            localField: "_id.doctorId",   
            foreignField: "_id", 
            as: "doctorDetail" 
            }
          },
          { $unwind: {path: "$doctorDetail", preserveNullAndEmptyArrays: true} },           
       ]).limit(limit).skip(skip).sort(sort).sort({comments:-1}).limit(limit).skip(skip).sort(sort)
       const resultedpost = posts.length
       if (posts.length > 0) {
           return callback(messageHandler("Posts Successfully Fetched", true, SUCCESS, { resultedpost: resultedpost, posts }))
       } else {
           return callback(messageHandler("No Post found", false, BAD_REQUEST, {}))
       }
   } catch (error) {
    return callback(messageHandler("Contact the administrator", false, BAD_REQUEST, error.message))

   }
}
module.exports = { getSavedPostByIdService, getPostFeedService, getTopContributorService}

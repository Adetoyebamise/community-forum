const {SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const {messageHandler, queryConstructor} = require("../../utils/index")
const   {Post}  = require("../../schema/forumSchema/postSchema")
const { Tag } = require("../../schema/tagSchema/tagSchema")
const Caregiver = require("../../schema/caregiverSchema/caregiverSchema")
const Doctor = require("../../schema/doctorsSchema/doctorSchema")
const mongoose = require('mongoose');
const { postTags } = require("../../utils/tags");

const getTagService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, {"totalTags":"TotalTags", "createdAt": "createdAt"}, "tags")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totaltags: 0, tags: [] }))
    }

    const posts = await postTags(params.tagName, sort)
    
    if (posts.length > 0) {
        return callback(messageHandler("Posts Successfully Fetched", true, SUCCESS, { totaltags: posts.length, posts: posts.slice(skip, limit) }))
    } else {
        return callback(messageHandler("No posts found..", false, BAD_REQUEST, {}))
    }
}

const getFilterByPopularService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, {"totalPosts":"TotalPosts", "createdAt": "createdAt"}, "posts")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalposts: 0, posts: [] }))
    }

    let posts = await Post.find({...params}, null, { sort: { likes: -1 }}).populate({path: "tags", model: Tag}).limit(limit).skip(skip).sort(sort)
    let totalposts = await Post.find({ ...params }).countDocuments();
    if (posts.length > 0) {
        return callback(messageHandler("Got the post with highest likes", true, SUCCESS, { totalposts, posts }))
    } else {
        return callback(messageHandler("Oops check back later...", false, BAD_REQUEST, {}))
    }
}

const getUnansweredPostService = async (query, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, {"totalPosts":"TotalPosts", "createdAt": "createdAt"}, "posts")
    if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalposts: 0, posts: [] }))
    }

    let posts = await Post.find({...params},null,{ sort: { comments: 0 }}).populate({path: "tags", model: Tag}).populate({path:"caregiverId", select:"fullName rolesDescription imageUrl", model: Caregiver}).limit(limit).skip(skip).sort(sort)
    // let totalUnansweredPosts = await Post.find({ ...params }, {posts}).countDocuments();
    if (posts.length > 0) {
        return callback(messageHandler("Unanswered post data fetched successfully", true, SUCCESS, {posts }))
    } else {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, {}))
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

module.exports = { getTagService, getFilterByPopularService, getTagByParamService, getUnansweredPostService}

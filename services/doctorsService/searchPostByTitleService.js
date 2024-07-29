const Doctor = require("../../schema/doctorsSchema/doctorSchema")
const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const { messageHandler, queryConstructor } = require("../../utils/index")
const { Post }  = require("../../schema/forumSchema/postSchema")
const mongoose = require('mongoose');

 const searchPostByTitleService = async ({param, query}, callback) => {
    const { error, params, limit, skip, sort } = await queryConstructor(query, { 'totalPost': 'totalPost', 'createdAt': 'createdAt', }, "title" )
      if (error) {
        return callback(messageHandler(error, false, BAD_REQUEST, { totalPost: 0, posts: [] }))
      }
      try {
        if (!query.search) {
          return callback(messageHandler("Search cannot be empty", false, BAD_REQUEST, []))
        }
        const posts = await Post.find({ title: { $regex: query.search, $options: 'i' } }).limit(limit).populate('doctorId').skip(skip).sort(sort)
        let total = await Post.find({ ...params }).countDocuments()
        if (!posts.length > 0) {
          return callback(messageHandler("No posts available", false, BAD_REQUEST, {}))
        }
        return callback(messageHandler("Posts successfully fetched", true, SUCCESS, { totalPost: total, posts }))
      } catch (err) {
        return callback(messageHandler( `${err.message}`, false, BAD_REQUEST, err))
      }
}

module.exports = { searchPostByTitleService }

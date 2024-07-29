const { SUCCESS, BAD_REQUEST } = require("../../constants/statusCode")
const { messageHandler, queryConstructor} = require("../../utils/index")
const { Post }  = require("../../schema/forumSchema/postSchema")
const { Tag } = require("../../schema/tagSchema/tagSchema")
const mongoose = require('mongoose');
const { postTags } = require("../../utils/tags");

const analyticsService = async (callback) => {
    try{
        const total = await Post.find({}).countDocuments();
        const tags = await Tag.find({}, {tagName: 1, _id: 0})

        let analytics = {}
        const promises = tags.map(async tag => {
            await postTags(tag.tagName, {tagName: 1}).then(data => {
                analytics[`${tag.tagName}`] = data.length
            })
        })
        
        await Promise.all(promises)
        return callback(messageHandler("Analytics generated successfully", true, SUCCESS, {analytics: {...analytics, total}} ));
    }
    catch(err) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, `${err.message}`));
    }
}

module.exports = { analyticsService }
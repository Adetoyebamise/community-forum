const   { Post }  = require("../schema/forumSchema/postSchema")

module.exports.postTags = async (tagName, sort) => {
  const posts = await Post.aggregate([
    {
        $lookup: {
            from: "tags",       // employee table name
                localField: "tags",   // name of department table field
                foreignField: "_id", // name of employee table field
                as: "tags"         // alias for employees table
        }
    },
    { $unwind: {path: "$tags", preserveNullAndEmptyArrays: true} },
    {
        $match: {
            $and: [{ 'tags.tagName': tagName }]
        } 
    },
  ]).sort(sort)

  return posts
}
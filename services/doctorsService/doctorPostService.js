const { messageHandler, fileModifier, queryConstructor  } = require("../../utils/index");
const { BAD_REQUEST, SUCCESS } = require("../../constants/statusCode")
const  { Post }  = require("../../schema/forumSchema/postSchema")
const  { Doctors }  = require("../../schema/doctorsSchema/doctorSchema")
const  { Tag }  = require("../../schema/tagSchema/tagSchema")
const mongoose = require('mongoose');
const  {Userpoint}  = require("../../schema/userPointSchema")
const req = require("express/lib/request");

const createDoctorPostService = async( payload, callback) => {
    const { image, body } = await fileModifier(payload)
    try {
      const doctorPost = new Post({...body, imageUrl: image})
      const  awaitedDoctorPost = await doctorPost.save()
      await awaitedDoctorPost.populate({path: "tags", model : Tag})
      await Doctors.updateOne({_id: body.doctorId}, {
            $push: {
                "posts": {
                    "_id": doctorPost._id,
                    "likes": [],
                    "image": image,
                    "comments": [],
                    "shares": []
                }
            }, 
        })
        return callback(messageHandler("Post successfully created", true, SUCCESS, awaitedDoctorPost))
    } catch (error) {
        return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message)) 
    }
}

const createPostLikedService = async ( body,  callback) => {
    try {
        let sik = await Post.findOne({_id: body.postId })
        if (sik === null) {
            return callback(messageHandler("No post available", false, BAD_REQUEST, {}))
        }
        if (sik.likes.find(value => value._id === body.doctorId)){
                await Post.updateOne({_id: mongoose.Types.ObjectId(body.postId)}, {$pull: {
                "likes": {
                    "_id": body.doctorId
                }
                // 1 point added to the jojolo point

            }})
          let unlike = await Doctors.updateOne({
            $and: [{
                "_id": body.doctorId
            }, {
                "posts._id": sik._id
            }]
         }, {
            $pull: {
                "posts.$[].likes": {
                    "_id": body.doctorId
                }
            }
            // 1 point removed from the jojolo point
        })
        return callback(messageHandler("The user has unliked the post", true, SUCCESS, unlike))
    } else {
    let realLike = await Post.updateOne({_id: mongoose.Types.ObjectId(body.postId)}, {$push: {
        "likes": {
            "_id": body.doctorId
            }
        }
    })
        await Doctors.updateOne({
        $and: [{
             "_id": body.doctorId
        }, {
             "posts._id": sik._id
       }]
        }, {
        $push: {
        "posts.$[].likes": {
            "_id": body.doctorId
         }
       }
    })
   return callback(messageHandler("The user has liked the post", true, SUCCESS, realLike))
}  
    } catch (error) {
        return callback(messageHandler("Something went wrong", false, BAD_REQUEST, error.message))
    }
}

const createSharePostService = async (body, callback) => {
    try {
     let real = await Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(body.postId)}, {
       $push: {
         "shares": {
           "_id": body.doctorId,
         }
       }
     })
  
     if (!real) {
      return callback(messageHandler("No post with the details found", false, BAD_REQUEST, {}))
     }
    return callback(messageHandler("Post successfully shared", true, SUCCESS, real))
     } catch (error) {
      return callback(messageHandler("Something went wrong...", false, BAD_REQUEST, error.message))
    }
  }

module.exports = { createDoctorPostService, createPostLikedService, createSharePostService }

 const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caregiver'
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctors'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
      required: true
    },
    imageUrl : {
      type: Array,
      required: true,
    },
    postAnonymously: {
      type: Boolean,
      default: false
    },
    shares: {
      type: Array,
    }, 
    likes: {
      type: Array,
      default: []
    },
    comments: {
      type: Array,
      default: []
    },
    is_SavedPosts: {
      type: Boolean,
      default: false
    },
    reportPost: {
      type: Array,
    },
}, {timestamps: true})

let post = mongoose.model('Post',  postSchema, 'post' );
module.exports = { Post: post  }

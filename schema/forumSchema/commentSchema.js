const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
text: {
      type: String,
      trim: true,
      required: true
   },
postId: {
      type: mongoose.Schema.Types.ObjectId,         // each comment can only relates to one Post, so it's not in array    
      ref: 'Post'
   },
caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caregiver'
    },
doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctors'
    },
    shares: {
      type: Array,
    }, 
    likes: {
      type: Array,
      default: []
    },
}, {timestamps: true})

let comment = mongoose.model('Comment',  commentSchema, 'comment' );
module.exports = { Comment: comment }

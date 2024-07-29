const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
tagName: {
    type : String,
    required: true,
}
}, {timestamps: true})

let tag = mongoose.model('Tag',  tagSchema, 'tags' );
module.exports = { Tag: tag  }

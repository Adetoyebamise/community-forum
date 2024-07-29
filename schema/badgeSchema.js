const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
badgeName: {
    type : String,
    required: true,
}, 
requiredPoint : {
    type: Number,
    required: true
}
}, {timestamps: true})

let badge = mongoose.model('Badge', badgeSchema, 'badges');
module.exports = { Badge: badge }

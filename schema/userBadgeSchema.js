const mongoose = require('mongoose');

const userBadgeSchema = new mongoose.Schema({
userId: {
    type: mongoose.Types.ObjectId,
    refPath: 'externalModelType'
},
externalModelType: {
    type: String
},
badgeId: {
    type: mongoose.Types.ObjectId,
    ref: 'bagde'
},
pointEarned : {
    type: Number,
},
badgeAwarded : {
    type: Boolean,
    default: false
}
}, {timestamps: true})

let user_category = mongoose.model('User_category',  userBadgeSchema, 'user_batches' );
module.exports = { User_category: user_category  }

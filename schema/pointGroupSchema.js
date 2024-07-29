const mongoose = require('mongoose');

const userPointSchema = new mongoose.Schema({
pointId: {
    type: mongoose.Types.ObjectId,
    ref: 'point'
},
badgeId: {
    type: mongoose.Types.ObjectId,
    ref: 'bagde'
},
weighting : {
    type: Number,
    default: 0
}
}, {timestamps: true})

let userPointsGroup = mongoose.model('UserPointsGroup',  userPointSchema, 'userPointsGroup')
module.exports = { UserPointsGroup: userPointsGroup }

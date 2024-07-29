const mongoose = require('mongoose');

const userPointSchema = new mongoose.Schema({
userId: {
    type: mongoose.Types.ObjectId,
    refPath: 'externalModelType'
},
externalModelType: {
    type: String,
},
point : {
    type: Number,
    default: 0
}
}, {timestamps: true})

let userPoint = mongoose.model('Userpoint',  userPointSchema, 'userPoints' );
module.exports = { Userpoint: userPoint }
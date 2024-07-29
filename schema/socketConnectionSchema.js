const mongoose = require('mongoose');

const socketCollectionSchema = new mongoose.Schema({
socketId: {
    type : String,
    required: true,
},
externalModelType: {
    type: String,
    required: true
},
name: {
    type: mongoose.Types.ObjectId,
    refPath: 'externalModelType'
}
}, {timestamps: true})

let socketCollection = mongoose.model('SocketCollection',  socketCollectionSchema, 'socketCollection' );
module.exports = { SocketCollection: socketCollection  }

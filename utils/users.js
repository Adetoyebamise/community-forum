const { SocketCollection } = require('../schema/socketConnectionSchema')
 
const addUser = async ({ socketId, name, type }) => {
    try {
        const existingUser = await SocketCollection.findOne({name})
        if(existingUser) {
            await SocketCollection.deleteMany({name})
        }
        const user = new SocketCollection({ socketId, name, externalModelType: type})
        await user.save()
        return {success: true, data: user};
    } catch (err) {
        return {success: false, data: err}
    }
}
 
const removeUser = async ({ socketId }) => {
    try {
        const user = await SocketCollection.deleteOne({socketId})
        return {success: true, data: 'user disconnected'};
    } catch (err) {
        return {success: false, data: err}
    }
}
 
const getUser = async (name) => {
    return await SocketCollection.findOne({name})
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
 
module.exports = { addUser, removeUser,
        getUser, getUsersInRoom };

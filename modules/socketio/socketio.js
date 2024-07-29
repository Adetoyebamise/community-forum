const { addUser, removeUser, getUser, getUsersInRoom } = require('../../utils/users');
const { sendChatMessageService } = require("../../services/caregiverService/sendChatMessageService");
const { sendNotificationMessageService } = require("../../services/centralService/notificationService")
const mongoose = require("mongoose");

const socketConnection = (socket) => {
  
  socket.on('join', async (obj) => {
    const { success } = await addUser({ socketId: socket.id, name: obj.name, type: obj.type })

    if (!success) {
      socket.emit("join", 'Error. please refresh and try again')
    } else {
      socket.emit('join', 'Connection Successful')
      
    }
  });

  // Private chat message between Doctors and Caregivers
  socket.on("private-message", async (obj) => {
    try {
      const receiver = await getUser(obj.recipient)
      const sender = await getUser(obj.name)
      // const [receiver, sender] = await Promise.all([getUser(obj.recipient), getUser(obj.name)])
      const chatRequestId = obj.chatRequestId

      const caregiverId = receiver.externalModelType === "Caregiver" ? mongoose.Types.ObjectId(receiver.name) : mongoose.Types.ObjectId(sender.name)
      const doctorId = receiver.externalModelType === "Doctors" ? mongoose.Types.ObjectId(receiver.name) : mongoose.Types.ObjectId(sender.name)
      const type = receiver.externalModelType
      await sendChatMessageService({ text: obj.message, caregiverId, doctorId , chatRequestId, type }, (result) => {
        if (result.status === false) {
          throw new Error('Something went wrong saving the chat...')
        }
      })
      socket.to(receiver.socketId).emit("private-message", obj.message);
    } catch (err) {
      throw err
    }
  })

  // Notifications
  socket.on("notification-message", async (obj) => {
    try {
      const receiver = await getUser(obj.recipient)
      const sender = await getUser(obj.name)

      const details = {}

      if (receiver.externalModelType === "caregiverId") {
        details.receiverCaregiverId = mongoose.Types.ObjectId(receiver.name)
      } else {
        details.receiverDoctorId = mongoose.Types.ObjectId(receiver.name)
      }

      if (sender.externalModelType === "caregiverId") {
        details.senderCaregiverId = mongoose.Types.ObjectId(sender.name)
      } else {
        details.senderDoctorId = mongoose.Types.ObjectId(sender.name)
      }

      await sendNotificationMessageService({ text: obj.message, caregiverId: details.receiverCaregiverId, doctorId: details.receiverDoctorId, title: obj.title}, (result) => {
        if (result.status === false) {
          throw new Error('Something went wrong saving notification...')
        }
      })
      
      socket.to(receiver.socketId).emit("notification-message", obj.message);
    } catch (err) {
      throw err
    }
  })

  socket.on('disconnect', async () => {
    const { success } = await removeUser({ socketId: socket.id })
  })
}

module.exports = { socketConnection }
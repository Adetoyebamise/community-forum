const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true
});

const pushChat = (change) => {
  const {_id, operationType, fullDocument} = change
  pusher.trigger( "instantNotification", "insertedReply", {
    pushChatId: _id._data,
    collectionId: fullDocument._id,
    text: fullDocument.text,
    createdAt: fullDocument.createdAt
  });
}

module.exports = pushChat
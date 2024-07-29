const mongoose = require("mongoose")

const connection = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const conn = mongoose.connection.on("connected", () => {
    console.log("Database Connected")
  })

  return { conn }
}

module.exports = connection()
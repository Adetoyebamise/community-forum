require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const compression = require('compression');
const helmet = require("helmet");
const swaggerDocs = require('./utils/swagger')
const swaggerJsDocs = require('swagger-jsdoc')
const { socketConnection } = require("./modules/socketio/socketio")

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection

db.once("connected", () => {
  console.log("Database Connected")
})

//Middlewares
const app = express()
const server = require("http").Server(app)
const socketIO = require('socket.io')(server, { cors : {origin: "*"}})

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

socketIO.on('connection', socketConnection)

const PORT = process.env.PORT || 3200
server.listen(PORT, () =>{ 
  console.log("Listening on port %d", PORT)
  swaggerDocs(app, PORT)
})

app.get("/health", (req, res) => {
  res.status(200).json({message: "Wow everything is working fine!"})
})

//Routes
routes(app)

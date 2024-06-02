import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
})

const userSocketMap = {}

io.on('connection', (socket) => {

  console.log('A user connected', socket.id)
  const userId = socket.handshake.query.userId

  io.emit('getOnlineUsers', Object.keys(userSocketMap))
  console.log('a user connected', userSocketMap)

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id
  }

  socket.on('disconnect', () => {
    console.log('A user Disconnected', socket.id)

    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    console.log('user disconnected', userSocketMap)
  })
})

export {app, io, server}
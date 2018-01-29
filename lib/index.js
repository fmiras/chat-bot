const express = require('express')
const app = express()
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const routes = require('./routes')
const chats = require('./chat')

app.use(express.static(path.join(__dirname, '../public')))

routes.load(app)
chats.load(io)

http.listen(3000, () => {
  console.log('listening on *:3000')
})

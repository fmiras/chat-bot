const service = require('./service')
const bot = require('./bot')

const messages = []
const users = {}

const load = io => {
  io.on('connection', socket => {
    socket.on('new user', username => {
      service.addUser(users, socket.id, username)
    })

    const callback = data => socket.emit('chat message', data)
    service.emitHistory(messages, callback)

    socket.on('chat message', msg => {
      const data = {
        socketId: socket.id,
        username: users[socket.id],
        msg: msg
      }

      messages.push(data)
      service.emitMessage(data, data => io.emit('chat message', data))
    })

    socket.on('bot chat message', msg => {
      service.emitMessage(msg, msg => socket.emit('chat message', msg))

      const botCallback = response => {
        const serviceCallback = response => {
          socket.emit('bot chat message', response)
        }
        service.emitMessage(response, serviceCallback)
      }
      bot.comunicate(msg, botCallback)
    })
  })
}

module.exports = { load }

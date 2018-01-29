const emitMessage = (msg, callback) => callback(msg)

const emitHistory = (messages, callback) => {
  messages.forEach(msg => emitMessage(msg, callback))
}

const addUser = (users, socketId, username) => {
  users[socketId] = username
}

module.exports = { emitMessage, emitHistory, addUser }

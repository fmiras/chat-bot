const service = require('../lib/chat/service')
const sinon = require('sinon')
require('jasmine-sinon')

describe('emitMessage', () => {
  it('should call callback function with received object', done => {
    const data = {}
    const spy = sinon.spy()
    service.emitMessage(data, spy)
    expect(spy).toHaveBeenCalledWith(data)
    done()
  })
})

describe('emitHistory', () => {
  it('should emit chat history to a new socket connection', done => {
    const messages = []
    const data1 = {
      socketId: 'socketid1',
      msg: 'mensaje1'
    }
    const data2 = {
      socketId: 'socketid2',
      msg: 'mensaje2'
    }
    messages.push(data1, data2)
    const spy = sinon.spy()
    service.emitHistory(messages, spy)
    expect(spy).toHaveBeenCalledWith(data1)
    expect(spy).toHaveBeenCalledWith(data2)
    done()
  })
})

describe('addUser', () => {
  it('should add a username to a socket', () => {
    const users = {}
    const socketId = 'newSocketId'
    const username = 'John Smith'
    service.addUser(users, socketId, username)
    expect(users[socketId]).toBe(username)
  })
})

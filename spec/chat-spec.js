var service = require('../lib/chat/service');
var sinon = require('sinon');
require('jasmine-sinon');

describe('emitMessage', function () {
  it('should call callback function with received object', function (done) {
    const data = {};
    const io = {};
    const spy = sinon.spy();
    service.emitMessage(data, spy);
    expect(spy).toHaveBeenCalledWith(data);
    done();
  });
});

describe('emitHistory', function () {
  it('should emit chat history to a new socket connection', function (done) {
    const socketId = 'newSocketId';
    const messages = [];
    const data1 = {
      socketId: 'socketid1',
      msg: 'mensaje1',
    };
    const data2 = {
      socketId: 'socketid2',
      msg: 'mensaje2',
    };
    messages.push(data1, data2);
    const spy = sinon.spy();
    service.emitHistory(messages, spy);
    expect(spy).toHaveBeenCalledWith(data1);
    expect(spy).toHaveBeenCalledWith(data2);
    done();
  });
});

describe('addUser', function () {
  it('should add a username to a socket', function () {
    const users = {};
    const socketId = 'newSocketId';
    const username = 'John Smith';
    service.addUser(users, socketId, username);
    expect(users[socketId]).toBe(username);
  });
});

'use strict';
var service = require('../lib/chat/service');
var sinon = require('sinon');
require('jasmine-sinon');

describe('emitMessage', function () {
    it('should call callback function with received object', function (done) {
        var data = {};
        var io = {};
        io.spy = sinon.spy();
        service.emitMessage(data, io, io.spy);
        expect(io.spy).toHaveBeenCalledWith('chat message', data);
        done();
    });
});

describe('emitHistory', function () {
    it('should emit chat history to a new socket connection', function (done) {
        var socketId = "newSocketId"
        var messages = [];
        var data1 = {
            socketId : "socketid1",
            msg : "mensaje1"
        };
        var data2 = {
            socketId : "socketid2",
            msg : "mensaje2"
        };
        messages.push(data1,data2);
        var socket = {};
        socket.spy = sinon.spy();
        service.emitHistory(messages, socket, socket.spy);
        expect(socket.spy).toHaveBeenCalledWith('chat message', data1);
        expect(socket.spy).toHaveBeenCalledWith('chat message', data2);
        done();
    });
});

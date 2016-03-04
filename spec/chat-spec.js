'use strict';
var service = require('../lib/chat/service');
var sinon = require('sinon');
require('jasmine-sinon');

describe('emitMessage', function () {
  it('should call callback function with received msg', function (done) {
  	var msg = "Hi there!";
  	var spy = sinon.spy();
  	service.emitMessage(msg, spy);
  	expect(spy).toHaveBeenCalledWith('chat message', msg);
    done();
  });	
});
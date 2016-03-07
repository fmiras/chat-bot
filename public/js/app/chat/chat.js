app.chat = (function () {

  var username = 'Anonymous';

  function init() {
    $('#user-modal').modal({ backdrop: 'static', keyboard: false });
    $('#user-modal').modal('show');
    $('#user-submit').on('click', function () {
      if ($('#user-text').val().trim() != '') {
        username = $('#user-text').val();
        $('#user-modal').modal('hide');
        initChat();
      }
    });
  }

  function initChat() {
    var socket = io();
    socket.emit('new user', username);
    $('#chat').submit(function () {
      if ($('#m').val().trim() != '') {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
      }

      return false;
    }
);
    socket.on('chat message', function (data) {
      $('#messages').append($('<li>').text('[' + data.socketId + '] ' + data.username + ': ' + data.msg));
    });
  };

  return {
    init: init,
  };

})();

$(document).on('ready', function () {
  app.chat.init();
});

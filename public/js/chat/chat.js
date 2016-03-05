app.chat = (function () {

    function init() {
        var socket = io();
        $('form').submit(function () {
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('chat message', function (msg) {
            $('#messages').append($('<li>').text(msg));
        });
    }

    return {
        init: init
    };

})();

$(document).on("ready", function () {
    app.chat.init();
});
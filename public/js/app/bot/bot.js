app.chat = (function () {

    var username = "Anonymous";

    function init() {
        var socket = io();
        $('#chat').submit(function () {
                if ($('#m').val().trim() != "") {
                    socket.emit('bot chat message', $('#m').val());
                    $('#m').val('');
                }
                return false;
            }
        );
        socket.on('chat message', function (msg) {
            $('#messages').append($('<li>').text("You: " + msg));
        });
        socket.on('bot chat message', function (msg) {
            $('#messages').append($('<li>').text("Bot: " + msg));
        });
    };

    return {
        init: init
    };

})();

$(document).on("ready", function () {
    app.chat.init();
});
var Labs = Labs || {};

Labs.webSocket = {};

Labs.webSocket.socket = null;
Labs.webSocket.connected = false;

$(function () {
    $('#connect-form').submit(Labs.webSocket.connect);
});

Labs.webSocket.connect = function (event) {
    event.preventDefault();

    Labs.webSocket.connected = false;

    $('#status').html("Connecting...");
    $('#status').show();

    Labs.webSocket.open();

    return false;
}

Labs.webSocket.open = function () {
    // start the web socket.

    try {
        Labs.webSocket.socket = new MozWebSocket("ws://labs.staging.moov2.com:81/");
    } catch (exception) {
        Labs.webSocket.socket = new WebSocket("ws://labs.staging.moov2.com:81/");
    }

    Labs.webSocket.socket.onopen = function () {
        $('#status').html("Connected.");

        $('#connect-form').hide();
        $('#send-message-form').show();

        $('#send-message-form').submit(Labs.webSocket.send);

        $('ul').show();

        Labs.webSocket.register();

        Labs.webSocket.connected = true;
    }

    Labs.webSocket.socket.onclose = function () {
        if (Labs.webSocket.connected)
            $('#status').html("Disconnected.");
        else
            $('#status').html("Failed to connect.");

        $('#connect-form').show();
        $('#send-message-form').hide();
    }

    Labs.webSocket.socket.onmessage = function (response) {
        var data = JSON.parse(response.data);

        if (data.Type === 'convo') {
            $('ul').prepend('<li class="' + data.Type + '">' + data.From + ": " + data.Detail + '</li>');
        } else {
            $('ul').prepend('<li class="' + data.Type + '">' + data.From + ' ' + data.Detail + '</li>');
        }
    }
}

Labs.webSocket.register = function () {
    var message = {
        "Command" : "Register",
        "Alias" : $('#username-input').val()
    };

    Labs.webSocket.socket.send(JSON.stringify(message));
}

Labs.webSocket.send = function (event) {
    event.preventDefault();

    try {
        var message = {
            "Command": "Chat",
            "Message": $('#message-input').val()
        };

        Labs.webSocket.socket.send(JSON.stringify(message));
        $('#message-input').val("");
    } catch (exception) { }  

    return false;
}
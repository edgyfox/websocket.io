// front-end socket
var socket = io.connect('127.0.0.1:2210');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var sendBtn = document.getElementById('send');
var output = document.getElementById('chat-messages');
var sendError = document.getElementById('send-error');
var chatHandle = document.getElementById('chat-handle');
var typingMsg = document.getElementById('typing-message');

// emit event on button click
sendBtn.addEventListener('click', function(event) {

    if(message.value === "" || handle.value === "")
        sendError.innerHTML = "Handle and Message cannot be empty.";
    else {
        socket.emit('chat', {
            handle: handle.value,
            message: message.value
        });
        sendError.innerHTML = "";
        message.value = "";
        chatHandle.innerHTML = "<em>Currently chatting as " + handle.value + "</em>";
    }
});

// listen for chat events
socket.on('chat', function(data) {
    output.innerHTML += "<p><b>" + data.handle + "</b>: " + data.message + "</p>";
    typingMsg.innerHTML = "";
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
})

socket.on('typing', function(data) {
    typingMsg.innerHTML = "<em>" + data + " is typing...</em>";
})
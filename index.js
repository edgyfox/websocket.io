var express = require('express');
var socket = require('socket.io');

// app setup
var app = express();
var server = app.listen(2210, function() {
    console.log("Listening for requests on port 2210...");
});

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connect', function(socket) {
    console.log("Client connected.");

    socket.on('chat', function(data) {
        console.log(data, "received.");
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});
const http = require('http');
const { join } = require('path');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, '..', 'static')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

let numUsers = 0;

io.on('connection', (socket) => {
  // Broadcast when client joins the chat
  numUsers++;
  io.emit('user connected', numUsers);

  // Broadcast when client leaves the chat
  socket.on('disconnect', () => {
    numUsers--;
    socket.broadcast.emit('user disconnected', numUsers);
  });

  // Broadcast messages to connected sockets
  socket.on('chat message', (msg) => {
    // io.emit('chat message', msg); // <-- for emitting back to all sockets, including msg sender
    socket.broadcast.emit('chat message', msg); // <-- for emitting back to all sockets, except msg sender
  });
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});

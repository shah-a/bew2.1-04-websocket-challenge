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

io.on('connection', (socket) => {
  console.log('A user connected!');
  socket.on('chat message', (msg) => {
    console.log('message:', msg);
  });
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});

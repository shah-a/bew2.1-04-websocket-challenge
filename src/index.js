const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { join } = require('path');

app.use(express.static(join(__dirname, '..', 'static')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});

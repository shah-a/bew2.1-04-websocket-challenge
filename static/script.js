const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // Emit client's message for the server to send to other clients
    socket.emit('chat message', input.value);

    // Append client's message to the chat
    const item = document.createElement('li');
    item.textContent = input.value;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    // Reset client's input field
    input.value = '';
  }
});

// Receive broadcast when new client joins the chat
socket.on('user connected', (numUsers) => {
  const item = document.createElement('li');
  item.textContent = `Oh goodie :D Someone's here! Number of users: ${numUsers}`;
  item.style.fontWeight = 'bold';
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// Receive broadcast when a client leaves the chat
socket.on('user disconnected', numUsers => {
  const item = document.createElement('li');
  item.textContent = `Oh no D: Someone left! Number of users: ${numUsers}`;
  item.style.fontWeight = 'bold';
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// Receive broadcast when other clients send messages
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

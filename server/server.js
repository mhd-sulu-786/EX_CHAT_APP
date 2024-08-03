const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const Message = require('./Message');
const User = require('./userr');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

const url = 'mongodb://localhost:27017/chat';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', ({ user }) => {
    console.log(`${user} joined the chat`);
    socket.broadcast.emit('userJoined', { user });
  });

  socket.on('sendMessage', ({ user, message }) => {
    const newMessage = new Message({ user, content: message });
    newMessage.save().then(() => {
      io.emit('receiveMessage', newMessage);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
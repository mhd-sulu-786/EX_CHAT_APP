// src/Components/Chat.jsx
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import UserContext from './usecontex';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', { user });

    socket.on('userJoined', ({ user }) => {
      console.log(`${user} joined the chat`);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(message);
    });

    return () => {
    };
  }, [user]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { user, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
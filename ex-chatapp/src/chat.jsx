import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import UserContext from './usecontex';
import './chat.css';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatLogRef = useRef(null);

  useEffect(() => {
    socket.emit('join', { user });

    socket.on('userJoined', ({ user }) => {
      console.log(`${user} joined the chat`);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('userJoined');
      socket.off('receiveMessage');
    };
  }, [user]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { user, message });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Chat Application</h1>
      <div ref={chatLogRef} className="chat-log">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === user ? 'sent-message' : 'received-message'}>
            {msg.user !== user ? <strong> {msg.user}: </strong>:<strong> You: </strong>}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;

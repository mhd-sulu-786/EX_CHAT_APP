// src/Components/Login.jsx
import React, { useState, useContext } from 'react';
import UserContext from './usecontex';

const Login = ({ onLogin }) => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(name);
    onLogin(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
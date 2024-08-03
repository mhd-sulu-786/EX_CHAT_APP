import React, { useState, useContext } from 'react';
import UserContext from './usecontex';
import './Login.css';

const Login = ({ onLogin }) => {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(name);
    onLogin(name);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Enter your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

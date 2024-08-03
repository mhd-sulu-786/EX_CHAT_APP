// src/App.jsx
import React, { useState } from 'react';
import Chat from './chat';
import Login from './login';
import { UserProvider } from './usecontex';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
  };

  return (
    <UserProvider>
      <div>
        {isLoggedIn ? <Chat /> : <Login onLogin={handleLogin} />}
      </div>
    </UserProvider>
  );
};

export default App;
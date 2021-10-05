import React, { useEffect } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const socket = io();

function App() {
  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      // update messages
      console.log(eventName, args);
    });

  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

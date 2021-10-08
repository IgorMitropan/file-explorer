import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { DirTreeList } from './features/dir-tree-list';

import './App.scss';

const socket = io();
const CN = 'app';

function App() {
  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      // update messages
      console.log(eventName, args);
    });

  });

  return (
    <div className={CN}>
      <DirTreeList/>
    </div>
  );
}

export default App;

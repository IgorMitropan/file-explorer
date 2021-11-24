import React from 'react';
import { DirTreeList } from './features/dir-tree-list';

import './App.scss';

const CN = 'app';

function App() {
  return (
    <div className={CN}>
      <DirTreeList/>
    </div>
  );
}

export default App;

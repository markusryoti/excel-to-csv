import React from 'react';
import './App.css';

import FileDrop from './components/FileDrop'
import LabelSelector from './components/LabelSelector'


function App() {
  return (
    <div className="App">
      <div className="container">
        <FileDrop />
        <LabelSelector />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import InputState from './context/file/FileState';

import FileDrop from './components/FileDrop';
import SheetSelector from './components/SheetSelector';
import LabelSelector from './components/LabelSelector';
import FileSave from './components/FileSave';

function App() {
  return (
    <InputState>
      <div className="App">
        <div className="container">
          <FileDrop />
          <SheetSelector />
          <LabelSelector />
          <FileSave />
        </div>
      </div>
    </InputState>
  );
}

export default App;

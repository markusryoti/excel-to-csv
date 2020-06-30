import React from 'react';
import './App.css';
import InputState from './context/input/InputState';
import OutputState from './context/output/OutputState';

import FileDrop from './components/FileDrop';
import SheetSelector from './components/SheetSelector';
import LabelSelector from './components/LabelSelector';

function App() {
  return (
    <InputState>
      <OutputState>
        <div className="App">
          <div className="container">
            <FileDrop />
            <SheetSelector />
            <LabelSelector />
          </div>
        </div>
      </OutputState>
    </InputState>
  );
}

export default App;

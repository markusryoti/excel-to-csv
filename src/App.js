import React from "react";
import "./App.css";
import InputState from "./context/file/FileState";

import FileDrop from "./components/FileDrop";
import SheetSelector from "./components/SheetSelector";
import LabelSelector from "./components/LabelSelector";
import FileSave from "./components/FileSave";

function App() {
  return (
    <InputState>
      <div className="container">
        <h1 id="main-heading">Excel to csv converter</h1>
        <FileDrop />
        <SheetSelector />
        <LabelSelector />
        <FileSave />
      </div>
    </InputState>
  );
}

export default App;

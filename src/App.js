import React from "react";
import "./App.css";
import FileState from "./context/file/FileState";

import FileDrop from "./components/FileDrop";
import SheetSelector from "./components/SheetSelector";
import LabelSelector from "./components/LabelSelector";
import FileSave from "./components/FileSave";

function App() {
  return (
    <FileState>
      <div className="container">
        <h1 id="main-heading">Excel to csv converter</h1>
        <FileDrop />
        <SheetSelector />
        <LabelSelector />
        <FileSave />
      </div>
    </FileState>
  );
}

export default App;

import React, { useState, useContext } from "react";
import InputContext from "../context/input/inputContext";

const FileDrop = () => {
  const inputContext = useContext(InputContext);
  const { readExcel, loading, inputFileName } = inputContext;

  const [highlighted, setHighlighted] = useState(false);
  const [iconVisibility, setIconVisibility] = useState("hidden");

  const onEnter = () => {
    setHighlighted(true);
  };

  const onLeave = () => {
    setHighlighted(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setHighlighted(false);
    setIconVisibility("visible");

    const file = Array.from(e.dataTransfer.files)[0];

    if (!file.name.endsWith(".xlsx")) {
      window.alert(`File: ${file.name} is not an Excel file`);
      return;
    }

    readExcel(file);
  };

  if (loading) {
    return <h3>Loading</h3>;
  }

  return (
    <div className="file-drop-container">
      <h3>Drop File Here</h3>
      <div
        className={`drag-box ${highlighted ? "dragged-box" : "un-dragged-box"}`}
        onDragEnter={onEnter}
        onDragLeave={onLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <i
          style={{ visibility: iconVisibility }}
          className="far fa-file-excel fa-5x"
        ></i>
        <p>{inputFileName ? inputFileName : ""}</p>
      </div>
    </div>
  );
};

export default FileDrop;

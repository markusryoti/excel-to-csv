import React, { useContext, Fragment, useRef } from "react";
import InputContext from "../context/input/inputContext";

const FileSave = () => {
  const inputContext = useContext(InputContext);
  const { inputFileName, savedLabels, createFile } = inputContext;

  const separator = useRef("");
  const outputFileName = useRef("");

  if (savedLabels === null || savedLabels.length === 0) {
    return <Fragment />;
  }

  const onDownloadClick = () => {
    const fileName = outputFileName.current.value;
    const sep = separator.current.value;
    createFile(
      fileName ? fileName : inputFileName.replace(".xlsx", ".csv"),
      sep
    );
  };

  return (
    <div className="file-save-container">
      <h3>Save File :)</h3>
      <select id="separator-selector" ref={separator}>
        <option>Choose separator</option>
        <option>,</option>
        <option>;</option>
      </select>
      <input
        id="output-filename"
        type="text"
        placeholder={inputFileName.replace(".xlsx", ".csv")}
        ref={outputFileName}
      />
      <button id="download-button" onClick={onDownloadClick}>
        Download File
      </button>
    </div>
  );
};

export default FileSave;

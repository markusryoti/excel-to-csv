import React, { useContext, Fragment } from "react";
import InputContext from "../context/input/inputContext";

const SheetSelector = () => {
  const inputContext = useContext(InputContext);
  const { inputFile, setSheetName } = inputContext;

  if (inputFile === null) {
    return <Fragment />;
  }

  const onSheetSelection = (e) => {
    setSheetName(e.target.value);
  };

  return (
    <div className="sheet-selector-container">
      <h3>Select The Sheet You Want To Read The Data From</h3>
      <select className="sheet-selector" onChange={onSheetSelection}>
        <option></option>
        {inputFile.SheetNames.map((sheet, index) => {
          return <option key={index}>{sheet}</option>;
        })}
      </select>
    </div>
  );
};

export default SheetSelector;

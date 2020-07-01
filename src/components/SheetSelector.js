import React, { useContext, Fragment } from 'react';
import FileContext from '../context/file/fileContext';

const SheetSelector = () => {
  const fileContext = useContext(FileContext);
  const { inputFile, setSheetName } = fileContext;

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

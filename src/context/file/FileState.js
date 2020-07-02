import React, { useReducer } from "react";
import FileContext from "./fileContext";
import fileReducer from "./fileReducer";
import {
  SET_INPUT_FILENAME,
  SET_INPUT_FILE,
  SET_LOADING,
  SET_SHEET_NAME,
  SET_TABLE_DATA,
  SET_SELECTED_LABELS,
} from "../types";

import XLSX from "xlsx";

const FileState = (props) => {
  const initialState = {
    inputFileName: null,
    inputFile: null,
    sheetName: null,
    loading: false,
    tableData: null,
    savedLabels: null,
  };

  const [state, dispatch] = useReducer(fileReducer, initialState);

  const readExcel = (file) => {
    _setLoading(true);

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      _setInputFile(workbook);
    };
    reader.readAsArrayBuffer(file);

    // Update input filename to state
    _setInputFileName(file.name);
    _setLoading(false);
  };

  const _setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool });
  };

  const _setInputFileName = (name) => {
    dispatch({ type: SET_INPUT_FILENAME, payload: name });
  };

  const _setInputFile = (fileObj) => {
    dispatch({ type: SET_INPUT_FILE, payload: fileObj });
  };

  const _setTableData = (name) => {
    let dataTable = [];

    const excelRows = XLSX.utils.sheet_to_json(state.inputFile.Sheets[name], {
      defval: "N/A",
    });

    // TODO
    // Seems that windows version reads the file differently
    // Test later if it was just because the used file was different
    // Contents will be saved to same format if they differ
    if (window.navigator.platform === "Win32") {
      const labels = Object.keys(excelRows[0]);
      dataTable.push(labels);
      excelRows.forEach((row, index) => {
        if (index !== 0) {
          const rowValues = Object.values(row);
          dataTable.push(rowValues);
        }
      });
    } else if (window.navigator.platform === "Linux x86_64") {
      excelRows.forEach((row) => {
        const rowValues = Object.values(row);
        dataTable.push(rowValues);
      });
    }
    // console.table(dataTable);
    dispatch({ type: SET_TABLE_DATA, payload: dataTable });
  };

  const setSheetName = (name) => {
    dispatch({ type: SET_SHEET_NAME, payload: name });
    _setTableData(name);
  };

  const getAllLabels = () => {
    if (state.tableData !== null) {
      return state.tableData[0];
    } else {
      return [];
    }
  };

  const getLabels = (searchParam) => {
    const srcLabels = state.tableData[0];
    const filtered = srcLabels.filter((label) => {
      if (label.toLowerCase().includes(searchParam.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filtered;
  };

  const saveSelectedLabels = (labelArray) => {
    dispatch({ type: SET_SELECTED_LABELS, payload: labelArray });
  };

  // Not a really sophisticated solution
  const _getFilteredData = () => {
    let filteredData = [];
    for (let i = 0; i < state.tableData.length; i++) {
      let row = [];
      for (let j = 0; j < state.tableData[i].length; j++) {
        const foundIndex = state.savedLabels.indexOf(state.tableData[0][j]);
        if (foundIndex === -1) {
          continue;
        }
        row.push(state.tableData[i][j]);
      }
      filteredData.push(row);
    }
    return filteredData;
  };

  const createFile = (filename, separator) => {
    if (!filename.includes(".csv")) {
      filename += ".csv";
    }

    const filteredData = _getFilteredData();

    let fileContent = "";
    filteredData.forEach((rowArray) => {
      const row = rowArray.join(separator);
      fileContent += row + "\n";
    });

    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <FileContext.Provider
      value={{
        inputFileName: state.inputFileName,
        inputFile: state.inputFile,
        sheetName: state.sheetName,
        tableData: state.tableData,
        savedLabels: state.savedLabels,
        readExcel,
        setSheetName,
        getAllLabels,
        getLabels,
        saveSelectedLabels,
        createFile,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
};

export default FileState;

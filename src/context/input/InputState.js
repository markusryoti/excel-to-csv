import React, { useReducer } from "react";
import InputContext from "./inputContext";
import inputReducer from "./inputReducer";
import {
  SET_INPUT_FILENAME,
  SET_INPUT_FILE,
  SET_LOADING,
  SET_SHEET_NAME,
  SET_ROW_DATA,
  SET_SELECTED_LABELS,
} from "../types";

import XLSX from "xlsx";

const InputState = (props) => {
  const initialState = {
    inputFileName: null,
    inputFile: null,
    sheetName: null,
    loading: false,
    rowData: null,
    savedLabels: null,
  };

  const [state, dispatch] = useReducer(inputReducer, initialState);

  const readExcel = (file) => {
    _setLoading(true);

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      // Add file to state
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

  const _setRowData = (name) => {
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
    } else {
      excelRows.forEach((row) => {
        const rowValues = Object.values(row);
        dataTable.push(rowValues);
      });
    }
    // console.table(dataTable);
    dispatch({ type: SET_ROW_DATA, payload: dataTable });
  };

  const setSheetName = (name) => {
    dispatch({ type: SET_SHEET_NAME, payload: name });
    _setRowData(name);
  };

  const getAllLabels = () => {
    if (state.rowData !== null) {
      return state.rowData[0];
    } else {
      return [];
    }
  };

  const getLabels = (searchParam) => {
    const srcLabels = state.rowData[0];
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

  return (
    <InputContext.Provider
      value={{
        inputFileName: state.inputFileName,
        inputFile: state.inputFile,
        sheetName: state.sheetName,
        rowData: state.rowData,
        savedLabels: state.savedLabels,
        readExcel,
        setSheetName,
        getAllLabels,
        getLabels,
        saveSelectedLabels,
      }}
    >
      {props.children}
    </InputContext.Provider>
  );
};

export default InputState;

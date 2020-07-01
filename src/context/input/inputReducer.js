import {
  SET_INPUT_FILENAME,
  SET_INPUT_FILE,
  SET_LOADING,
  SET_SHEET_NAME,
  SET_ROW_DATA,
  SET_SELECTED_LABELS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_INPUT_FILENAME:
      return {
        ...state,
        inputFileName: action.payload,
      };
    case SET_INPUT_FILE:
      return {
        ...state,
        inputFile: action.payload,
      };
    case SET_SHEET_NAME:
      return {
        ...state,
        sheetName: action.payload,
      };
    case SET_ROW_DATA:
      return {
        ...state,
        rowData: action.payload,
        // Maybe to free memory?
        // inputFile: null,
      };
    case SET_SELECTED_LABELS:
      return {
        ...state,
        savedLabels: action.payload,
      };
    default:
      return state;
  }
};

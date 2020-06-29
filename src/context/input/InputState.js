import React, { useReducer } from 'react';
import InputContext from './inputContext';
import inputReducer from './inputReducer';
import {
    SET_INPUT_FILENAME,
    SET_INPUT_FILE,
    SET_LOADING
} from '../types';

import XLSX from 'xlsx';


const InputState = props => {
    const initialState = {
        inputFileName: null,
        inputFile: null,
        loading: false
    };

    const [state, dispatch] = useReducer(inputReducer, initialState);

    const readExcel = file => {
        _setLoading(true);

        let workbook;
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = new Uint8Array(e.target.result);
          workbook = XLSX.read(data, {type: 'array'});
        //   console.log(workbook.SheetNames);
        };
        reader.readAsArrayBuffer(file);

        // Update input filename to state
        _setInputFileName(file.name);
        // Add file to state
        _setInputFile(workbook);
        _setLoading(false);
    }

    const _setLoading = bool => {
        dispatch({ type: SET_LOADING, payload: bool });
    }

    const _setInputFileName = name => {
        dispatch({ type: SET_INPUT_FILENAME, payload: name });
    }

    const _setInputFile = fileObj => {
        dispatch({ type: SET_INPUT_FILE, payload: fileObj });
    }

    return (
        <InputContext.Provider
            value={{
                inputFileName: state.inputFileName,
                inputFile: state.inputFile,
                readExcel
            }}
        >
            {props.children}
        </InputContext.Provider>
    )
}

export default InputState;

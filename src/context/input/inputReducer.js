import {
    SET_INPUT_FILENAME,
    SET_INPUT_FILE,
    SET_LOADING,
    READ_EXCEL,
} from '../types';


export default (state, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_INPUT_FILENAME:
            console.log('filename')
            console.log(action.payload)
            return {
                ...state,
                inputFileName: action.payload
            }
        case SET_INPUT_FILE:
            console.log('file')
            console.log(action.payload)
            return {
                ...state,
                inputFile: action.payload
            }
        default:
            return state;
    }
}

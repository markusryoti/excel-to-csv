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
            return {
                ...state,
                inputFileName: action.payload
            }
        case SET_INPUT_FILE:
            return {
                ...state,
                inputFile: action.payload
            }
        default:
            return state;
    }
}

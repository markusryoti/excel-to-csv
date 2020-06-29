import React, { useReducer } from 'react';
import OutputContext from './outputContext';
import outputReducer from './outputReducer';
import {  } from '../types';


const OutputState = props => {
    const initialState = {

    }

    const [state, dispatch] = useReducer(outputReducer, initialState);

    return (
        <OutputContext.Provider
            value={{

            }}
        >
            {props.children}
        </OutputContext.Provider>
    )
}

export default OutputState;

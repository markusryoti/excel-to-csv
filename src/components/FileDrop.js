import React, { useState, useContext } from 'react'
import InputContext from '../context/input/inputContext';

const FileDrop = () => {
    const inputContext = useContext(InputContext);
    const { readExcel, inputFile, inputFileName, loading } = inputContext;

    const [highlighted, setHighlighted] = useState(false);

    const onEnter = () => {
        setHighlighted(true);
    }

    const onLeave = () => {
        setHighlighted(false);
    }

    const onDragOver = e => {
        e.preventDefault();
    }
 
    const onDrop = e => {
        e.preventDefault();
        setHighlighted(false);

        // Just one for now
        const file = Array.from(e.dataTransfer.files)[0];

        if (!file.name.endsWith('.xlsx')) {
            window.alert(`File: ${file.name} is not an Excel file`);
            return;
        }

        readExcel(file);
    }

    if (loading) {
        return <h3>Loading</h3>
    }

    return (
        <div>
            <h3>Drop File Here</h3>
            <div className={`drag-box ${highlighted ? 'dragged-box' : 'un-dragged-box'}`}
                style={style}
                onDragEnter={onEnter}
                onDragLeave={onLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
            </div>
        </div>
    )
}

const style = {
    margin: 'auto',
    width: '300px',
    height: '200px',
    border: '1px solid black'
}

export default FileDrop

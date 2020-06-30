import React, { useContext, Fragment, useState } from 'react';
import InputContext from '../context/input/inputContext';

const LabelSelector = () => {
  const inputContext = useContext(InputContext);
  const { sheetName, getLabels } = inputContext;

  const [searchResults, setSearchResults] = useState('');
  const [selectedLabels, setSelectedLabels] = useState('');

  if (sheetName === null) {
    return <Fragment />;
  }

  const onInputChange = (e) => {
    const searchString = e.target.value;
    // Find labels from excel
    const matches = getLabels(searchString);
    // Print search results to page
    const lis = matches.map((match, index) => {
      return <li key={index}>{match}</li>;
    });
    setSearchResults(lis);
  };

  return (
    <div className="label-selector-container">
      <h3>Select The Wanted Labels</h3>
      <label htmlFor="label-search">Search For Label</label>
      <input
        type="text"
        id="label-search"
        placeholder="Label Name"
        style={{
          display: 'block',
          margin: 'auto',
          width: '400px',
          height: '30px',
        }}
        onChange={onInputChange}
      />
      <div className="labels-box">
        <div className="filtered-labels-section">
          <h4>{searchResults ? searchResults.length : ''} Labels Found </h4>
          <ul id="search-results">{searchResults}</ul>
        </div>
        <div className="labels-to-add-section">
          <h4>
            {selectedLabels ? selectedLabels.length : ''} Labels To Be Added
          </h4>
          <ul id="selected-labels">{selectedLabels}</ul>
        </div>
      </div>
    </div>
  );
};

export default LabelSelector;

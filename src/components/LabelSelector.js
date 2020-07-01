import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef,
} from "react";
import InputContext from "../context/input/inputContext";

const LabelSelector = () => {
  const inputContext = useContext(InputContext);
  const {
    sheetName,
    getAllLabels,
    getLabels,
    saveSelectedLabels,
  } = inputContext;

  const searchValue = useRef("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);

  useEffect(() => {
    if (sheetName && searchResults.length === 0) {
      setSearchResults(getAllLabels());
    }
    saveSelectedLabels(selectedLabels);
    // eslint-disable-next-line
  }, [selectedLabels]);

  if (sheetName === null) {
    return <Fragment />;
  }

  const onInputChange = () => {
    const matches = getLabels(searchValue.current.value);
    setSearchResults(matches);
  };

  const clearInput = (e) => {
    searchValue.current.value = "";
    setSearchResults(getAllLabels());
  };

  const searchedItems = (
    <Fragment>
      {searchResults &&
        searchResults.map((match, index) => {
          return (
            <li key={index} data-index={`${index}`}>
              {match}
            </li>
          );
        })}
    </Fragment>
  );

  const toBeAddedItems = (
    <Fragment>
      {selectedLabels &&
        selectedLabels.map((match, index) => {
          return (
            <li key={index} data-index={`${index}`}>
              {match}
            </li>
          );
        })}
    </Fragment>
  );

  const itemClick = (e) => {
    const element = e.target;
    const parent = element.parentElement.id;
    const dataIndex = element.getAttribute("data-index");

    if (parent === "search-results") {
      const name = searchResults[dataIndex];
      if (selectedLabels.indexOf(name) === -1) {
        setSelectedLabels([...selectedLabels, name]);
      }
    }

    if (parent === "selected-labels") {
      const newSelected = selectedLabels.filter((_, index) => {
        if (index === parseInt(dataIndex)) {
          return false;
        }
        return true;
      });
      setSelectedLabels(newSelected);
    }
  };

  return (
    <div className="label-selector-container">
      <h3>Select The Wanted Labels</h3>
      <div className="search-selection-controls">
        <input
          type="text"
          id="label-search"
          placeholder="Search For Label Name"
          ref={searchValue}
          onChange={onInputChange}
        />
        <button onClick={clearInput}>Clear Search</button>
        {searchResults.length === 0 ? (
          <button onClick={() => setSearchResults(getAllLabels())}>
            Show Labels
          </button>
        ) : (
          <button
            onClick={() => {
              setSearchResults([]);
              searchValue.current.value = "";
            }}
          >
            Hide Labels
          </button>
        )}
        <button
          onClick={() => {
            setSelectedLabels([]);
          }}
        >
          Clear Selected
        </button>
      </div>
      <div className="labels-box">
        <div className="filtered-labels-section">
          <h4>{searchResults ? searchResults.length : ""} Labels Found </h4>
          <ul id="search-results" onClick={itemClick}>
            {searchResults ? searchedItems : ""}
          </ul>
        </div>
        <div className="labels-to-add-section">
          <h4>
            {selectedLabels ? selectedLabels.length : ""} Labels To Be Added
          </h4>
          <ul id="selected-labels" onClick={itemClick}>
            {selectedLabels ? toBeAddedItems : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LabelSelector;

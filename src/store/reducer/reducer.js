import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  entryVal: '',
  displayRows: [],
};

const buttonPress = (state, action) => {
  const currentEntry = state.entryVal;
  const newEntryVal = action.buttonVal;
  const newEntry = {
    entryVal: currentEntry + newEntryVal,
  };
  return updateObject(state, newEntry);
}

const evaluateExpression = (state, action) => {
  const currentEntry = state.entryVal;
  const squaredEntry = currentEntry * currentEntry; // arbitrary evaluation

  const updatedRows = [...state.displayRows, [currentEntry, squaredEntry]];

  const newState = {
    entryVal: '',
    displayRows: updatedRows,
  }

  return updateObject(state, newState);
}

const entryUpdate = (state, action) => {
  const newEntry = {
    entryVal: action.updatedEntry,
  };
  return updateObject(state, newEntry);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUTTON_ENTRY:
      return buttonPress(state, action);
    case actionTypes.INPUT_ENTRY:
      return entryUpdate(state, action);
    case actionTypes.EVALUATE:
      return evaluateExpression(state, action);
    default:
      return state;
  }
};

export default reducer;

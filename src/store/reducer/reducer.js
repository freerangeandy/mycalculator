import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { evaluate } from '../../shared/interpreter';

const initialState = {
  entryVal: '',
  displayRows: [],
  selection: [0,0],
  errorMsg: '',
};

const buttonPress = (state, action) => {
  const currentEntryVal = state.entryVal;
  const insertVal = action.buttonVal;
  const [selectStart, selectEnd] = state.selection;

  const selectWidth = selectEnd - selectStart;
  const selectionShift = insertVal.toString().length - selectWidth;
  const newSelection = [selectEnd + selectionShift, selectEnd + selectionShift];

  const preInsert = selectStart > 0 ? currentEntryVal.slice(0, selectStart) : '';
  const postInsert = selectEnd < currentEntryVal.length ? currentEntryVal.slice(selectEnd) : '';
  const newEntryVal =  preInsert + insertVal + postInsert;

  const newState = {
    entryVal: newEntryVal,
    selection: newSelection,
  };
  return updateObject(state, newState);
}

const evaluateExpression = (state, action) => {
  const currentEntry = state.entryVal;
  //const squaredEntry = currentEntry * currentEntry; // arbitrary evaluation
  try {
    const result = evaluate(currentEntry).text();
    const updatedRows = [...state.displayRows, [currentEntry, result]];

    const newState = {
      entryVal: '',
      displayRows: updatedRows,
      selection: [0,0],
    }

    return updateObject(state, newState);
  } catch (e) {
    console.log(e.name, e.message);

    const errorMsg = e.message;
    const errorIndex = Number(errorMsg.match(/(\d+)$/g)[0]);

    const newSelection = [errorIndex - 1, errorIndex];
    console.log(errorIndex);
    const newState = {
      entryVal: currentEntry,
      selection: newSelection,
      error: e,
    }
    return updateObject(state, newState);
  }
}

const entryUpdate = (state, action) => {
  const newEntry = {
    entryVal: action.updatedEntry,
  };
  return updateObject(state, newEntry);
}

const selectionUpdate = (state, action) => {
  const newSelection = {
    selection: [action.selectStart, action.selectEnd]
  }
  return updateObject(state, newSelection);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUTTON_ENTRY:
      return buttonPress(state, action);
    case actionTypes.INPUT_ENTRY:
      return entryUpdate(state, action);
    case actionTypes.EVALUATE:
      return evaluateExpression(state, action);
    case actionTypes.SELECTION:
      return selectionUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;

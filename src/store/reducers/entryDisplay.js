import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { evalExpression, convertToLaTeXString } from '../../shared/interpreter';
import { CONVERTED_SYMBOL } from '../../shared/symbols.js';

const initialState = {
  entryVal: '',
  displayRows: [],
  selection: [0,0],
  errorName: '',
  errorMsg: '',
  useDecimals: false,
};

const buttonEntry = (state, action) => {
  const buttonVal = action.buttonVal;
  // console.log(`buttonVal: ${buttonVal}`);
  const insertVal = buttonVal in CONVERTED_SYMBOL ? CONVERTED_SYMBOL[buttonVal] : buttonVal;
  // console.log(`insertVal: ${insertVal}`);
  const currentEntryVal = state.entryVal;
  // const insertVal = action.buttonVal;
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

const typedEntry = (state, action) => {
  const newEntry = {
    entryVal: action.updatedEntry,
  };
  return updateObject(state, newEntry);
}

const evaluate = (state, action) => {
  const currentEntry = state.entryVal;
  const currentUseDecimals = state.useDecimals;
  try {
    // console.log(`currentEntry: ${currentEntry}`);
    const result = evalExpression(currentEntry);
    console.log(`result: ${result}`);
    const latexEntry = convertToLaTeXString(currentEntry);
    const latexResult = currentUseDecimals
                    ? result.text('decimals')
                    : convertToLaTeXString(result.toString());
    console.log(`latexResult: ${latexResult}`);

    const updatedRows = [...state.displayRows, [latexEntry, latexResult]];

    const newState = {
      entryVal: '',
      displayRows: updatedRows,
      selection: [0,0],
    }

    return updateObject(state, newState);
  } catch (e) {

    const errorName = e.name;
    const errorMsg = e.message;
    console.log(errorName, errorMsg);

    const newState = {
      entryVal: currentEntry,
      // selection: newSelection,
      errorName: errorName,
      errorMsg: errorMsg,
    }
    return updateObject(state, newState);
  }
}

const changeSelection = (state, action) => {
  const newSelection = {
    selection: [action.selectStart, action.selectEnd]
  }
  return updateObject(state, newSelection);
}

const setError = (state, action) => {
  const newError = {
    errorName: action.errName,
    errorMsg: action.errMsg,
  }

  return updateObject(state, newError);
}

const setUseDecimals = (state, action) => {
  const newState = {
    useDecimals: !state.useDecimals,
  }

  return updateObject(state, newState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUTTON_ENTRY:
      return buttonEntry(state, action);
    case actionTypes.TYPED_ENTRY:
      return typedEntry(state, action);
    case actionTypes.EVALUATE:
      return evaluate(state, action);
    case actionTypes.CHANGE_SELECTION:
      return changeSelection(state, action);
    case actionTypes.SET_ERROR:
      return setError(state, action);
    case actionTypes.USE_DECIMALS:
      return setUseDecimals(state, action);
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from '../actions/actionTypes';
import { evalExpression, setVariable } from '../../shared/interpreter';
import { updateObject, insertReplace, charIsDigit, handleError } from '../../shared/utility';
import { SYMBOLS } from '../../shared/symbols.js';

const initialState = {
  entryVal: '',
  displayRows: [],
  selection: [0,0],
  errorName: '',
  errorMsg: '',
  useDecimals: false,
  showSnackbar: false,
  snackbarMsg: '',
  savedVars: {},
};

const initConstants = (state, action) => {
    // setConstant('π', Math.PI);
    // setConstant('e', Math.E);
    return state;
}

const buttonEntry = (state, action) => {
  const {entryVal, selection} = state;
  const {buttonObj} = action;
  const insertVal = buttonObj.converted || buttonObj.key;
  const prefix = buttonObj.prefix && charIsDigit(entryVal, selection[0])
      ? buttonObj.prefix
      : '';
  const newState = insertReplace(prefix+insertVal, selection, entryVal);
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
  //const currentUseDecimals = state.useDecimals;
  try {
    const result = evalExpression(currentEntry);
    console.log(`result: ${result}`);
    const updatedRows = [...state.displayRows, [currentEntry, result]];
    const newState = {
      entryVal: '',
      displayRows: updatedRows,
      selection: [0,0],
    }
    return updateObject(state, newState);
  } catch (e) {
    const newState = handleError(e)
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

const closeSnackbar = (state, action) => {
  const newState = {
    showSnackbar: false,
  }
  return updateObject(state, newState);
}

const setSecondaryAction = (state, action) => {
  let newState;
  switch(action.buttonVal) {
    case SYMBOLS.delete:
      newState = SYMBOLS.delete.action(state, action);
      break;
    case SYMBOLS.answer:
      newState = SYMBOLS.answer.action(state, action);
      break;
    case SYMBOLS.clear:
      newState = SYMBOLS.clear.action(state, action);
      break;
    default:
      newState = {
        errorName: `${action.buttonVal} `,
        errorMsg: 'not working',
      }
  }

  return updateObject(state, newState);
}

const assignVariable = (state, action) => {
  const assignmentSuccess = setVariable(action.varName, state.entryVal);
  const newState = assignmentSuccess
    ? {
      showSnackbar: true,
      snackbarMsg: `${action.varName} assigned to value: ${state.entryVal}`,
    } : {
      errorName: 'setVarError',
      errorMsg: `${action.varName} is not a valid variable name`,
    }
  return updateObject(state, newState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CONSTANTS:
      return initConstants(state, action);
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
    case actionTypes.SET_SECONDARY_ACTION:
      return setSecondaryAction(state, action);
    case actionTypes.USE_DECIMALS:
      return setUseDecimals(state, action);
    case actionTypes.CLOSE_SNACKBAR:
      return closeSnackbar(state, action);
    case actionTypes.ASSIGN_VARIABLE:
      return assignVariable(state, action);
    default:
      return state;
  }
};

export default reducer;

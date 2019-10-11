import * as actionTypes from '../actions/actionTypes';
import { updateObject, insertSymbol, handleError } from '../../shared/utility';
import { evalExpression,
        preventEvalOutputPreLaTeX,
} from '../../shared/interpreter';
import { SYMBOLS } from '../../shared/symbols';

const initialState = {
  entryVal: '',
  displayRows: [],
  selection: [0,0],
  errorName: '',
  errorMsg: '',
  useDecimals: false,
  useDegrees: false,
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
  const {buttonObj} = action;
  const newState = insertSymbol(state, buttonObj);
  return updateObject(state, newState);
}

const typedEntry = (state, action) => {
  const newEntry = {
    entryVal: action.updatedEntry,
  };
  return updateObject(state, newEntry);
}
// S.R.P. refactor
const evaluate = (state, action) => {
  try {
    const currentUseDecimals = state.useDecimals;
    const currentUseDegrees = state.useDegrees;
    const currentEntry = state.entryVal;
    const result = evalExpression(currentEntry, currentUseDecimals, currentUseDegrees);
    const formatConfig = {
        useDecimals: currentUseDecimals,
        evalOutputPreLaTeX: !preventEvalOutputPreLaTeX(result),
    };
    const newRow = [currentEntry, result, formatConfig]
    const updatedRows = [...state.displayRows, newRow];
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
  console.log(`decimal mode: ${newState.useDecimals}`);
  return updateObject(state, newState);
}

const setUseDegrees = (state, action) => {
  const newState = {
    useDegrees: !state.useDegrees,
  }
  console.log(`degree mode: ${newState.useDegrees}`);
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
  switch(action.buttonKey) {
    case SYMBOLS.delete.key:
      newState = SYMBOLS.delete.action(state, action);
      break;
    case SYMBOLS.answer.key:
      newState = SYMBOLS.answer.action(state, action);
      break;
    case SYMBOLS.assign.key:
      newState = SYMBOLS.assign.action(state, action);
      break;
    case SYMBOLS.clear.key:
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
    case actionTypes.SET_USE_DECIMALS:
      return setUseDecimals(state, action);
    case actionTypes.SET_USE_DEGREES:
      return setUseDegrees(state, action);
    case actionTypes.CLOSE_SNACKBAR:
      return closeSnackbar(state, action);
    default:
      return state;
  }
};

export default reducer;

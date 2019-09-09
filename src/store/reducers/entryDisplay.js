import * as actionTypes from '../actions/actionTypes';
import { updateObject, insertReplace } from '../../shared/utility';
import { evalExpression, setVariable } from '../../shared/interpreter';
import { CONVERTED_SYMBOL, KEYS } from '../../shared/symbols.js';

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

const buttonEntry = (state, action) => {
  const buttonVal = action.buttonVal;
  const insertVal = buttonVal in CONVERTED_SYMBOL ? CONVERTED_SYMBOL[buttonVal] : buttonVal;
  const newState = insertReplace(insertVal, state.selection, state.entryVal);
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

const closeSnackbar = (state, action) => {
  const newState = {
    showSnackbar: false,
  }
  return updateObject(state, newState);
}

const setSecondaryAction = (state, action) => {
  let newState;
  switch(action.buttonVal) {
    case KEYS.delete:
      let curSelection = state.selection;
      const curSelectionWidth = curSelection[1] - curSelection[0];
      if (curSelectionWidth === 0 && curSelection[0] > 0) {
          curSelection[0] -= 1; // select previous character (to delete)
      }
      newState = insertReplace("", curSelection, state.entryVal);
      break;
    case KEYS.answer:
      if (state.displayRows.length > 0) {
        const prevAnswerObj = state.displayRows.slice(-1)[0][1];
        const prevAnswer = state.useDecimals ? prevAnswerObj.text('decimals')
                                             : prevAnswerObj.text('fraction');
        const ansLength = prevAnswer.length;
        newState = {
          entryVal: prevAnswer,
          selection: [ansLength,ansLength],
        }
      } else newState = {...state};
      break;
    case KEYS.clear:
      newState = {
        entryVal: '',
        selection: [0,0],
      }
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

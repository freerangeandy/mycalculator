import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { evalExpression } from '../../shared/interpreter';
import { CONVERTED_SYMBOL, KEYS } from '../../shared/symbols.js';

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
  //
  const selectWidth = selectEnd - selectStart;
  const selectionShift = insertVal.toString().length - selectWidth;
  const newSelection = [selectEnd + selectionShift, selectEnd + selectionShift];
  //
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

const setSecondaryAction = (state, action) => {
  let newState;
  switch(action.buttonVal) {
    case KEYS.delete:
      // look in buttonEntry(..) for code (write delete/insert function in utility.js?)
      newState = {
          entryVal: '',
          selection: [0,0],
      }
      break;
    case KEYS.answer:
      const prevAnswerObj = state.displayRows.slice(-1)[0][1];
      const prevAnswer = state.useDecimals ? prevAnswerObj.text('decimals')
                                           : prevAnswerObj.text('fraction');
      const ansLength = prevAnswer.length;
      newState = {
        entryVal: prevAnswer,
        selection: [ansLength,ansLength],
      }
      break;
    case KEYS.assign:
      newState = {
        errorName: `${action.buttonVal} `,
        errorMsg: 'stub',
      }
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
    default:
      return state;
  }
};

export default reducer;

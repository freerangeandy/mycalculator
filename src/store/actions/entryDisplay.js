import * as actionTypes from './actionTypes';

export const buttonEntry = (btnVal) => {
  return {
    type: actionTypes.BUTTON_ENTRY,
    buttonVal: btnVal,
  }
};

export const typedEntry = (updatedEntry) => {
  return {
    type: actionTypes.TYPED_ENTRY,
    updatedEntry: updatedEntry,
  }
};

export const evaluate = () => {
  return {
    type: actionTypes.EVALUATE,
  }
};

export const changeSelection = (start, end) => {
  return {
    type: actionTypes.CHANGE_SELECTION,
    selectStart: start,
    selectEnd: end,
  }
};

export const setError = (errName, errMsg) => {
  return {
    type: actionTypes.SET_ERROR,
    errName: errName,
    errMsg: errMsg,
  }
};

export const useDecimals = () => {
  return {
    type: actionTypes.USE_DECIMALS,
  }
};

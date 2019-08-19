import * as actionTypes from './actionTypes';

export const buttonEntry = (btnVal) => {
  return {
    type: actionTypes.BUTTON_ENTRY,
    buttonVal: btnVal,
  }
};

export const inputEntry = (updatedEntry) => {
  return {
    type: actionTypes.INPUT_ENTRY,
    updatedEntry: updatedEntry,
  }
};

export const evaluate = () => {
  return {
    type: actionTypes.EVALUATE,
  }
};

export const selection = (start, end) => {
  return {
    type: actionTypes.SELECTION,
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

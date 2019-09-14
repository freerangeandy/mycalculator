import * as actionTypes from './actionTypes';

export const initConstants = () => {
  return {
    type: actionTypes.INIT_CONSTANTS,
  }
};

export const buttonEntry = (btnObj) => {
  return {
    type: actionTypes.BUTTON_ENTRY,
    buttonObj: btnObj,
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

export const setSecondaryAction = (btnVal, payload) => {
  return {
    type: actionTypes.SET_SECONDARY_ACTION,
    buttonVal: btnVal,
    payload: payload,
  }
};

export const useDecimals = () => {
  return {
    type: actionTypes.USE_DECIMALS,
  }
};

export const closeSnackbar = () => {
  return {
    type: actionTypes.CLOSE_SNACKBAR,
  }
};

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

export const setSecondaryAction = (btnKey, payload) => {
  return {
    type: actionTypes.SET_SECONDARY_ACTION,
    buttonKey: btnKey,
    payload: payload,
  }
};

export const setUseDecimals = () => {
  return {
    type: actionTypes.SET_USE_DECIMALS,
  }
};

export const setUseDegrees = () => {
  return {
    type: actionTypes.SET_USE_DEGREES,
  }
};

export const closeSnackbar = () => {
  return {
    type: actionTypes.CLOSE_SNACKBAR,
  }
};

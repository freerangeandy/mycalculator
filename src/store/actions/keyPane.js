import * as actionTypes from './actionTypes';

export const setModifier = (btnVal) => {
  return {
    type: actionTypes.SET_MODIFIER,
    buttonVal: btnVal,
  }
};

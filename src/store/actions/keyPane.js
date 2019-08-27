import * as actionTypes from './actionTypes';

export const actionModifier = (btnVal) => {
  return {
    type: actionTypes.ACTION_MOD,
    buttonVal: btnVal,
  }
};

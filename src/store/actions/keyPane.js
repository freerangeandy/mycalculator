import * as actionTypes from './actionTypes';

export const setModifier = (btnObj) => {
  return {
    type: actionTypes.SET_MODIFIER,
    buttonObj: btnObj,
  }
};

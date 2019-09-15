import * as actionTypes from './actionTypes';

export const setModifier = (btnKey) => {
  return {
    type: actionTypes.SET_MODIFIER,
    buttonKey: btnKey,
  }
};

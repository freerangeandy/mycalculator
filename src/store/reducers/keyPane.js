import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { SYMBOLS } from '../../shared/symbols.js';

const initialState = {
  showAltButtons: false,
};

const setModifier = (state, action) => {
  let newState = action.buttonKey === SYMBOLS.secondFunc.key
    ? {
      showAltButtons: !state.showAltButtons,
    }
    : {
      errorName: `${action.buttonObj.key}`,
      errorMsg: 'not working',
    };
  return updateObject(state, newState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODIFIER:
      return setModifier(state, action);
    default:
      return state;
  }
};

export default reducer;

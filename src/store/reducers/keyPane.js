import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { DISPLAY_SYMBOL } from '../../shared/symbols.js';

const initialState = {
  showAltButtons: 'false',
};

const actionModifier = (state, action) => {
  let newState;
  if (action.buttonVal === DISPLAY_SYMBOL.secondFunc) {
      newState = {
          showAltButtons: !state.showAltButtons,
      }
  } else {
      newState = {
          errorName: `${action.buttonVal} `,
          errorMsg: 'not working',
      }
  }

  return updateObject(state, newState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_MOD:
      return actionModifier(state, action);
    default:
      return state;
  }
};

export default reducer;

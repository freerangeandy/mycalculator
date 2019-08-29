import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
// import { DISPLAY_SYMBOL } from '../../shared/symbols.js';

const initialState = {
  showAltButtons: 'false',
};

const setModifier = (state, action) => {
  let newState;
  if (action.buttonVal === 'secondFunc') {
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
    case actionTypes.SET_MODIFIER:
      return setModifier(state, action);
    default:
      return state;
  }
};

export default reducer;

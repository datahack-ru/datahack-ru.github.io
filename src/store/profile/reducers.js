import * as R from 'ramda';
import * as AT from './actionTypes';



const INITIAL_STATE = {
  guid: null,
  token: null,
  email: null,
  permissions: [],
  authenticated: false,
  parent: null,
};


function profileReducer(state = INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return INITIAL_STATE;
    }
    case AT.REAUTHENTICATE: {
      const xLens = R.lensProp('authenticated');
      return R.set(xLens, false, state);
    }

    case AT.SET_AUTH: {
      return R.merge(state, payload);
    }

    case AT.SET_PARENT: {
      const xLens = R.lensProp('parent');
      return R.set(xLens, payload, state);
    }

    default:
      return state;
  }
}

export default profileReducer;

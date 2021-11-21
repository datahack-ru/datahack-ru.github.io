import { setIn } from 'immutable';
import * as AT from './actionTypes';



const INITIAL_STATE = {
  accounts: [],
  account: null,
  linked: false,
  connector: null,
  chainId: null,
};

function walletReducer(state = INITIAL_STATE, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return INITIAL_STATE;
    }

    case AT.SET_ACCOUNT_LINKED: {
      return setIn(state, ['linked'], true);
    }
    case AT.SET_CONNECTOR: {
      return setIn(state, ['connector'], payload);
    }

    case AT.SET_CHAIN_ID: {
      return setIn(state, ['chainId'], payload);
    }

    case AT.SET_ACCOUNTS: {
      let temp = setIn(state, ['accounts'], payload);
      //temp = setIn(temp, ['linked'], false);
      return temp;
    }

    case AT.SET_ACCOUNT: {
      let temp = setIn(state, ['account'], payload);
      if (state.account !== payload)
        temp = setIn(temp, ['linked'], false);
      return temp;
    }

    default:
      return state;
  }
}

export default walletReducer;

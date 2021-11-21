import { setIn } from 'immutable';
import * as AT from './actionTypes';



const initialState = {
  blockNumber: -1,
  endpoint: null,

  // binance.bscData data.bscData
  bscData: {
    blockNumber: 0,
    cclpUsdtLpTotalSupply: '0',
    cclpUsdtReserves: { usdt: '0', cclp: '0', },
    cclpUsdtTotalLiquidity: '0',
    cclpUsdtLpPrice: '0',
    cclpPrice: '0',
    cclpTotalSupply: '0',
    cclpRewardRate: '0',
    cclpFarmTotalStaked: '0',
    cclpFarmTotalStakedUsd: '0',
    cclpFarmHistoricalRewardRate: '0',
  },
};


function binanceReducer(state = initialState, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.SET_BLOCK_NUMBER: {
      if (state.blockNumber < payload)
        return setIn(state, ['blockNumber'], payload);
      else return state;
    }

    case AT.SET_ENDPOINT: {
      return setIn(state, ['endpoint'], payload);
    }

    case AT.SET_BSC_DATA: {
      return setIn(state, ['bscData'], payload);
    }

    default:
      return state;
  }
}

export default binanceReducer;

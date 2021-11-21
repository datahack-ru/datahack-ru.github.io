import { setIn } from 'immutable';
import * as AT from './actionTypes';



const initialState = {
  wsConnected: false,
  wsId: null,

  bscBlockNumber: {
    provider: 0,
    internal: 0,
    external: 0,
  },
  ethBlockNumber: {
    provider: 0,
    internal: 0,
    external: 0,
  },

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

  roiData: {
    roi1Day: '0',
    roi1DayEarn: '0',
    roi7Day: '0',
    roi7DayEarn: '0',
    roi30Day: '0',
    roi30DayEarn: '0',
    apyNoReinvestment: 0,
    apyWeeklyReinvestment: 0,
    apyMonthlyReinvestment: 0,
    timestamp: 0,
  },
};


function dataReducer(state = initialState, action = {},) {
  const { type, payload } = action;

  switch (type) {
    case AT.CLEAR: {
      return initialState;
    }

    case AT.WS_CONNECTED: {
      let stateTemp = setIn(state, ['wsConnected'], true);
      return setIn(stateTemp, ['wsId'], payload);
    }
    case AT.WS_DISCONNECTED: {
      let stateTemp = setIn(state, ['wsConnected'], false);
      return setIn(stateTemp, ['wsId'], null);
    }

    case AT.SET_BSC_BLOCK_NUMBER: {
      if (state.bscBlockNumber[payload.provider] < payload.blockNumber)
        return setIn(state, ['bscBlockNumber', payload.provider], payload.blockNumber);
      else
        return state;
    }
    case AT.SET_ETH_BLOCK_NUMBER: {
      if (state.bscBlockNumber[payload.provider] < payload.blockNumber)
        return setIn(state, ['ethBlockNumber', payload.provider], payload.blockNumber);
      else
        return state;
    }

    case AT.SET_BSC_DATA: {
      return setIn(state, ['bscData'], payload);
    }

    case AT.SET_ROI_DATA: {
      return setIn(state, ['roiData'], payload);
    }


    default:
      return state;
  }
}

export default dataReducer;

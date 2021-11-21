import * as AT from './actionTypes';



export const clear = () => ({
  type: AT.CLEAR,
});

export const update = () => ({
  type: AT.UPDATE,
});

export const setWsConnected = (data) => ({
  type: AT.WS_CONNECTED,
  payload: data,
});
export const setWsDisconnected = () => ({
  type: AT.WS_DISCONNECTED,
});

export const setBscBlockNumber = (data) => ({
  type: AT.SET_BSC_BLOCK_NUMBER,
  payload: data,
});
export const setEthBlockNumber = (data) => ({
  type: AT.SET_ETH_BLOCK_NUMBER,
  payload: data,
});


export const setBscData = (data) => ({
  type: AT.SET_BSC_DATA,
  payload: data,
});

export const setRoiData = (data) => ({
  type: AT.SET_ROI_DATA,
  payload: data,
});


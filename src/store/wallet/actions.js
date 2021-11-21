import * as AT from './actionTypes';



export const clear = () => ({
  type: AT.CLEAR,
});


export const update = () => ({
  type: AT.UPDATE,
});

export const connect = () => ({
  type: AT.CONNECT,
});

export const setConnector = (data = {}) => ({
  type: AT.SET_CONNECTOR,
  payload: data,
});

export const setChainId = (data = {}) => ({
  type: AT.SET_CHAIN_ID,
  payload: data,
});

export const setAccountLinked = () => ({
  type: AT.SET_ACCOUNT_LINKED,
});

export const updateAccounts = () => ({
  type: AT.UPDATE_ACCOUNTS,
});
export const setAccounts = (data = {}) => ({
  type: AT.SET_ACCOUNTS,
  payload: data,
});
export const setAccount = (data = {}) => ({
  type: AT.SET_ACCOUNT,
  payload: data,
});

export const setAllowedAccounts = (data = {}) => ({
  type: AT.SET_ALLOWED_ACCOUNTS,
  payload: data,
});

export const addMask = (data = -1) => ({
  type: AT.ADD_MASK,
  payload: data,
});

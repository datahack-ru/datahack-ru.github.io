import { getIn } from 'immutable';


export const getChainId = (state) =>
  getIn(state, ['wallet', 'chainId'], null);

export const getAccounts = (state) =>
  getIn(state, ['wallet', 'accounts'], []);

export const getAccount = (state) =>
  getIn(state, ['wallet', 'account'], null);

export const getAllowedAccounts = (state) =>
  getIn(state, ['wallet', 'allowedAccounts'], null);

export const isAuthenticated = (state) => {
  const account = getAccount(state);
  return account !== null;
}

export const getLinked = (state) =>
  getIn(state, ['wallet', 'linked'], false);


export const getBalanceMasks = (state) =>
  getIn(state, ['wallet', 'balances', 'MASKS'], 0);

export const getMasks = (state) =>
  getIn(state, ['wallet', 'masks'], []);

export const getMasksLength = (state) => {
  const masks = getMasks(state);
  return masks.length;
}

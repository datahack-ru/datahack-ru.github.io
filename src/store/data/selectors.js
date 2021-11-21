import { getIn } from 'immutable';



const root = 'data';

export const isWsConnected = (state) =>
  getIn(state, [root, 'wsConnected'], false);

export const getWsId = (state) =>
  getIn(state, [root, 'wsId'], null);


export const getBscBlockNumberProvider = (state) =>
  getIn(state, [root, 'bscBlockNumber', 'provider'], 0);
export const getBscBlockNumberInternal = (state) =>
  getIn(state, [root, 'bscBlockNumber', 'internal'], 0);
export const getBscBlockNumberExternal = (state) =>
  getIn(state, [root, 'bscBlockNumber', 'external'], 0);

export const getEthBlockNumberProvider = (state) =>
  getIn(state, [root, 'ethBlockNumber', 'provider'], 0);
export const getEthBlockNumberInternal = (state) =>
  getIn(state, [root, 'ethBlockNumber', 'internal'], 0);
export const getEthBlockNumberExternal = (state) =>
  getIn(state, [root, 'ethBlockNumber', 'external'], 0);

export const getBscData = (state) =>
  getIn(state, [root, 'bscData'], null);

export const getRoiData = (state) =>
  getIn(state, [root, 'roiData'], null);

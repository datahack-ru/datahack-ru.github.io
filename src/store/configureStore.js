import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import localforage from 'localforage';
import createEnhancers, { sagaMiddleware } from './enhancers';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createApi from '../api';
import { isProduction } from '../constants/index';
import * as A from './actions';
import * as S from './selectors';

import { io } from 'socket.io-client';


const persistConfig = {
  key: 'store',
  storage: localforage,
  whitelist: [],
  stateReconciler: autoMergeLevel1,
};

export let api;



const initialState = {};

export const configureStore = (preloadedState = {}) => {
  const store = createStore(
    persistReducer(persistConfig, createRootReducer()),
    Object.assign({}, initialState, preloadedState),
    createEnhancers(),
  );
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(persistReducer(persistConfig, createRootReducer()));
    });
  }

  const options = {
    domains: {
      root: isProduction ? 'https://cosmoswap.space' : `http://${window.location.hostname}:3000`,
      api: isProduction ? 'https://api.cosmofund.space' : `http://${window.location.hostname}:3100`,
    },
  };
  const apiOptions = { apiKey: null, options, };
  const getAuthCredentials = () => S.profile.getAuthCredentials(store.getState());
  const reauthenticate = () => store.dispatch(A.profile.reAuthenticate());

  api = createApi({
    ...apiOptions,
    getAuthCredentials,
    reauthenticate,
    dispatch: store.dispatch,
  });
  sagaMiddleware.run(rootSaga, { api, options });

  setTimeout(() => {
    store.dispatch(A.wallet.update());
    store.dispatch(A.binance.update());
  }, 1000);


  const socket = io(options.domains.api);
  socket.on('connect', () => {
    socket.sendBuffer = [];
    store.dispatch(A.data.setWsConnected(socket.id));
  });
  socket.on('disconnect', () => {
    socket.sendBuffer = [];
    store.dispatch(A.data.setWsDisconnected());
  });

  socket.on('hello', (dd) => {
    //console.log('---> socket hello', dd);
  });


  socket.on('blockNumber', (data) => {
    if (data.network === 'bsc')
      store.dispatch(A.data.setBscBlockNumber(data));
  });

  socket.on('bscData', (data) => {
    if (data)
      store.dispatch(A.data.setBscData(data));
  });

  return { store, persistor };
}

export default configureStore;

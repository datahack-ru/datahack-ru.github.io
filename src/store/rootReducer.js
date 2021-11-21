import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import localforage from 'localforage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rehydrate from './rehydrate/reducers';
import ethereum from './ethereum/reducers';
import binance from './binance/reducers';
import profile from './profile/reducers';
import wallet from './wallet/reducers';
import data from './data/reducers';



export const createRootReducer = () => {
  const rootReducer = combineReducers({
    rehydrate,
    ethereum,
    binance,
    profile: persistReducer(
      { key: 'profile', storage: storage, stateReconciler: autoMergeLevel1, },
      profile
    ),
    wallet,
    data,
  });

  return rootReducer;
};

export default createRootReducer;

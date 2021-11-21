import { takeLatest } from 'redux-saga/effects';
import { takeFirst } from '../lib';
import * as AT from './actionTypes';
import sagas from './sagas';



export default ({ api, }) => {
  const {
    clearSaga,
    updateSaga,
    connectSaga,
    updateAccountsSaga,
  } = sagas({
    api,
  });

  return function* walletRootSaga() {
    yield takeFirst(AT.CLEAR, clearSaga);
    yield takeLatest(AT.UPDATE, updateSaga);
    yield takeLatest(AT.CONNECT, connectSaga);
    yield takeLatest(AT.UPDATE_ACCOUNTS, updateAccountsSaga);
  }
}

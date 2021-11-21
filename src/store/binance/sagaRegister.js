import { takeLatest, takeEvery } from 'redux-saga/effects';
import { takeFirst } from '../lib';
import * as AT from './actionTypes';
import * as DAT from '../data/actionTypes';
import sagas from './sagas';



export default ({ api, }) => {
  const {
    clearSaga,
    updateSaga,
    updateBlockNumberSaga,
  } = sagas({
    api,
  });

  return function* binanceRootSaga() {
    yield takeFirst(AT.CLEAR, clearSaga);
    yield takeFirst(AT.UPDATE, updateSaga);
    yield takeFirst(AT.SET_BLOCK_NUMBER, updateSaga);
    yield takeFirst(DAT.WS_DISCONNECTED, updateSaga);
    yield takeLatest(AT.UPDATE_BLOCK_NUMBER, updateBlockNumberSaga);
  }
}

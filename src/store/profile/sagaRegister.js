//import { takeLatest } from 'redux-saga/effects';
import { takeFirst } from '../lib';
import * as AT from './actionTypes';
import * as RAT from '../rehydrate/actionTypes';
import sagas from './sagas';



export default ({ api, }) => {
  const {
    clearSaga,
    updateSaga,
    profileSignInSaga,
    profileSignUpSaga,
    profileSignOutSaga,
  } = sagas({
    api,
  });

  return function* profileRootSaga() {
    yield takeFirst(AT.CLEAR, clearSaga);
    yield takeFirst(AT.UPDATE, updateSaga);
    yield takeFirst(RAT.REHYDRATED, updateSaga);
    yield takeFirst(AT.SIGN_IN, profileSignInSaga);
    yield takeFirst(AT.SIGN_UP, profileSignUpSaga);
    yield takeFirst(AT.SIGN_OUT, profileSignOutSaga);
    yield takeFirst(AT.REAUTHENTICATE, profileSignOutSaga);
  }
}

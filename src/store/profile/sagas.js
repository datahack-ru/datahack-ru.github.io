import { put, select } from 'redux-saga/effects';
import queryString from 'query-string';
import * as A from './actions';
import * as S from './selectors';



const logLocation = 'sagas/profile/sagas';

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const profileSignInSaga = function* (action) {
    const { payload } = action;
    try {
      const res = yield api.profileSignIn(payload);
      if (res.ok) {
        const { email } = payload;
        const { guid, token, permissions, authenticated, parent, } = res.result;
        yield put(A.setAuth({
          email, guid, token, permissions, authenticated, parent,
        }));
      }
    } catch (error) {
      yield console.error(logLocation, 'profileSignInSaga()', error);
    }
  }

  const profileSignUpSaga = function* (action) {
    const { payload } = action;
    try {
      const res = yield api.profileSignUp(payload);
      if (res.ok) {
        const { email } = payload;
        const { guid, token, permissions, authenticated, parent, } = res.result;
        yield put(A.setAuth({
          email, guid, token, permissions, authenticated, parent,
        }));
      }
    } catch (error) {
      yield console.error(logLocation, 'profileSignUpSaga()', error);
    }
  }

  const profileSignOutSaga = function* () {
    try {
      yield put(A.setAuth({
        guid: null,
        token: null,
        email: null,
        permissions: [],
        authenticated: false,
      }));
      yield api.profileSignOut();
    } catch (error) {
      yield console.error(logLocation, 'profileSignOutSaga()', error);
    }
    yield put(A.clear());
  }

  const updateSaga = function* () {
    let step = 0;
    try {
      const parsed = queryString.parse(window.location.search);
      const parent = yield select(S.getParent);
      if (parsed.r && !parent) {
        yield put(A.setParent(parsed.r));
      }
      if (parsed.utm_source && parsed.utm_source.includes('blog0') && !parent) {
        yield put(A.setParent(parsed.utm_source));
      }
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', `step: ${step}`, error);
    }
  }

  return {
    clearSaga,
    updateSaga,
    profileSignInSaga,
    profileSignUpSaga,
    profileSignOutSaga,
  }
}


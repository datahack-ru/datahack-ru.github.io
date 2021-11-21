import * as R from 'ramda';



export const getReferralId = (state) =>
  R.pathOr(null, ['profile', 'guid'], state);

export const isAuthenticated = (state) =>
  R.pathOr(false, ['profile', 'authenticated'], state);

export const getGuid = (state) =>
  R.pathOr(null, ['profile', 'guid'], state);

export const getToken = (state) =>
  R.pathOr(null, ['profile', 'token'], state);

export const getParent = (state) =>
  R.pathOr(null, ['profile', 'parent'], state);

export const getEmail = (state) =>
  R.pathOr(null, ['profile', 'email'], state);

export const getAuthCredentials = (state) => {
  const guid = getGuid(state);
  const token = getToken(state);
  return { guid, token, };
}

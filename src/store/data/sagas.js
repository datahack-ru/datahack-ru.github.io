import { put, select } from 'redux-saga/effects';
import * as A from './actions';
import * as S from './selectors';
import * as BS from '../binance/selectors';
import { getRoiData } from '../../utils';



const logLocation = 'sagas/data/sagas';

export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }

  const updateSaga = function* () {
    try {
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', error);
    }
  }

  const updateRoiDataSaga = function* () {
    try {
      const roiDataOld = yield select(S.getRoiData);
      if (
        (roiDataOld.timestamp + 60) < Math.floor(Date.now() / 1000)
        || roiDataOld.roi1Day === 'NaN'
      ) {
        let bscData = null;
        const isWsConnected = yield select(S.isWsConnected);
        if (isWsConnected)
          bscData = yield select(S.getBscData);
        else
          bscData = yield select(BS.getBscData);

        const roiData = getRoiData(bscData.cclpPrice, bscData.cclpUsdtLpPrice, bscData.cclpFarmTotalStaked);
        yield put(A.setRoiData(roiData));
      }
    } catch (error) {
      yield console.error(logLocation, 'updateRoiDataSaga()', error);
    }
  }

  return {
    clearSaga,
    updateSaga,
    updateRoiDataSaga,
  };
}

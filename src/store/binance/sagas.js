import { put, select } from 'redux-saga/effects';
import * as A from './actions';
import * as DS from '../data/selectors';
import { ethers, utils, BigNumber } from 'ethers';

import PancakePairV2Abi from '../../constants/abis/PancakePairV2.json';
import cclpAbi from '../../constants/abis/CCLP.json';
import stakingServiceAbi from '../../constants/abis/StakingService.json';


const logLocation = 'sagas/binance/sagas';

const pairCclpUsdtAddress = '0x7e5420373b446d27Cd33aa1117083AE188B9BeF9';
const pairCclpUsdtContract = new ethers.Contract(pairCclpUsdtAddress, PancakePairV2Abi);

const usdtAddress = '0x55d398326f99059fF775485246999027B3197955';
const usdtContract = new ethers.Contract(usdtAddress, PancakePairV2Abi);

const cclpAddress = '0x55ece1750677AF5FcCbf0F05b52169946c371878';
const cclpContract = new ethers.Contract(cclpAddress, cclpAbi);


const stakingServiceAddress = '0xb12338640a1Ac917bc2cd58279Be0b20FdfF3041';
const stakingServiceContract = new ethers.Contract(stakingServiceAddress, stakingServiceAbi);


let isUpdatingBsc = false;


let bscData = {
  blockNumber: 0,
  cclpUsdtLpTotalSupply: '0',
  cclpUsdtReserves: { usdt: '0', cclp: '0', },
  cclpUsdtTotalLiquidity: '0',
  cclpUsdtLpPrice: '0',
  cclpPrice: '0',
  cclpTotalSupply: '0',
  cclpRewardRate: '0',
  cclpFarmTotalStaked: '0',
  cclpFarmTotalStakedUsd: '0',
  cclpFarmHistoricalRewardRate: '0',
};


async function updateBscData(provider) {
  try {
    if (isUpdatingBsc)
      return;
    isUpdatingBsc = true;


    // 
    const pairContract = pairCclpUsdtContract.connect(provider);
    const cclpUsdtLpTotalSupply_ = await pairContract.totalSupply();
    const reserves_ = await pairContract.getReserves();

    const cclpUsdtLpTotalSupply = utils.formatUnits(cclpUsdtLpTotalSupply_, 18).toString();
    const cclpUsdtReserves = {
      usdt: utils.formatUnits(reserves_._reserve0, 18).toString(), // USDT
      cclp: utils.formatUnits(reserves_._reserve1, 18).toString(), // CCLP
      blockTimestampLast: reserves_._blockTimestampLast,
    };
    const cclpUsdtTotalLiquidity = utils.formatUnits(reserves_._reserve0.mul(2), 18).toString();
    const cclpUsdtLpPrice = utils.formatUnits(reserves_._reserve0.mul(2).mul('1000000000000000000').div(cclpUsdtLpTotalSupply_), 18).toString();
    const cclpPrice = utils.formatUnits(reserves_._reserve0.mul('1000000000000000000').div(reserves_._reserve1), 18).toString();


    // 
    const cclpContract2 = cclpContract.connect(provider);
    const cclpTotalSupply_ = await cclpContract2.totalSupply();
    const cclpRewardRate_ = await cclpContract2.rewardRate();

    const cclpTotalSupply = utils.formatUnits(cclpTotalSupply_, 18).toString();
    const cclpRewardRate = utils.formatUnits(cclpRewardRate_, 18).toString();


    //
    const stakingServiceContract2 = stakingServiceContract.connect(provider);
    const cclpFarmState_ = await stakingServiceContract2.state();
    const cclpFarmTotalStaked = utils.formatUnits(cclpFarmState_.totalStaked, 18).toString();
    const cclpFarmTotalStakedUsd = utils.formatUnits(
      cclpFarmState_.totalStaked.mul(reserves_._reserve0.mul(2).mul('1000000000000000000').div(cclpUsdtLpTotalSupply_)).div('1000000000000000000'),
      18).toString();
    const cclpFarmHistoricalRewardRate = utils.formatUnits(cclpFarmState_.historicalRewardRate, 18).toString();


    isUpdatingBsc = false;
    return {
      cclpUsdtLpTotalSupply,
      cclpUsdtReserves,
      cclpUsdtTotalLiquidity,
      cclpUsdtLpPrice,
      cclpPrice,
      cclpTotalSupply,
      cclpRewardRate,
      cclpFarmTotalStaked,
      cclpFarmTotalStakedUsd,
      cclpFarmHistoricalRewardRate,
    };

  } catch (error) {
    console.error(error);
    isUpdatingBsc = false;
    return null;
  }
}


export default ({ api, }) => {

  const clearSaga = function* () {
    yield put(A.clear());
  }
  const updateBscDataSaga = function* () {
    try {
      const isWsConnected = yield select(DS.isWsConnected);
      if (isWsConnected)
        return;

      const data = yield updateBscData(api.bscProvider);
      if (data) {
        const blockNumber = yield api.bscProvider.getBlockNumber();
        yield put(A.setBlockNumber(blockNumber));
        data.blockNumber = blockNumber;
        yield put(A.setBscData(data));
      }
    } catch (error) {
      yield console.error(logLocation, 'updateBlockNumberSaga()', error);
    }
  }

  const updateBlockNumberSaga = function* () {
    try {
      const blockNumber = yield api.bscProvider.getBlockNumber();
      yield put(A.setBlockNumber(blockNumber));
    } catch (error) {
      yield console.error(logLocation, 'updateBlockNumberSaga()', error);
    }
  }

  const updateSaga = function* () {
    try {
      yield updateBscDataSaga();
      //yield updateBlockNumberSaga();
    } catch (error) {
      yield console.error(logLocation, 'updateSaga()', error);
    }
  }

  return {
    clearSaga,
    updateSaga,
    updateBlockNumberSaga,
    updateBscDataSaga,
  }
}


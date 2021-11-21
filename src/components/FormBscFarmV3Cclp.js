import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ethers, utils, BigNumber } from 'ethers';
import {
  usdtBscAddress, cclpBscAddress,
  cclpBscUsdtPair, cclpBscStakingService,
} from '../constants/index';

import FarmAbi from '../constants/abis/StakingService.json';
import Erc20Abi from '../constants/abis/erc20.json';
import CclpAbi from '../constants/abis/CCLP.json';

import { api } from '../store/configureStore';
import * as S from '../store/selectors';
import FarmCclp from "./FarmCclp/FarmCclp";

import {
  switchNetworkToBscRequestData,
  POOL, getPoolShares,
  getCurrentTokenSupply,
  getRewardRateNext24h,
} from '../utils';


import { useEagerConnect, useActiveWeb3React } from '../hooks/index';
import useAuth from '../hooks/useAuth';
//import { useWalletModal } from '../modal/WalletModal';
//import { useChangeNetworkModal } from '../modal/ChangeNetworkModal';
import { useErrorModal } from '../modal/ErrorModal';
import { useInfoModal } from '../modal/InfoModal';
//import { useTransactionSendedModal } from '../modal/TransactionSendedModal';
//import { useTransactionConfirmedModal } from '../modal/TransactionConfirmedModal';


import { toast } from 'react-toastify';

const stakingServiceAddress = cclpBscStakingService;
const lpTokenAddress = cclpBscUsdtPair;
const symbol = 'CCLP/USDT-LP';
const addLiquidityLink = `https://pancakeswap.finance/add/${cclpBscAddress}/${usdtBscAddress}`;
const removeLiquidityLink = `https://pancakeswap.finance/remove/${cclpBscAddress}/${usdtBscAddress}`;


const getFarmRate = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  let rate = getRewardRateNext24h(timestamp, POOL.PRIMARY);
  rate = utils.formatUnits(rate, 18).toString();
  return rate;
}


function FormBscFarmV3Cclp(props) {
  const { t } = useTranslation();
  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  //const { onPresentConnectModal } = useWalletModal(login, logout);
  //const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();


  const isWsConnected = useSelector((state) => S.data.isWsConnected(state));
  const bscData = useSelector((state) => S.data.getBscData(state));
  const bscData2 = useSelector((state) => S.binance.getBscData(state));

  let cclpBscPrice = '0';
  let totalStakedAmount = '0';
  let cclpFarmTotalStakedBn = BigNumber.from(0);
  let cclpFarmHistoricalRewardRateBn = BigNumber.from(0);

  // еще бы сравнивать номер блока для большей достоверности
  if (isWsConnected && bscData) {
    // данные с сервера
    cclpBscPrice = bscData.cclpPrice;
    totalStakedAmount = bscData.cclpFarmTotalStaked;
    cclpFarmTotalStakedBn = utils.parseUnits(bscData.cclpFarmTotalStaked, 18);
    cclpFarmHistoricalRewardRateBn = utils.parseUnits(bscData.cclpFarmHistoricalRewardRate, 18);
  } else if (bscData2) {
    // данные из блокчейна которые собираются через браузер пользователя
    cclpBscPrice = bscData2.cclpPrice;
    totalStakedAmount = bscData.cclpFarmTotalStaked;
    cclpFarmTotalStakedBn = utils.parseUnits(bscData.cclpFarmTotalStaked, 18);
    cclpFarmHistoricalRewardRateBn = utils.parseUnits(bscData.cclpFarmHistoricalRewardRate, 18);
  }// cclpFarmTotalStaked


  const [updating, setUpdating] = useState(false);
  const blockNumber = useSelector((state) => S.binance.getBlockNumber(state));



  const [farmRate, setFarmRate] = useState(getFarmRate());
  const [myFarmShare, setMyFarmShare] = useState('0');
  const [myFarmRate, setMyFarmRate] = useState('0');


  const [stakedAmount, setStakedAmount] = useState('0');
  const [unstakedAmount, setUnstakedAmount] = useState('0');

  const [stakeAmount, setStakeAmount] = useState('0');
  const [unstakeAmount, setUnstakeAmount] = useState('0');


  const [stakingServiceContract, setFarmContract] = useState();
  const [lpTokenContract, setLpTokenContract] = useState();
  const [cclpTokenContract, setCclpTokenContract] = useState();

  if (!stakingServiceContract) setFarmContract(new ethers.Contract(
    stakingServiceAddress, FarmAbi, api.bscProvider
  ));
  if (!lpTokenContract) setLpTokenContract(new ethers.Contract(
    lpTokenAddress, Erc20Abi, api.bscProvider
  ));
  if (!cclpTokenContract) setCclpTokenContract(new ethers.Contract(
    cclpBscAddress, CclpAbi, api.bscProvider
  ));


  const switchNetworkToBsc = async () => {
    if (chainId !== 56) {
      //alert('Wrong network!');
      await library.provider.request(switchNetworkToBscRequestData);
      window.location.reload();
    }
  }


  const [primaryPoolMintState, setPrimaryPoolMintState] = useState({
    time: 0,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: 0,
    nextTickSupply: BigNumber.from(0),
  });

  const [stakerInfo, setStakerInfo] = useState({
    amount: BigNumber.from(0),
    initialRewardRate: BigNumber.from(0),
    reward: BigNumber.from(0),
    claimedReward: BigNumber.from(0),
  });


  const [time, setTime] = useState(0);
  const update = useCallback(async () => {
    if (updating)
      return;

    setUpdating(true);

    // update FarmRate
    const farmRateTemp = getFarmRate();
    setFarmRate(farmRateTemp);

    // updatePrimaryPoolMintState
    let primaryPoolMintStateTemp = primaryPoolMintState;
    if (cclpTokenContract) {
      try {
        const data = await cclpTokenContract.poolMintStates(POOL.PRIMARY);
        primaryPoolMintStateTemp = data;
        setPrimaryPoolMintState({
          time: data.time,
          itemIndex: data.itemIndex,
          weekIndex: data.weekIndex,
          weekStartTime: data.weekStartTime,
          nextTickSupply: data.nextTickSupply,
        });
      } catch (error) { console.error(error); }
    }

    let stakerInfoTemp = stakerInfo;
    if (account) {
      // update StakedAmount
      if (stakingServiceContract) {
        try {
          const data2 = await stakingServiceContract.stakers(account);
          stakerInfoTemp = data2;
          setStakerInfo(data2);

          // update stakedAmount
          const amount = utils.formatUnits(data2.amount, 18).toString();
          setStakedAmount(amount);

          // update myFarmShare
          const stakedAmountFloat = parseFloat(amount);
          const totalStakedAmountFloat = parseFloat(totalStakedAmount);
          if (stakedAmountFloat > 0 && totalStakedAmountFloat > 0) {
            const myFarmShare = stakedAmountFloat / totalStakedAmountFloat * 100;
            setMyFarmShare(myFarmShare.toString());

            // update myFarmRate
            const farmRateFloat = parseFloat(farmRateTemp);
            if (farmRateFloat > 0) {
              const myFarmRate = farmRateFloat * stakedAmountFloat / totalStakedAmountFloat;
              setMyFarmRate(myFarmRate.toString());
            }
          }

        } catch (error) { console.error(error); }
      }

      // update UnstakedAmount
      if (lpTokenContract) {
        try {
          const unstakedAmount = await lpTokenContract.balanceOf(account);
          setUnstakedAmount(utils.formatUnits(unstakedAmount, 18).toString());
        } catch (error) { console.error(error); }
      }
    } else {
      setStakedAmount('0');
      setMyFarmShare('0');
      setMyFarmRate('0');
      setUnstakedAmount('0');
    }

    setUpdating(false);
  }, [time, updating, blockNumber, account]);

  // Обновление при новом блоке
  useEffect(() => {
    update();
  }, [blockNumber]);

  // Обновление при смене аккаунта
  useEffect(() => {
    update();
  }, [account]);

  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const [pendingReward, setPendingReward] = useState('0');
  useEffect(() => {
    try {
      if (primaryPoolMintState.time === 0)
        return;

      const timestamp = Math.floor(Date.now() / 1000);
      const currentTokenSupply = getCurrentTokenSupply(
        primaryPoolMintState,
        timestamp,
        POOL.PRIMARY,
      );

      const additionalRewardRate = currentTokenSupply
        .shl(40)
        .div(cclpFarmTotalStakedBn);

      const hrr = cclpFarmHistoricalRewardRateBn
        .add(additionalRewardRate);

      const unrewarded = hrr.sub(stakerInfo.initialRewardRate)
        .mul(stakerInfo.amount)
        .shr(40);

      const unclaimed = stakerInfo.reward
        .add(unrewarded)
        .sub(stakerInfo.claimedReward);
      setPendingReward(utils.formatUnits(unclaimed, 18).toString());

    } catch (error) { console.error(error); }
  }, [time]);


  const [state, setState] = useState({});
  const handleChange = (e, { name, value }) => {
    switch (name) {
      case 'stakeAmount': return setStakeAmount(value);
      case 'unstakeAmount': return setUnstakeAmount(value);
      default: return setState({ ...state, [name]: value, });
    }
  }

  const setAllStakeAmountAction = () => {
    setStakeAmount(unstakedAmount);
  }

  const stakeAction = async () => {
    try {
      await switchNetworkToBsc();

      const amount = utils.parseUnits(stakeAmount, 18);

      const signer = library.getSigner();
      const contractTokenConnected = lpTokenContract.connect(signer);

      const allowance = await lpTokenContract.allowance(account, stakingServiceAddress);
      if (allowance.lte(amount)) {
        const approveTx = await contractTokenConnected.approve(
          stakingServiceAddress, ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        );
        toast.info('Waiting for token spend limit approving');
        await approveTx.wait(1);
      }

      const contractFarmConnected = stakingServiceContract.connect(signer);
      const tx = await contractFarmConnected.stake(amount);
      toast.info('Transaction pending...');
      await tx.wait(1);
      toast.info('Transaction done!');

      setStakeAmount('');
      update();
    } catch (error) {
      console.error(error);
      onPresentErrorModal(error);
    }
  }

  const setAllUnstakeAmountAction = () => {
    setUnstakeAmount(stakedAmount);
  }

  const unstakeAction = async () => {
    try {
      await switchNetworkToBsc();

      const amount = utils.parseUnits(unstakeAmount, 18);

      const signer = library.getSigner();

      const contractFarmConnected = stakingServiceContract.connect(signer);
      const tx = await contractFarmConnected.unstake(amount);
      toast.info('Transaction pending...');
      await tx.wait(1);
      toast.info('Transaction done!');

      setUnstakeAmount('');
      update();
    } catch (error) { console.error(error); }
  }

  const claimAllAction = async () => {
    try {
      await switchNetworkToBsc();

      const signer = library.getSigner();

      const contractFarmConnected = stakingServiceContract.connect(signer);
      const tx = await contractFarmConnected.claimReward();
      toast.info('Transaction pending...');
      await tx.wait(1);
      toast.info('Transaction done!');

      setStakeAmount('');
      update();
    } catch (error) {
      console.error(error);
      onPresentErrorModal(error);
    }
  }


  return (
    <FarmCclp
      title={t('Farm Symbol Staking', { symbol })}
      symbol={symbol}
      addLiquidityLink={addLiquidityLink}
      removeLiquidityLink={removeLiquidityLink}
      {...{
        cclpBscPrice,
        totalStakedAmount, farmRate, myFarmShare, myFarmRate,
        stakedAmount, unstakedAmount, pendingReward,

        handleChange,
        stakeAmount, setAllStakeAmountAction, stakeAction,
        unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
        claimAllAction, update,
      }}
    />
  );
}

export default hot(module)(FormBscFarmV3Cclp);

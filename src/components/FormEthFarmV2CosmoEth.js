import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { ethers, utils } from 'ethers';
import FarmUniswapAbi from '../constants/abis/FarmUniswap.json';
import Erc20Abi from '../constants/abis/erc20.json';
import { api } from '../store/configureStore';
import * as S from '../store/selectors';
import Farm from "./Farm/Farm";


import { useEagerConnect, useActiveWeb3React } from '../hooks/index';
import useAuth from '../hooks/useAuth';
import { useWalletModal } from '../modal/WalletModal';
import { useChangeNetworkModal } from '../modal/ChangeNetworkModal';
import { useErrorModal } from '../modal/ErrorModal';
import { useInfoModal } from '../modal/InfoModal';
import { useTransactionSendedModal } from '../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../modal/TransactionConfirmedModal';

import { uniswapV2CosmoEthLpAddress } from '../constants';




const tokenAddress = uniswapV2CosmoEthLpAddress;

const farmAddress = '0x217c9d8b238f1600588498388c7239188228ed0e'; // COSMO/ETH
const symbol = 'COSMO/ETH-LP';
const addLiquidityLink = 'https://app.uniswap.org/#/add/v2/0x27cd7375478F189bdcF55616b088BE03d9c4339c/ETH';
const removeLiquidityLink = 'https://app.uniswap.org/#/remove/v2/0x27cd7375478F189bdcF55616b088BE03d9c4339c/ETH';



function FormEthFarmCosmoEth(props) {
  const { t } = useTranslation();
  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();

  const [updating, setUpdating] = useState(false);
  const [blockNumber, setBlockNumber] = useState(12287865);


  const [totalStakedAmount, setTotalStakedAmount] = useState('0.0');
  const [farmRate, setFarmRate] = useState('99292035398.2');
  const [myFarmShare, setMyFarmShare] = useState('0.0');
  const [myFarmRate, setMyFarmRate] = useState('0.0');

  const [pendingReward, setPendingReward] = useState('0.0');
  const [stakedAmount, setStakedAmount] = useState('0.0');
  const [unstakedAmount, setUnstakedAmount] = useState('0.0');

  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const [farmContract, setFarmContract] = useState();
  const [tokenContract, setTokenContract] = useState();


  if (!farmContract) setFarmContract(new ethers.Contract(
    farmAddress, FarmUniswapAbi, api.ethProvider
  ));

  if (!tokenContract) setTokenContract(new ethers.Contract(
    tokenAddress, Erc20Abi, api.ethProvider
  ));


  const switchNetworkToBsc = async () => {
    if (chainId !== 1) {
      onPresentErrorModal({ message: 'Wrong network! Switch Network to Ethereum Mainnet in MetaMask!' });
      window.location.reload();
    }
    return;
  }

  const updateTotalStakedAmount = async () => {
    if (!tokenContract) return;
    try {
      let totalStakedAmount = await tokenContract.balanceOf(farmAddress);
      totalStakedAmount = utils.formatUnits(totalStakedAmount, 18).toString();
      setTotalStakedAmount(totalStakedAmount);
    } catch (error) { console.error(error); }
  }

  const updateFarmRate = async () => {
    if (!farmContract) return;
    try {
      if (blockNumber > 0) {
        let multiplier = await farmContract.getMultiplier(blockNumber, blockNumber + 6600);
        let farmInfo = await farmContract.farmInfo();
        let farmRate = farmInfo.blockReward.mul(multiplier);
        farmRate = utils.formatUnits(farmRate, 18).toString();
        setFarmRate(farmRate);
      }
    } catch (error) { console.error(error); }
  }

  const updateMyFarmShare = async () => {
    try {
      let stakedAmountFloat = parseFloat(stakedAmount);
      let totalStakedAmountFloat = parseFloat(totalStakedAmount);
      if (stakedAmountFloat > 0 && totalStakedAmountFloat > 0) {
        let myFarmShare = stakedAmountFloat / totalStakedAmountFloat * 100;
        setMyFarmShare(myFarmShare.toString());
      } else {
        setMyFarmShare('0.0');
      }
    } catch (error) { console.error(error); }
  }

  const updateMyFarmRate = async () => {
    try {
      let farmRateFloat = parseFloat(farmRate);
      let stakedAmountFloat = parseFloat(stakedAmount);
      let totalStakedAmountFloat = parseFloat(totalStakedAmount);
      if (farmRateFloat > 0 && stakedAmountFloat > 0 && totalStakedAmountFloat > 0) {
        let myFarmRate = farmRateFloat * stakedAmountFloat / totalStakedAmountFloat;
        setMyFarmRate(myFarmRate.toString());
      } else {
        setMyFarmRate('0.0');
      }
    } catch (error) { console.error(error); }
  }

  const updateUnstakedAmount = async () => {
    if (!tokenContract) return;
    try {
      if (account) {
        let unstakedAmount = await tokenContract.balanceOf(account);
        unstakedAmount = utils.formatUnits(unstakedAmount, 18).toString();
        setUnstakedAmount(unstakedAmount);
      }
    } catch (error) { console.error(error); }
  }

  const updateStakedAmount = async () => {
    if (!farmContract) return;
    try {
      if (account) {
        let userInfo = await farmContract.userInfo(account);
        const stakedAmount = utils.formatUnits(userInfo.amount, 18).toString();
        setStakedAmount(stakedAmount);
      }
    } catch (error) { console.error(error); }
  }

  const updatePendingReward = async () => {
    if (!farmContract) return;
    try {
      if (account) {
        let pendingReward = await farmContract.pendingReward(account);
        pendingReward = utils.formatUnits(pendingReward, 18).toString();
        setPendingReward(pendingReward);
      }
    } catch (error) { console.error(error); }
  }

  useEffect(() => {
    updateMyFarmShare();
  }, [totalStakedAmount, stakedAmount]);

  const update = async (force) => {
    if (updating) return;
    setUpdating(true);
    try {
      await updateFarmRate();
      await updateTotalStakedAmount();
      if (account) {
        await updateStakedAmount();
        await updateMyFarmShare();
        await updateMyFarmRate();
        await updatePendingReward();
        await updateUnstakedAmount();
      }
    } catch (error) { console.error(error); }
    setUpdating(false);
  }

  if (props.blockNumber >= blockNumber + 1) {
    setBlockNumber(props.blockNumber);
    update(true);
  }


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
      const contractTokenConnected = tokenContract.connect(signer);

      const allowance = await tokenContract.allowance(account, farmAddress);
      if (allowance.lte(amount)) {
        const approveTx = await contractTokenConnected.approve(
          farmAddress, ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        );
        onPresentInfoModal({ message: 'Waiting for token spend limit approving' });
        await approveTx.wait(1);
      }

      const contractFarmConnected = farmContract.connect(signer);
      const tx = await contractFarmConnected.deposit(amount);
      onPresentInfoModal({ message: 'Transaction Hash: ' + tx.hash });
      await tx.wait(1);
      onPresentInfoModal({ message: 'Done!' });

      setStakeAmount('');
      update(true);
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
      await switchNetworkToBsc();
      const amount = utils.parseUnits(unstakeAmount, 18);

      const signer = library.getSigner();

      const contractFarmConnected = farmContract.connect(signer);
      const tx = await contractFarmConnected.withdraw(amount);
      onPresentInfoModal({ message: 'Transaction Hash: ' + tx.hash });
      await tx.wait(1);
      onPresentInfoModal({ message: 'Done!' });

      setUnstakeAmount('');
      update(true);
    } catch (error) { console.error(error); }
  }

  const claimAllAction = async () => {
    try {
      await switchNetworkToBsc();

      const signer = library.getSigner();

      const contractFarmConnected = farmContract.connect(signer);
      const tx = await contractFarmConnected.deposit(0);
      onPresentInfoModal({ message: 'Transaction Hash: ' + tx.hash });
      await tx.wait(1);
      onPresentInfoModal({ message: 'Done!' });

      setStakeAmount('');
      update(true);
    } catch (error) {
      console.error(error);
      onPresentErrorModal(error);
    }
  }

  const bonusPool = props.data ? props.data['farm2_0x1_cosmo_eth_lp'] : {};
  return (
    <Farm
      title={t('Farm Symbol Staking', { symbol })}
      symbol={symbol}
      data={bonusPool}
      addLiquidityLink={addLiquidityLink}
      removeLiquidityLink={removeLiquidityLink}
      {...{
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

const mapStateToProps = (state) => {
  return {

    blockNumber: S.ethereum.getBlockNumber(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  hot(module)(FormEthFarmCosmoEth)
);

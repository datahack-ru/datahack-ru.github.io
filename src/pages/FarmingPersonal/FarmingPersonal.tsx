import React, { useState, useEffect, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Container, Icon, Divider, Grid, Popup, Segment, Button, Header, Tab,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import './FarmingPersonal.scss';
import Number from '../../components/Number';
import TimerBeforeRewards from '../../components/TimerBeforeRewards';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import FarmingHeader from '../../components/FarmingHeader';
import FarmingUauthenticated from '../../components/FarmingUauthenticated';
import { getRewardRateNext24hV2, getTotalFarmedToTimeV2, getTotalFarmedAtAllV2 } from '../../utils';
import { api } from '../../store/configureStore';
import * as S from '../../store/selectors';

import { ethers, utils, BigNumber } from 'ethers';
import BN from 'bignumber.js';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import AllReferralLevelsModal from '../../components/AllReferralLevelsModal';
import UpgradeReferralLevelModal from '../../components/UpgradeReferralLevelModal';
import ProgressHolderBonus from '../../components/ProgressHolderBonus';
import RoiModal from '../../components/RoiModal';


import {
  usdtBscAddress, cclpBscAddress,
  cclpBscUsdtPair, cclpBscStakingService,
} from '../../constants/index';


import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
//import { useWalletModal } from '../modal/WalletModal';
//import { useChangeNetworkModal } from '../modal/ChangeNetworkModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useInfoModal } from '../../modal/InfoModal';
//import { useTransactionSendedModal } from '../modal/TransactionSendedModal';
//import { useTransactionConfirmedModal } from '../modal/TransactionConfirmedModal';

import {
  switchNetworkToBscRequestData,
  POOL, getPoolShares,
  getCurrentTokenSupply,
  getRewardRateNext24h,
} from '../../utils';

import FarmAbi from '../../constants/abis/StakingService.json';
import Erc20Abi from '../../constants/abis/erc20.json';
import CclpAbi from '../../constants/abis/CCLP.json';


const stakingServiceAddress = cclpBscStakingService;
const lpTokenAddress = cclpBscUsdtPair;
const symbol = 'CCLP/USDT-LP';
const addLiquidityLink = `https://pancakeswap.finance/add/${cclpBscAddress}/${usdtBscAddress}`;
const removeLiquidityLink = `https://pancakeswap.finance/remove/${cclpBscAddress}/${usdtBscAddress}`;



const totalFarmedPoolPersonal = getTotalFarmedAtAllV2('personal');
const totalFarmedPoolTime = getTotalFarmedAtAllV2('time');


const getFarmRate = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  let rate = getRewardRateNext24h(timestamp, POOL.PRIMARY);
  return utils.formatUnits(rate, 18).toString();
}


const treeStatsInitData = {
  "earned": "0.000000000000000000",
  "timestamp": 0,
  "guid": null,
  "weakTeam": "",
  level: 'STARTER',
  parent: null,
  "root": { "staked": "0.000000000000000000", "stakedUsd": "0.000000000000000000", "nfts": 0, "farmed": "0.000000000000000000" },
  "left": { "staked": "0.000000000000000000", "stakedUsd": "0.000000000000000000", "nfts": 0, "farmed": "0.000000000000000000", "members": 0 },
  "right": { "staked": "0.000000000000000000", "stakedUsd": "0.000000000000000000", "nfts": 0, "farmed": "0.000000000000000000", "members": 0 },
};


interface IFarmingStatistics {
  guid: any,
  address: any,

  level: any,
  nfts: any,
  staked: any,
  stakedUsd: any,

  balance: any,

  poolRef: {
    earned: any,
    earnedToday: any,
    referrals: any,
  },

  poolTime: {
    days: any,
    earned: any,
    earnedToday: any,
  },

  poolTeam: {
    earned: any,
    earnedToday: any,
    members: any,
    weakTeam: any,
  },

  poolPersonal: {
    earned: any,
    earnedToday: any,
  },
}

const farmingStatisticsInitData = {
  guid: -1,
  address: '',

  level: 'STARTER',
  nfts: 0,
  staked: '0.000000000000000000',
  stakedUsd: '0.000000000000000000',

  balance: '0.000000000000000000',

  poolRef: {
    earned: '0.000000000000000000',
    earnedToday: '0.000000000000000000',
    referrals: 0,
  },

  poolTime: {
    days: 0,
    earned: '0.000000000000000000',
    earnedToday: '0.000000000000000000',
  },

  poolTeam: {
    earned: '0.000000000000000000',
    earnedToday: '0.000000000000000000',
    members: 0,
    weakTeam: '',
  },

  poolPersonal: {
    earned: '0.000000000000000000',
    earnedToday: '0.000000000000000000',
  },
};

const FarmingTeamPage: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  //const { onPresentConnectModal } = useWalletModal(login, logout);
  //const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();
  //const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  //const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();



  const isAuthenticated: any = useSelector(S.profile.isAuthenticated);
  const myRefId: any = useSelector(S.profile.getGuid);
  const timestamp = Math.floor(Date.now() / 1000);

  const [treeStats, setTreeStats] = useState(treeStatsInitData);
  const updateTreeStats = async () => {
    const res = await api.getV2Team(myRefId);
    if (res.ok)
      setTreeStats(res.result);
  }

  const [fStats, setFStats] = useState<IFarmingStatistics>(farmingStatisticsInitData);
  const updateFStats = async () => {
    try {
      const res = await api.getV2AllData();
      if (res.ok) {
        setFStats(res.result);
      } else {
        setFStats(farmingStatisticsInitData);
      }
    } catch (error) {
      setFStats(farmingStatisticsInitData);
    }
  }


  const isWsConnected: boolean = useSelector((state) => S.data.isWsConnected(state));
  const bscData: any = useSelector((state) => S.data.getBscData(state));
  const bscData2: any = useSelector((state) => S.binance.getBscData(state));

  let cclpPrice = '0';
  let cclpUsdtLpPrice = '0';
  let totalStakedAmount = '0';
  let cclpFarmTotalStakedBn = BigNumber.from(0);
  let cclpFarmTotalStakedInUsd = '0';
  let cclpFarmHistoricalRewardRateBn = BigNumber.from(0);
  // еще бы сравнивать номер блока для большей достоверности
  if (isWsConnected && bscData) {
    // данные с сервера
    cclpPrice = bscData.cclpPrice;
    cclpUsdtLpPrice = bscData.cclpUsdtLpPrice;
    totalStakedAmount = bscData.cclpFarmTotalStaked;
    cclpFarmTotalStakedBn = utils.parseUnits(bscData.cclpFarmTotalStaked, 18);
    cclpFarmTotalStakedInUsd = bscData.cclpFarmTotalStakedUsd;
    cclpFarmHistoricalRewardRateBn = utils.parseUnits(bscData.cclpFarmHistoricalRewardRate, 18);
  } else if (bscData2) {
    // данные из блокчейна которые собираются через браузер пользователя
    cclpPrice = bscData2.cclpPrice;
    totalStakedAmount = bscData2.cclpFarmTotalStaked;
    cclpUsdtLpPrice = bscData2.cclpUsdtLpPrice;
    cclpFarmTotalStakedBn = utils.parseUnits(bscData2.cclpFarmTotalStaked, 18);
    cclpFarmTotalStakedInUsd = bscData2.cclpFarmTotalStakedUsd;
    cclpFarmHistoricalRewardRateBn = utils.parseUnits(bscData2.cclpFarmHistoricalRewardRate, 18);
  }


  const availableForFarming = utils.formatEther(
    totalFarmedPoolPersonal.add(totalFarmedPoolTime).sub(getTotalFarmedToTimeV2(timestamp, 'personal')).sub(getTotalFarmedToTimeV2(timestamp, 'time'))
  );
  const poolRatePersonal = utils.formatEther(getRewardRateNext24hV2(timestamp, 'personal'));
  const poolRatePersonalInUsd = new BN(poolRatePersonal).multipliedBy(cclpPrice).toString();
  const poolRateTime = utils.formatEther(getRewardRateNext24hV2(timestamp, 'time'));
  const poolRateTimeInUsd = new BN(poolRateTime).multipliedBy(cclpPrice).toString();
  const poolRate = parseFloat(poolRatePersonal) + parseFloat(poolRateTime);
  const poolRateInUsd = new BN(poolRate).multipliedBy(cclpPrice).toString();







  const [updating, setUpdating] = useState(false);
  const blockNumber = useSelector((state) => S.binance.getBlockNumber(state));



  const [farmRate, setFarmRate] = useState(getFarmRate());
  const [myFarmShare, setMyFarmShare] = useState('0');
  const [myFarmRate, setMyFarmRate] = useState('0');


  const [stakedAmount, setStakedAmount] = useState('0');
  const [unstakedAmount, setUnstakedAmount] = useState('0');

  const [stakeAmount, setStakeAmount] = useState('0');
  const [unstakeAmount, setUnstakeAmount] = useState('0');


  const [stakingServiceContract, setFarmContract] = useState<any>();
  const [lpTokenContract, setLpTokenContract] = useState<any>();
  const [cclpTokenContract, setCclpTokenContract] = useState<any>();

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
      alert('Wrong network!');
      window.location.reload();
      if (library?.provider) {
        //await context3?.library.provider.request(switchNetworkToBscRequestData);
        window.location.reload();
      }
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




  const update2 = async () => {
    if (isAuthenticated) {
      updateTreeStats();
      updateFStats();
    }
  }

  useEffect(() => {
    try {
      update2();
    } catch (error) { console.error(error); }
  }, [time]);




  const totalPersonalFarmed = parseFloat(fStats.poolPersonal.earned);
  const totalPersonalFarmedInUsd = totalPersonalFarmed * parseFloat(cclpPrice);

  const totalTimeFarmed = parseFloat(fStats.poolTime.earned);
  const totalTimeFarmedInUsd = totalTimeFarmed * parseFloat(cclpPrice);

  const totalPersTimeFarmed = totalPersonalFarmed + totalTimeFarmed;
  const totalPersTimeFarmedInUsd = totalPersTimeFarmed * parseFloat(cclpPrice);




  const claimAllAction = async () => {
    try {
      await switchNetworkToBsc();

      const signer = library?.getSigner();

      const contractFarmConnected = stakingServiceContract.connect(signer);
      const tx = await contractFarmConnected.claimReward();
      toast.info(`'Claim CCLP' transaction pending...`);
      await tx.wait(1);
      toast.info(`'Claim CCLP' transaction done!`);

      setStakeAmount('');
      update();
    } catch (error) {
      console.error(error);
      onPresentErrorModal(error);
    }
  }


  const panes = [
    {
      menuItem: <Button content={t('Stake')} fluid primary={false} />,
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
    }, {
      menuItem: <Button content={t('Unstake')} fluid primary={false} />,
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
  ];

  /*if (!isAuthenticated)
    return (
      <Page title={t('Personal farming') + ' - ' + t('projectTitle')}>
        <div className={getAdaptiveClassName('farming-personal__header', isMobile)}>
          <Container>
            <FarmingHeader />
          </Container>
        </div>


        <div className={getAdaptiveClassName('farming-personal', isMobile)}>
          <FarmingUauthenticated />
        </div>
      </Page>
    );*/

  return (
    <Page title={t('Personal farming') + ' - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName('farming-personal__header', isMobile)}>
        <Container>
          <FarmingHeader />
        </Container>
      </div>


      <div className={getAdaptiveClassName('farming-personal', isMobile)}>
        <Container>
          <Grid relaxed style={{ color: 'black', }} stackable>
            <Grid.Column width={11}>
              <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                <Divider hidden fitted />
                <Grid relaxed columns={3} style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }} stackable>
                  <Grid.Column style={{ paddingLeft: '1.0rem', paddingRight: '0.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Header as='h3' style={{ color: 'black', fontSize: '38px', paddingLeft: '0.5rem', }} >
                      CCLP-LP <Popup
                        trigger={<Icon name='info circle' color='blue' size='mini' style={{ fontSize: '14px', lineHeight: '1px', }} />}
                        content={t('Add liquidity to CCLP-USDT pool to earn CCLP-LP')}
                      />
                    </Header>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0.25rem', paddingRight: '0.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('Total staked')}
                      <br /><b><Number value={cclpFarmTotalStakedInUsd} prefix='$' decimalScale={0} /></b>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0.25rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      <RoiModal />
                      <br /><br />
                    </Segment>
                  </Grid.Column>
                </Grid>
                <Divider />


                <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                  <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    {t('Unclaimed rewards')} <Popup
                      trigger={<Icon name='info circle' color='blue' />}
                      content={t('The amount of CCLP tokens you farmed from staking CCLP-LP as an individual effort. You can claim and withdraw them or reinvest again.')}
                    />
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                  </Grid.Column>
                </Grid>
                <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}><b><Number value={pendingReward} suffix={' CCLP'} decimalScale={0} /></b></span> ≈ <Number value={parseFloat(pendingReward) * parseFloat(cclpPrice)} prefix='$' decimalScale={2} />


                <Divider />
                <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                  <Grid.Column>
                    <Button content={t('Reinvest CCLP')} fluid color='green' disabled />
                  </Grid.Column>
                  <Grid.Column>
                    <Button content={t('Claim CCLP')} fluid primary onClick={claimAllAction} />
                  </Grid.Column>
                </Grid>
              </Segment>



              <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                <Header as='h3' content={t('Personal farming pools')} style={{ color: 'black', }} />

                <Divider hidden fitted />
                <Grid relaxed columns={3} style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }} stackable>
                  <Grid.Column style={{ paddingLeft: '1.0rem', paddingRight: '0.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('Available for farming')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP available for farming within a personal farming')}
                      /><br /><b><Number value={availableForFarming} suffix=' CCLP' decimalScale={0} /></b>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0.25rem', paddingRight: '0.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('Total pool rate')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP tokens allocated for a personal farming per day')}
                      /><br /><b><Number value={poolRate} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
                      <br /> ≈ <Number value={poolRateInUsd} prefix='$' decimalScale={2} />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0.25rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('My daily earnings')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The amount of CCLP tokens you receive as part of your daily personal farming rewards')}
                      /><br /><b><Number value={parseFloat(myFarmRate) * 1.2} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
                      <br /> ≈ <Number value={parseFloat(myFarmRate) * 1.2 * parseFloat(cclpPrice)} prefix='$' decimalScale={2} />
                    </Segment>
                  </Grid.Column>
                </Grid>


                <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Primary pool')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The main pool of yield farming managed by the smart contract. You receive rewards for adding assets to the liquidity pool and staking the pool tokens (CCLP-LP). Rewards are credited to your external wallet.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}><b><Number value={poolRatePersonal} suffix={' CCLP/' + t('day')} decimalScale={0} /></b></span> ≈ <Number value={poolRatePersonalInUsd} prefix='$' decimalScale={2} />

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('My pool rate')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The amount of CCLP tokens you receive as part of the daily pool allocation')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={myFarmRate} suffix={' CCLP/' + t('day')} decimalScale={2} /></b> ≈ <Number value={parseFloat(myFarmRate) * parseFloat(cclpPrice)} prefix='$' decimalScale={2} />
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('My pool share')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('Your share among all pool members')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '1.0rem', }} textAlign='right'>
                      <b><Number value={myFarmShare} suffix='%' decimalScale={4} /></b>
                    </Grid.Column>
                  </Grid>
                </Segment>


                <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Bonus pool')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP tokens distributed by the CosmoSwap business logic within a personal farming')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}><b><Number value={poolRateTime} suffix={' CCLP/' + t('day')} decimalScale={0} /></b></span> ≈ <Number value={poolRateTimeInUsd} prefix='$' decimalScale={2} />

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('My pool rate')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The amount of CCLP tokens you receive as part of the daily pool allocation')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={parseFloat(myFarmRate) * 0.2} suffix={' CCLP/' + t('day')} decimalScale={2} /></b> ≈ <Number value={parseFloat(myFarmRate) * 0.2 * parseFloat(cclpPrice)} prefix='$' decimalScale={2} />
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Holder bonus')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The holder bonus depends on the duration of staking of the CCLP-LP tokens and is increased your rate in the bonus pool')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '1.0rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>

                  <ProgressHolderBonus days={fStats.poolTime.days} />
                </Segment>
              </Segment>


              <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }} >
                <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Total pool tokens')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('CCLP-LP are the liquidity tokens provided for adding assets to a liquidity pool. CCLP-LP cannot be sold or withdrawn, but could be staked to earn more CCLP.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}>
                    <b><Number value={parseFloat(stakedAmount) + parseFloat(unstakedAmount)} suffix=' CCLP-LP' decimalScale={2} /></b>
                    <span style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>≈ <Number value={(parseFloat(stakedAmount) + parseFloat(unstakedAmount)) * parseFloat(cclpUsdtLpPrice)} prefix='$' decimalScale={2} /></span>
                  </span>

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Unstaked')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The amount of tokens that are not staked yet. You can either stake them or return to the liquidity pool to get your assets back from the swap.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={unstakedAmount} suffix={' CCLP-LP'} decimalScale={2} /></b>
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Staked')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The staked amount of liquidity tokens for which you get the farming reward.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={stakedAmount} suffix={' CCLP-LP'} decimalScale={2} /></b>
                    </Grid.Column>

                  </Grid>


                  <Divider />
                  <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }} >
                    <Grid columns={2}>
                      <Grid.Column width={10} style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '1rem' }} textAlign='left'>
                        <p>{t('Referral level')} <Popup
                          trigger={<Icon name='info circle' color='blue' />}
                          content={t('The referral level depends on the amount of USDT spent on CCLP-LP staking. You need to add assets to the liquidity pool and then stake the received pool tokens (CCLP-LP) in order to reach the next referral level.')}
                        /> <b>{fStats.level}</b></p>
                      </Grid.Column>
                      <Grid.Column width={6} style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                        <UpgradeReferralLevelModal
                          level={fStats.level}
                          nfts={fStats.nfts}
                          staked={fStats.staked}
                          stakedUsd={fStats.stakedUsd}
                        />
                      </Grid.Column>
                    </Grid>
                  </Segment>
                  <div style={{ textAlign: 'right' }}>
                    <AllReferralLevelsModal />
                  </div>
                </Segment>


                <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Total farmed')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP tokens earned within a personal farming of all time')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}>
                    <b><Number value={totalPersTimeFarmed} suffix={' CCLP'} decimalScale={0} /></b>
                  </span> ≈ <Number value={totalPersTimeFarmedInUsd} prefix='$' decimalScale={2} />

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Primary pool')}
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={totalPersonalFarmed} suffix={' CCLP'} decimalScale={2} /></b> ≈ <Number value={totalPersonalFarmedInUsd} prefix='$' decimalScale={2} />
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Bonus pool')}
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={totalTimeFarmed} suffix={' CCLP'} decimalScale={2} /></b> ≈ <Number value={totalTimeFarmedInUsd} prefix='$' decimalScale={2} />
                    </Grid.Column>
                  </Grid>
                </Segment>

              </Segment>

            </Grid.Column>


            <Grid.Column width={5}>
              {/*
              <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                <Grid relaxed columns={2} style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                  <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1.0rem', paddingBottom: '1.0rem', }}>
                    {t('Staking')}
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1.0rem', paddingBottom: '1.0rem', }} textAlign='right'>
                  </Grid.Column>
                </Grid>
                <Divider />



                <Tab menu={{ attached: false }} panes={panes} />
              </Segment>
              */}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </Page >
  );
};


export default hot(module)(FarmingTeamPage);

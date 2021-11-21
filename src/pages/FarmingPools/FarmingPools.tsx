import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Container, Accordion, Icon, Divider, Grid, Popup, Segment, Button,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import './FarmingPools.scss';
import Number from '../../components/Number';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import FarmingHeader from '../../components/FarmingHeader';

import { api } from '../../store/configureStore';
import * as S from '../../store/selectors';
import {
  cclpBscUsdtPair, cclpBscAddress, usdtBscAddress, cclpBscStakingService,
} from '../../constants/index';



import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useChangeNetworkModal } from '../../modal/ChangeNetworkModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useInfoModal } from '../../modal/InfoModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';
import { ethers, utils } from 'ethers';


import FarmAbi from '../../constants/abis/StakingService.json';
import Erc20Abi from '../../constants/abis/erc20.json';

const stakingServiceAddress = cclpBscStakingService;
const lpTokenAddress = cclpBscUsdtPair;


const LiquidityPoolCclpUsdtLp = () => {
  const [activeStatus, setActive] = useState(true);
  const handleClick = () => {
    setActive(!activeStatus);
  }

  const { t } = useTranslation();


  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  /*
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();
  */

  const [lpTokenContract, setLpTokenContract] = useState<any>();
  if (!lpTokenContract && library) setLpTokenContract(new ethers.Contract(
    lpTokenAddress, Erc20Abi, library,  //api.bscProvider,
  ));

  const [stakingServiceContract, setFarmContract] = useState<any>();
  if (!stakingServiceContract) setFarmContract(new ethers.Contract(
    stakingServiceAddress, FarmAbi, api.bscProvider
  ));

  const bscBlockNumber: number = useSelector((state) => S.binance.getBlockNumber(state));
  const [updating2, setUpdating2] = useState(false);

  const [myLpTokensStaked, setMyLpTokensStaked] = useState('0');
  const [myLpTokens, setMyLpTokens] = useState('0');
  const update = async () => {
    if (lpTokenContract && account) {
      const balance = await lpTokenContract.balanceOf(account);
      setMyLpTokens(utils.formatUnits(balance, 18).toString());
    }
    if (stakingServiceContract) {
      try {
        const data2 = await stakingServiceContract.stakers(account);

        // update stakedAmount
        const amount = utils.formatUnits(data2.amount, 18).toString();
        setMyLpTokensStaked(amount);
      } catch (error) { }
    }
  }

  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    try {
      update();
    } catch (error) { console.error(error); }
    setUpdating2(false);
  }, [bscBlockNumber]);

  useEffect(() => {
    try {
      update();
    } catch (error) { console.error(error); }
  }, []);


  const isWsConnected: boolean = useSelector((state) => S.data.isWsConnected(state));
  const bscData: any = useSelector((state) => S.data.getBscData(state));
  const bscData2: any = useSelector((state) => S.binance.getBscData(state));

  let cclpPrice = '0';
  let cclpUsdtTotalLiquidity = '0';
  let cclpUsdtLpPrice = '0';
  let cclpUsdtLpTotalSupply = '0';
  let cclpUsdtReserves = { usdt: '0', cclp: '0', };

  // еще бы сравнивать номер блока для большей достоверности
  if (isWsConnected && bscData) {
    // данные с сервера
    cclpPrice = bscData.cclpPrice;
    cclpUsdtTotalLiquidity = bscData.cclpUsdtTotalLiquidity;
    cclpUsdtLpPrice = bscData.cclpUsdtLpPrice;
    cclpUsdtLpTotalSupply = bscData.cclpUsdtLpTotalSupply;
    cclpUsdtReserves = bscData.cclpUsdtReserves;
  } else if (bscData2) {
    // данные из блокчейна которые собираются через браузер пользователя
    cclpPrice = bscData2.cclpPrice;
    cclpUsdtTotalLiquidity = bscData2.cclpUsdtTotalLiquidity;
    cclpUsdtLpPrice = bscData.cclpUsdtLpPrice;
    cclpUsdtLpTotalSupply = bscData.cclpUsdtLpTotalSupply;
    cclpUsdtReserves = bscData.cclpUsdtReserves;
  }

  let myLpTokensTotal = (parseFloat(myLpTokens) + parseFloat(myLpTokensStaked));
  let myPoolShare = (myLpTokensTotal / parseFloat(cclpUsdtLpTotalSupply)) * 100;
  let myLpTokensPrice = myLpTokensTotal * parseFloat(cclpUsdtLpPrice);

  let myPooledCclp = myPoolShare * parseFloat(cclpUsdtReserves.cclp) / 100;
  let myPooledUsdt = myPoolShare * parseFloat(cclpUsdtReserves.usdt) / 100;

  return (
    <Accordion styled fluid>
      <Accordion.Title
        active={activeStatus}
        index={0}
        onClick={handleClick}
      >
        <Icon name='dropdown' />
        CCLP-USDT
      </Accordion.Title>
      <Divider fitted style={{ margin: '0' }} />

      <Accordion.Content active={activeStatus}>
        <Grid.Column width={10}>
          <Grid relaxed columns={3} style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }} stackable>
            <Grid.Column>
              <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                {t('Total liquidity')} <Popup
                  trigger={<Icon name='info circle' color='blue' />}
                  content={t('Total liquidity in the CCLP-USDT pool on PancakeSwap')}
                /> <b><Number value={cclpUsdtTotalLiquidity} prefix='$' decimalScale={2} /></b>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                1 CCLP = <b><Number value={cclpPrice} suffix=' USDT' decimalScale={12} /></b>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                1 USDT = <b><Number value={1 / parseFloat(cclpPrice)} suffix=' CCLP' decimalScale={2} /></b>
              </Segment>
            </Grid.Column>
          </Grid>

          <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
            <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('My pool tokens')} <Popup
                  trigger={<Icon name='info circle' color='blue' />}
                  content={t('CCLP-LP are the liquidity tokens provided for adding assets to a liquidity pool. CCLP-LP cannot be sold or withdrawn, but could be staked to earn more CCLP.')}
                />
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
              </Grid.Column>
            </Grid>
            <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}><b><Number value={myLpTokensTotal} suffix=' CCLP-LP' decimalScale={2} /></b></span> ≈ <Number value={myLpTokensPrice} prefix='$' decimalScale={2} />

            <Divider />
            <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('My pooled CCLP')}
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                <b><Number value={myPooledCclp} suffix=' CCLP' decimalScale={2} /></b>
              </Grid.Column>

              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('My pooled USDT')}
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                <b><Number value={myPooledUsdt} suffix=' USDT' decimalScale={2} /></b>
              </Grid.Column>

              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('My pool share')}
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '1.0rem', }} textAlign='right'>
                <b><Number value={myPoolShare} suffix='%' decimalScale={4} /></b>
              </Grid.Column>
            </Grid>
          </Segment>

          <Divider />
          <Grid relaxed columns={5} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }} stackable>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', }}>
              {t('Pair address')} <Popup
                trigger={<Icon name='info circle' color='blue' />}
                content={t('The address location of the actual CCLP-LP contract that manages the logic for the tokens.') + ' ' + t('It does not refer to the address that holds your own personal assets.')}
              />
              <br /><a
                {...getExternalLinkProps()}
                href={'https://bscscan.com/address/' + cclpBscUsdtPair}
              >0x7e54…BeF9</a>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.0rem', paddingRight: '1.0rem', }}>
              CCLP {t('address')} <Popup
                trigger={<Icon name='info circle' color='blue' />}
                content={t('The address location of the actual CCLP contract that manages the logic for the tokens.') + ' ' + t('It does not refer to the address that holds your own personal assets.')}
              />
              <br /><a
                {...getExternalLinkProps()}
                href={'https://bscscan.com/token/' + cclpBscAddress}
              >0x55ec…1878</a>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.0rem', paddingRight: '1.0rem', }}>
              USDT {t('address')} <Popup
                trigger={<Icon name='info circle' color='blue' />}
                content={t('The address location of the actual USDT contract that manages the logic for the tokens.') + ' ' + t('It does not refer to the address that holds your own personal assets.')}
              />
              <br /><a
                {...getExternalLinkProps()}
                href={'https://bscscan.com/token/' + usdtBscAddress}
              >0x55D3…7955</a>
            </Grid.Column>
            <Grid.Column width={6} style={{ paddingLeft: '1.0rem', paddingRight: '1.5rem', }}>
              <a
                {...getExternalLinkProps()}
                href={'https://pancakeswap.finance/info/pair/' + cclpBscUsdtPair}
              >{t('View analytics on PancakeSwap')} <Icon name='external' /></a>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Accordion.Content>
    </Accordion >
  );
}


const FarmingPoolsPage: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <Page title={t('Liquidity pools') + ' - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName('farming__header', isMobile)}>
        <Container>
          <FarmingHeader />
        </Container>
      </div>

      <div className={getAdaptiveClassName('farming', isMobile)}>
        <Container>
          <Grid relaxed style={{ color: 'black', }} stackable>
            <Grid.Column width={11}>
              <LiquidityPoolCclpUsdtLp />
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                {t('Liquidity')}
                <Divider />

                <Button
                  content={t('Add')} fluid color='green'
                  as='a'
                  {...getExternalLinkProps()}
                  href={`https://pancakeswap.finance/add/${usdtBscAddress}/${cclpBscAddress}`}
                />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Button
                  content={t('Remove')} fluid color='red'
                  as='a'
                  {...getExternalLinkProps()}
                  href={`https://pancakeswap.finance/remove/${usdtBscAddress}/${cclpBscAddress}`}
                />

                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <Divider hidden fitted />
                <a
                  style={{ fontSize: '12px', lineHeight: '18px', }}
                  {...getExternalLinkProps()}
                  href={`https://pancakeswap.finance/add/${usdtBscAddress}/${cclpBscAddress}`}
                >{t('Go to PancakeSwap')} <Icon name='external' /></a>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </Page >
  );
};


export default hot(module)(FarmingPoolsPage);

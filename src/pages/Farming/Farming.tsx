import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Header,
  Container,
  Image,
  Button,
  Input,
  Select,
  Grid,
  Tab,
  Divider,
  Table,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import './Farming.scss';
import Number from '../../components/Number';
import * as S from '../../store/selectors';
import FormBscFarmV3Cclp from '../../components/FormBscFarmV3Cclp';


import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useChangeNetworkModal } from '../../modal/ChangeNetworkModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useInfoModal } from '../../modal/InfoModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import { ethers, utils } from 'ethers';


import CosmoCupLpMinterAbi from '../../constants/abis/CosmoCupLpMinter.json';
import Erc20Abi from '../../constants/abis/erc20.json';
import {
  CosmoCupLpMinter, uniswapV2CosmoCupLpAddress,
} from '../../constants/index';
import { api } from '../../store/configureStore';
import PriceChart from '../../components/PriceChart';
import FarmingHeader from '../../components/FarmingHeader';
//import FarmingReferralsTree from '../FarmingReferralsTree';

import { toast } from 'react-toastify';

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

interface IState {
  chainId: number | undefined,
  amount: string,
}

const FarmingPage: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();


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

  const claimCclp = async () => {
    try {
      const res = await api.getV2ClaimCclp();
      if (res.ok) {
        alert('Done');
      } else {
        alert(res.error.message);
      }
    } catch (error) {
      alert(error);
    }
  }



  const bscBlockNumber: number = useSelector((state) => S.binance.getBlockNumber(state));
  const [updating2, setUpdating2] = useState(false);
  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    try {
    } catch (error) { console.error(error); }
    setUpdating2(false);
  }, [bscBlockNumber]);

  useEffect(() => {
    updateFStats();
    if (updating2) return;
    setUpdating2(true);
    try {
    } catch (error) { console.error(error); }
    setUpdating2(false);
  }, []);




  const [state, setState] = useState<IState>({
    chainId: -1,
    amount: '0',
  });

  useEffect(() => {
    if (state.chainId !== chainId) {
      setState({ ...state, chainId });
    }
  }, [chainId]);

  const handleChange = (e: any, { name, value }: any) => {
    if (name === 'token')
      setState({ ...state, [name]: value, amount: '0' });
    else
      setState({ ...state, [name]: value, });
  }


  const handleSubmit = async () => {
    if (!library) {
      toast.error('Wrong connection');
      return;
    }

    try {
      if (state.chainId !== 1) {
        toast.error('Wrong network!');
        return;
      }

      let amount = utils.parseUnits(state.amount, 18);

      const contractToken = new ethers.Contract(
        uniswapV2CosmoCupLpAddress, Erc20Abi, library
      );

      const signer = library?.getSigner();
      const contractTokenConnected = contractToken.connect(signer);

      const owner = await signer.getAddress();
      const allowance = await contractToken.allowance(owner, CosmoCupLpMinter);

      if (allowance.lte(amount)) {
        const approveTx = await contractTokenConnected.approve(
          CosmoCupLpMinter,
          ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        );
        toast.info('Waiting for token spend limit approving');
        await approveTx.wait(1);
        toast.info('Approving done!');
      }

      const contract = new ethers.Contract(
        CosmoCupLpMinter, CosmoCupLpMinterAbi, library
      );

      const contractConnected = contract.connect(library?.getSigner());
      let TransactionResponse = await contractConnected.mint(amount);
      toast.info('Transaction pending...');
      const TransactionReceipt = await TransactionResponse.wait(1);
      toast.info('Transaction done!');
    } catch (error) {
      onPresentErrorModal(error);
    }
  }

  const setMaxAmount = async () => {
    if (!library || !state.chainId) return;
    const contractToken = new ethers.Contract(
      uniswapV2CosmoCupLpAddress, Erc20Abi, library
    );
    let amount = await contractToken.balanceOf(account);
    amount = utils.formatEther(amount);
    setState({ ...state, amount, });
  }


  const panes = [
    {
      menuItem: <Button color='green'>Add COSMO/CUP Liquidity</Button>,
      render: () => <Tab.Pane attached={false}>
        <Button
          color='green'
          as='a' {...getExternalLinkProps()}
          href={'https://app.uniswap.org/#/add/v2/0x27cd7375478F189bdcF55616b088BE03d9c4339c/0x1faDbb8D7c2D84DAad1c6f52f92480ceF8c96024'}
        >Add liquidity (Uniswap)</Button>
      </Tab.Pane>,
    },
    {
      menuItem: <Button color='green'>Mint CCLP</Button>,
      render: () => <Tab.Pane attached={false}>
        <Input
          required
          id='amount' name='amount'
          type='number' min='0'
          placeholder='123.4567'
          value={state.amount}
          onChange={handleChange}
          action={
            <Button color='green' onClick={setMaxAmount}>{'\u00A0'}Max{'\u00A0'}</Button>
          }
        />
        <br /><br />
        {
          triedEager && active && account
            ? <Button color='green' fluid
              onClick={handleSubmit}
            >Mint CCLP</Button>
            : <Button color='green' fluid
              onClick={onPresentConnectModal}
            >Mint CCLP</Button>
        }
      </Tab.Pane>,
    },
    {
      menuItem: <Button color='blue'>Swap</Button>,
      render: () => <Tab.Pane attached={false}>
        <Button
          color='blue'
          as='a' {...getExternalLinkProps()}
          href={'https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x55ece1750677AF5FcCbf0F05b52169946c371878'}
        >Swap (PancakeSwap)</Button>
      </Tab.Pane>,
    },
  ];

  return (
    <Page title={t('Farming') + ' - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName('farming__header', isMobile)}>
        <Container>
          <FarmingHeader />
        </Container>
      </div>

      <div className={getAdaptiveClassName('farming', isMobile)}>
        <Container>
          {/* <PriceChart /> */}
          <Grid textAlign='center'>
            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmV3Cclp />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>

              <Tab
                style={{ color: 'black' }}
                menu={{ secondary: true, pointing: true }}
                panes={panes}
              />
            </Grid.Column>
          </Grid>

          <br />
          <Divider />
          <div>
            <Container>

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>My personal farming statistics  <Button onClick={updateFStats} content='Update' size='mini' color='green' /></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Staked in USD</Table.Cell>
                    <Table.Cell><Number value={fStats.stakedUsd} suffix=' USD' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Staked CCLP-LP</Table.Cell>
                    <Table.Cell><Number value={fStats.staked} suffix=' CCLP-LP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>NFT</Table.Cell>
                    <Table.Cell><Number value={fStats.nfts} decimalScale={0} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Referral level</Table.Cell>
                    <Table.Cell>{fStats.level}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Balance</Table.Cell>
                    <Table.Cell><Number value={fStats.balance} suffix=' CCLP' decimalScale={2} /> <Button onClick={claimCclp} content='Claim' size='mini' color='green' /></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>


              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>Total farmed</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Primary pool</Table.Cell>
                    <Table.Cell><Number value={fStats.poolPersonal.earned} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Bonus pool</Table.Cell>
                    <Table.Cell><Number value={fStats.poolTime.earned} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Team farming</Table.Cell>
                    <Table.Cell><Number value={fStats.poolTeam.earned} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Team members</Table.Cell>
                    <Table.Cell><Number value={fStats.poolTeam.members} decimalScale={0} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Referral farming</Table.Cell>
                    <Table.Cell><Number value={fStats.poolRef.earned} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Direct referrals</Table.Cell>
                    <Table.Cell><Number value={fStats.poolRef.referrals} decimalScale={0} /></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>


              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='2'>My next rewards</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Bonus pool</Table.Cell>
                    <Table.Cell><Number value={fStats.poolTime.earnedToday} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Team farming</Table.Cell>
                    <Table.Cell><Number value={fStats.poolTeam.earnedToday} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Referral farming</Table.Cell>
                    <Table.Cell><Number value={fStats.poolRef.earnedToday} suffix=' CCLP' decimalScale={2} /></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Container>
          </div>
        </Container>
      </div>
    </Page>
  );
};


export default hot(module)(FarmingPage);

import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Container,
  Table,
  Grid,
  Button,
  Progress,
  Accordion,
  Message,
  Icon,
} from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { Link } from 'react-router-dom';
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import Number from "../../components/Number";
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import "./Dashboard.scss";



interface IFarmingStatistics {
  guid: any,
  address: any,

  level: any,
  nfts: any,
  staked: any,
  stakedUsd: any,
  isFixedLevel: any,
  cmpStaked: any,

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
  isFixedLevel: false,
  cmpStaked: '0.000000000000000000',

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



const WalletTable = ({
  isAuthenticated,
  data,
  balanceWithdrawAllCosmo,
  //handleClick,
  fStats,
}: any) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard__panel">
      <Accordion>
        <Accordion.Title
          active={false}
          index={0}
        //onClick={handleClick}
        >
          <div className="dashboard__panel-content">
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={10} textAlign='left'>
                  <h3><Icon name='dropdown' /> {t('CosmoSwap Wallet')}</h3>
                </Grid.Column>
                <Grid.Column mobile={6} textAlign='right'>
                  {isAuthenticated
                    ? null //<Button as={Link} to={'/wallet'}>{t('Open Wallet')}</Button>
                    : <Button as={Link} to={'/signin'}>{t('Sign In')}</Button>
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid>
              <Grid.Row>
                <Grid.Column mobile={8} textAlign='left'><b>{t('Balance')}:</b></Grid.Column>
                <Grid.Column mobile={8} textAlign='right'>
                  <b><Number value={fStats.balance} suffix={' CCLP'} decimalScale={0} fixedDecimalScale /></b>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={8} textAlign='left'></Grid.Column>
                <Grid.Column mobile={8} textAlign='right'>
                  <b><Number value={data.balance} suffix={' COSMO'} decimalScale={0} fixedDecimalScale /></b>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={16} textAlign='center'>
                  <Button
                    compact fluid
                    disabled={!isAuthenticated}
                    onClick={balanceWithdrawAllCosmo}
                  >{t('Withdraw all')}</Button>
                  <p>
                    {t('minimumWithdrawFee', { amount: '10,000,000,000', fee: '0.001 BNB' })}
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Accordion.Title>
        <Accordion.Content active={false}>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}


function getNextRefLevelCmp(cmpStaked = 0) {
  if (cmpStaked >= 10000) return 50000;
  else if (cmpStaked >= 3000) return 10000;
  else if (cmpStaked >= 500) return 3000;
  else if (cmpStaked >= 50) return 500;
  else return 50;
}
function getNextRefLevelCmpName(cmpStaked = 0) {
  if (cmpStaked >= 10000) return 'MAX';
  else if (cmpStaked >= 3000) return 'ELITE';
  else if (cmpStaked >= 500) return 'VIP';
  else if (cmpStaked >= 50) return 'PRO';
  else return 'PARTNER';
}
function getCurrentRefLevelCmpName(cmpStaked = 0) {
  if (cmpStaked >= 50000) return 'MAX';
  else if (cmpStaked >= 10000) return 'ELITE';
  else if (cmpStaked >= 3000) return 'VIP';
  else if (cmpStaked >= 500) return 'PRO';
  else if (cmpStaked >= 50) return 'PARTNER';
  else return 'STARTER';
}



function getNextRefLevelNfts(masksOwned = 0) {
  if (masksOwned >= 3) return 5;
  else if (masksOwned >= 1) return 3;
  else return 1;
}
function getNextRefLevelNftsName(masksOwned = 0) {
  if (masksOwned >= 3) return 'MAX';
  else if (masksOwned >= 1) return 'ELITE';
  else return 'VIP';
}
function getCurrentRefLevelNftsName(masksOwned = 0) {
  if (masksOwned >= 5) return 'MAX';
  else if (masksOwned >= 3) return 'ELITE';
  else if (masksOwned >= 1) return 'VIP';
  else return 'STARTER';
}

const dataInit = {
  level: 'STARTER',
  cmpStaked: '0.0',
  cmpStakedFloat: 0,
  masksOwned: 0,
  address: null,
}

const RefLevelTable = ({
  isAuthenticated,
  data,
  handleClick,
  activeIndex,
  fStats,
}: any) => {
  const { t } = useTranslation();
  const stakedUsd = parseFloat(fStats.stakedUsd);
  const stakedCmp = parseFloat(fStats.cmpStaked);
  const stakedUsdPlusOld = stakedUsd + stakedCmp;

  const currentCmpName = getCurrentRefLevelCmpName(stakedUsdPlusOld);
  const nextCmp = getNextRefLevelCmp(stakedUsdPlusOld);
  const nextCmpName = getNextRefLevelCmpName(stakedUsdPlusOld);

  const currentNftsName = getCurrentRefLevelNftsName(parseFloat(fStats.nfts));
  const nextNfts = getNextRefLevelNfts(parseFloat(fStats.nfts));
  const nextNftsName = getNextRefLevelNftsName(parseFloat(fStats.nfts));
  console.log(parseFloat(fStats.nfts))

  const index = 0;
  return (
    <div className="dashboard__panel">
      <Accordion>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={handleClick}
        >
          <div className="dashboard__panel-header">
            <h3><Icon name='dropdown' />{t('Referral level')}</h3>
            {isAuthenticated
              ? <Button>{fStats.level}</Button>
              : <Button as={Link} to={'/signin'}>{t('Sign In')}</Button>
            }
          </div>

          <div className="dashboard__panel-content">
            <Grid columns="equal" className="pt-1">
              <Grid.Column>{currentCmpName}</Grid.Column>
              <Grid.Column textAlign="right">{nextCmpName}</Grid.Column>
            </Grid>
            <Progress value={3} total={100} size="tiny">
              {stakedCmp > 0
                ? <span>
                  <Number
                    value={stakedUsdPlusOld} decimalScale={0} fixedDecimalScale={true}
                  /> (<Number
                    value={stakedUsd} decimalScale={0} fixedDecimalScale={true} suffix=' USD'
                  /> + <Number
                    value={stakedCmp} decimalScale={0} fixedDecimalScale={true} suffix=' CMP'
                  />)
                </span>
                : <Number
                  value={stakedUsdPlusOld} decimalScale={0} fixedDecimalScale={true}
                />
              }/<Number
                value={nextCmp} decimalScale={0} fixedDecimalScale={true}
              /> USD
            </Progress>

            <Grid columns="equal">
              <Grid.Column>{currentNftsName}</Grid.Column>
              <Grid.Column textAlign="right">{nextNftsName}</Grid.Column>
            </Grid>
            <Progress value={3} total={100} size="tiny">
              {fStats.nfts}/{nextNfts} CosmoFound NFTs
            </Progress>
            <br />
          </div>
        </Accordion.Title>

        <Accordion.Content active={activeIndex === index}>
          <Table celled padded compact unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t('Referral levels')}</Table.HeaderCell>
                <Table.HeaderCell>STARTER</Table.HeaderCell>
                <Table.HeaderCell>PARTNER</Table.HeaderCell>
                <Table.HeaderCell>PRO</Table.HeaderCell>
                <Table.HeaderCell>VIP</Table.HeaderCell>
                <Table.HeaderCell>ELITE</Table.HeaderCell>
                <Table.HeaderCell>MAX</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>USD</Table.Cell>
                <Table.Cell textAlign="center">0</Table.Cell>
                <Table.Cell>50</Table.Cell>
                <Table.Cell>500</Table.Cell>
                <Table.Cell>3,000</Table.Cell>
                <Table.Cell>10,000</Table.Cell>
                <Table.Cell>50,000</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>CosmoFund NFTs</Table.Cell>
                <Table.Cell textAlign="center">-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>5</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="separator" colSpan={7}>
                  {t('Farming rewards')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{t('Referral farming reward')}</Table.Cell>
                <Table.Cell>0%</Table.Cell>
                <Table.Cell>5%</Table.Cell>
                <Table.Cell>8%</Table.Cell>
                <Table.Cell>10%</Table.Cell>
                <Table.Cell>15%</Table.Cell>
                <Table.Cell>20%</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{t('Team farming reward')}</Table.Cell>
                <Table.Cell>0%</Table.Cell>
                <Table.Cell>+5%</Table.Cell>
                <Table.Cell>+8%</Table.Cell>
                <Table.Cell>+10%</Table.Cell>
                <Table.Cell>+15%</Table.Cell>
                <Table.Cell>+20%</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Accordion.Content>
      </Accordion>
    </div >
  );
}




const Dashboard: React.FC<any> = ({ isAuthenticated }) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();


  const [state, setState] = useState({ activeIndex: -1, balance: '0', });
  const { activeIndex, balance, } = state;

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ ...state, activeIndex: newIndex });
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


  const balanceWithdrawAllCosmo = async () => {
    claimCclp();
    if (parseFloat(balance) < 10 * 1000000000)
      return alert('Insufficient funds. Too high fees. Minimum 10,000,000,000 COSMO');
    try {
      const res = await api.balanceWithdrawAllCosmo();
      if (res.ok) alert('Withdrawal has been accepted. Please wait.');
      else alert(res.error.message);
    } catch (error) { console.error(error); }
  }




  const update = async () => {
    if (isAuthenticated) {
      try {
        updateFStats();
        const res = await api.getBalanceCosmo();
        //console.log(res.result)
        if (res.ok) setState({ ...state, ...res.result, });
        else setState({ ...state, ...{ balance: '0' } });
      } catch (error) { console.error(error); }
    }
  }

  const [state2, setState2] = useState(dataInit);
  const update2 = async () => {
    if (isAuthenticated) {
      try {
        const res = await api.getProfileRefLevelData();
        if (res.ok) setState2({ ...res.result, });
        else setState2(dataInit);
      } catch (error) { console.error(error); }
    }
  }

  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 60 * 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    try {
      update();
      update2();
    } catch (error) { console.error(error); }
  }, [time]);

  return (
    <Page title={`${t('Dashboard')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("dashboard__header", isMobile)}>
        <Container>
          <Header as="h1" content={t('Dashboard')} className="shadow" style={{ color: '#ffae00' }} />
        </Container>
      </div>

      <div className={getAdaptiveClassName("dashboard", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <RefLevelTable
                isAuthenticated={isAuthenticated}
                handleClick={handleClick}
                activeIndex={activeIndex}
                data={state2}
                fStats={fStats}
              />
            </Grid.Column>

            <Grid.Column>
              <WalletTable
                isAuthenticated={isAuthenticated}
                data={state}
                balanceWithdrawAllCosmo={balanceWithdrawAllCosmo}
                fStats={fStats}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </Page>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
    //myWallet: S.wallet.getAccount(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Dashboard));

import React, { useState, useEffect, useCallback, } from "react";
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';
import Number from '../../components/Number';
import { useTranslation } from 'react-i18next';
import { Header, Container, Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import ReferralLink from "./components/ReferralLink/ReferralLink";
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import "./MyReferrals.scss";




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

const MyReferrals: React.FC<any> = () => {
  const myGuid = useSelector((state) => S.profile.getGuid(state));

  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();



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

  const update = () => {
    updateFStats();
  }

  useEffect(() => {
    update();
  }, []);


  return (
    <Page title={t('Referral program')}>
      <div className={getAdaptiveClassName("referrals__header", isMobile)}>
        <Container>
          <ReferralLink />
          <Header as="h1" content={t('Referral program')} className="shadow" style={{ color: '#ffae00' }} />
          <p>
            {t('We introduce a unique farming model where only you chooce whether to stake alone or with a team')}
          </p>
        </Container>
      </div>

      <div className={getAdaptiveClassName("referrals", isMobile)}>
        <Container>
          <div className="referrals__menu">
            <Link to={"/my/referrals"}>{t('My statistics')}</Link>
            <Link to={"/my/referrals/tree"}>{t('My referral tree')}</Link>
          </div>

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
    </Page >
  );
};


export default hot(module)(MyReferrals);

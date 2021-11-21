import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Container, Accordion, Icon, Divider, Grid, Popup, Segment,
  Button, Image, Input, Label, Modal, Header, Table, Select,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Page from '../../components/Page';
import './FarmingTeam.scss';
import Number from '../../components/Number';
import TimerBeforeRewards from '../../components/TimerBeforeRewards';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import FarmingHeader from '../../components/FarmingHeader';
import FarmingUauthenticated from '../../components/FarmingUauthenticated';
import { getRewardRateNext24hV2, getTotalFarmedToTimeV2, getTotalFarmedAtAllV2 } from '../../utils';
import { api } from '../../store/configureStore';
import * as S from '../../store/selectors';
import BN from 'bignumber.js';

import { ethers, utils } from 'ethers';


import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import AllReferralLevelsModal from '../../components/AllReferralLevelsModal';
import UpgradeReferralLevelModal from '../../components/UpgradeReferralLevelModal';


const totalFarmedPoolTeam = getTotalFarmedAtAllV2('team');



const ReferralLinkQrModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const myRefId: any = useSelector(S.profile.getGuid);
  const referralLink = `https://${window.location.hostname}/?r=${myRefId}`;

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'mini'}
      //closeIcon={true}
      trigger={
        <Popup
          trigger={<Button icon style={{ background: '#cae8fa', }} onClick={() => setOpen(!open)}><Icon name='qrcode' /></Button>}
          content={t('Show QR code')}
        />
      }
    >
      <Modal.Header>{t('Referral link')}</Modal.Header>
      <Modal.Content image >
        <div style={{ marginLeft: 'auto', marginRight: 'auto', }}>
          <QRCode value={referralLink} />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} positive>{t('Close')}</Button>
        {/*<Button onClick={() => setOpen(false)} primary>{t('Download')}</Button>*/}
      </Modal.Actions>
    </Modal >
  )
}

const ReferralLink = () => {
  const { t } = useTranslation();

  const myRefId: any = useSelector(S.profile.getGuid);
  const referralLink = `https://${window.location.hostname}/?r=${myRefId}`;

  const onClick = () => {
    copy(referralLink);
    toast.success(t('Copied to clipboard'));
  }

  return (
    <div>
      <Input
        fluid
        placeholder='CosmoSwap referral link'
        value={referralLink}
        readonly
        iconPosition='left'
      >
        <Icon name='sitemap' style={{ color: '#132344' }} />
        <input />
        <Button as='div' labelPosition='right' >
          <Popup
            trigger={<Button icon style={{ background: '#cae8fa', }} onClick={onClick}><Icon name='copy outline' /></Button>}
            content={t('Copy to clipboard')}
          />

          <ReferralLinkQrModal />

          {/** TODO выпадающее меню со скриптами для соцсетей
          <Button icon style={{ background: '#cae8fa', }} >
            <Icon name='share alternate' />
          </Button>
           */}
        </Button>
      </Input>
    </div>
  );
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
  // еще бы сравнивать номер блока для большей достоверности
  if (isWsConnected && bscData) {
    // данные с сервера
    cclpPrice = bscData.cclpPrice;
  } else if (bscData2) {
    // данные из блокчейна которые собираются через браузер пользователя
    cclpPrice = bscData2.cclpPrice;
  }

  const members = treeStats.left.members + treeStats.right.members;

  const teamStakedUsd = parseFloat(treeStats.left.stakedUsd) + parseFloat(treeStats.right.stakedUsd);
  const teamStakedLp = parseFloat(treeStats.left.staked) + parseFloat(treeStats.right.staked);
  const teamStakedNft = treeStats.left.nfts + treeStats.right.nfts;

  const availableForFarming = utils.formatEther(
    totalFarmedPoolTeam.sub(getTotalFarmedToTimeV2(timestamp, 'team'))
  );
  const poolRate = utils.formatEther(getRewardRateNext24hV2(timestamp, 'team'));
  const poolRateInUsd = new BN(poolRate).multipliedBy(cclpPrice).toString();

  const nextTeamReward = fStats.poolTeam.earnedToday;
  const nextTeamRewardInUsd = new BN(nextTeamReward).multipliedBy(cclpPrice).toString();
  const nextRefReward = fStats.poolRef.earnedToday;
  const nextRefRewardInUsd = new BN(nextRefReward).multipliedBy(cclpPrice).toString();
  const nextReward = parseFloat(nextTeamReward) + parseFloat(nextRefReward);
  const nextRewardInUsd = new BN(nextReward).multipliedBy(cclpPrice).toString();

  const totalTeamReward = fStats.poolTeam.earned;
  const totalRefReward = fStats.poolRef.earned;
  const totalReward = new BN(totalTeamReward).plus(totalRefReward).toString();


  const update = async () => {
    if (isAuthenticated) {
      updateTreeStats();
      updateFStats();
    }
  }

  const interval = 15 * 1000;
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, interval);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    try {
      update();
    } catch (error) { console.error(error); }
  }, [time]);

  /*if (!isAuthenticated)
    return (
      <Page title={t('Team farming') + ' - ' + t('projectTitle')}>
        <div className={getAdaptiveClassName('farming-team__header', isMobile)}>
          <Container>
            <FarmingHeader />
          </Container>
        </div>


        <div className={getAdaptiveClassName('farming-team', isMobile)}>
          <FarmingUauthenticated />
        </div>
      </Page>
    );*/

  return (
    <Page title={t('Team farming') + ' - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName('farming-team__header', isMobile)}>
        <Container>
          <FarmingHeader />
        </Container>
      </div>


      <div className={getAdaptiveClassName('farming-team', isMobile)}>
        <Container>
          <Grid relaxed style={{ color: 'black', }} stackable>
            <Grid.Column width={11}>
              {isAuthenticated && <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                <Header as='h3' content={t('Want to earn more CCLP? Invite a friend and farm together.')} style={{ color: 'black', }} />
                <p>{t('Share your referral link to your friends and get daily CCLP reward from each registered friend that staked CCLP-LP in your team.')}</p>
                <div>
                  {t('Referral link')}
                  <Divider hidden fitted />
                  <ReferralLink />
                </div>
              </Segment>
              }

              <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                <Header as='h3' content={t('Team farming statistics')} style={{ color: 'black', }} />

                <Grid relaxed columns={2} style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }} stackable>
                  <Grid.Column>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('Available for farming')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP available for farming within a team farming')}
                      />
                      <br /><b><Number value={availableForFarming} suffix=' CCLP' decimalScale={0} /></b>
                      <br /><br />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign='center' style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>
                      {t('Pool rate')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The total amount of CCLP tokens allocated for a team farming per day')}
                      />
                      <br /><b><Number value={poolRate} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
                      <br /> ≈ <Number value={poolRateInUsd} prefix='$' decimalScale={2} />
                    </Segment>
                  </Grid.Column>
                </Grid>


                <Segment style={{ color: 'black', fontSize: '12px', lineHeight: '18px', backgroundColor: '#d9dffc', }} >
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('My next reward')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('You get a daily reward for team farming at 00:00 UTC. Remember that the amount is dynamic, as the number of CCLP tokens farmed increases throughout the day.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><TimerBeforeRewards /></b> <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('The time until the next payment')}
                      />
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}>
                    <b><Number value={nextReward} suffix=' CCLP' decimalScale={2} /></b>
                    <span style={{ color: 'black', fontSize: '14px', lineHeight: '18px', }}>≈ <Number value={nextRewardInUsd} prefix='$' decimalScale={2} /></span>
                  </span>

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Team farming')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('Receive from 5% to 20% from amount of CCLP farmed by your weak team')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={nextTeamReward} suffix=' CCLP' decimalScale={2} /></b> <span style={{ color: 'black', fontSize: '10px', }}>≈ <Number value={nextTeamRewardInUsd} prefix='$' decimalScale={2} /></span>
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Referral farming')} <Popup
                        trigger={<Icon name='info circle' color='blue' />}
                        content={t('Receive from 5% to 20% from amount of CCLP farmed by your direct referrals')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '1.0rem', }} textAlign='right'>
                      <b><Number value={nextRefReward} suffix=' CCLP' decimalScale={2} /></b> <span style={{ color: 'black', fontSize: '10px', }}>≈ <Number value={nextRefRewardInUsd} prefix='$' decimalScale={2} /></span>
                    </Grid.Column>
                  </Grid>

                  <Divider />
                  <Segment>
                    <Grid columns={2}>
                      <Grid.Column width={10} style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='left'>
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
                        content={t('The total amount of CCLP tokens earned within a team farming of all time.')}
                      />
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                    </Grid.Column>
                  </Grid>
                  <br /><span style={{ color: 'black', fontSize: '36px', lineHeight: '36px', }}>
                    <b><Number value={totalReward} suffix=' CCLP' decimalScale={2} /></b>
                  </span>

                  <Divider />
                  <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Team farming reward')}
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                      <b><Number value={totalTeamReward} suffix=' CCLP' decimalScale={2} /></b>
                    </Grid.Column>

                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                      {t('Referral farming reward')}
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '1.0rem', }} textAlign='right'>
                      <b><Number value={totalRefReward} suffix=' CCLP' decimalScale={2} /></b>
                    </Grid.Column>
                  </Grid>
                </Segment>


                <Grid relaxed columns={2} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }}>
                  <Grid.Column >
                    <Button as={Link} to='/farming/tree' content={t('My referral tree')} fluid primary icon='sitemap' />
                  </Grid.Column>
                  <Grid.Column >
                    <Button as={Link} to='/farming/personal' content={t('Personal farming')} fluid primary icon='user' />
                  </Grid.Column>
                </Grid>
              </Segment>
            </Grid.Column>


            <Grid.Column width={5}>
              {isAuthenticated &&
                <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
                  {t('My referral account')}
                  <Divider />
                  <div style={{ color: 'black', fontSize: '16px', lineHeight: '18px', }}>
                    <Image src='/images/referral-team.png' avatar />
                    <span>ID <b>{myRefId}</b></span>
                  </div>

                  <br /><br />
                  <div style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }} >
                    <Grid relaxed columns={1} style={{ color: 'black', fontSize: '12px', lineHeight: '18px', }} textAlign='right'>
                      <div style={{ paddingLeft: '1.4rem', }}>
                        {t('Total team members')}
                      </div>
                      <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
                        <b><Number value={members} decimalScale={0} /></b>
                      </Grid.Column>
                      <div style={{ paddingLeft: '1.4rem', }}>
                        {t('Staked by team')} <Popup
                          trigger={<Icon name='info circle' color='blue' />}
                          content={t('The total amount of CCLP-LP tokens staked by both weak and strong team')}
                        />
                      </div>
                      <Grid.Column style={{ paddingLeft: '1.4rem', paddingRight: '1.0rem', paddingTop: '0.1rem', paddingBottom: '0.1rem', }} textAlign='right'>
                        <b><Number value={teamStakedUsd} prefix='$' decimalScale={2} /></b>
                      </Grid.Column>
                      <Grid.Column style={{ paddingLeft: '1.4rem', paddingRight: '1.0rem', paddingTop: '0.1rem', paddingBottom: '0.1rem', }} textAlign='right'>
                        <b><Number value={teamStakedLp} suffix=' CCLP-LP' decimalScale={2} /></b>
                      </Grid.Column>
                      <Grid.Column style={{ paddingLeft: '1.4rem', paddingRight: '1.0rem', paddingTop: '0.1rem', paddingBottom: '1.0rem', }} textAlign='right'>
                        <b><Number value={teamStakedNft} suffix=' NFT' decimalScale={0} /></b>
                      </Grid.Column>
                    </Grid>
                  </div>
                </Segment>
              }
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </Page >
  );
};


export default hot(module)(FarmingTeamPage);

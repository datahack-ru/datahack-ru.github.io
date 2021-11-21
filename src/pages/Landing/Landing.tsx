import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Container,
  Tab,
  Button,
  Grid,
  Popup,
  Icon,
  Divider,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { utils, } from 'ethers';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import * as S from '../../store/selectors';
import BN from 'bignumber.js';
import Page from '../../components/Page';
import { getRewardRateNext24hV2, } from '../../utils';
import Number from '../../components/Number';
import RoiModal from '../../components/RoiModal';
import './Landing.scss';





function WhatWeDo() {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const panesStyle = {
    backgroundColor: 'rgba(10,25,54,0.60)',
    minHeight: isMobile ? '175px' : '300px',
    fontSize: isMobile ? '16px' : '22px',
  };
  const pStyle = {
    margin: isMobile ? '0 0 3px' : '0 0 6px',
  };

  const panes = [
    /*{
      menuItem: '👨‍🎓 ' + t('WhatWeDo.Education'),
      render: () => <Tab.Pane attached={false} style={panesStyle}>
        {!isMobile && <Header style={{ color: '#ffae00' }}>{t('WhatWeDo.Education.Slogan')}</Header>}
        {isMobile && <p style={{ ...pStyle, color: '#ffae00' }}>{t('WhatWeDo.Education.Slogan')}</p>}

        <p style={pStyle}>🔥 {t('WhatWeDo.Education.1')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Education.2')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Education.3')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Education.4')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Education.5')}</p>
      </Tab.Pane>,
    },*/
    /*{
      menuItem: '🎭 ' + t('WhatWeDo.Nft'),
      render: () => <Tab.Pane attached={false} style={panesStyle}>
        {!isMobile && <Header style={{ color: '#ffae00' }}>{t('WhatWeDo.Nft.Slogan')}</Header>}
        {isMobile && <p style={{ ...pStyle, color: '#ffae00' }}>{t('WhatWeDo.Nft.Slogan')}</p>}

        <p style={pStyle}>🔥 {t('WhatWeDo.Nft.1')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Nft.2')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Nft.3')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Nft.4')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Nft.5')}</p>
      </Tab.Pane>,
    },*/
    {
      menuItem: '🔥 ' + t('WhatWeDo.Farming'),
      render: () => <Tab.Pane attached={false} style={panesStyle}>
        {!isMobile && <Header style={{ color: '#ffae00' }}>{t('WhatWeDo.Farming.Slogan')}</Header>}
        {isMobile && <p style={{ ...pStyle, color: '#ffae00' }}>{t('WhatWeDo.Farming.Slogan')}</p>}

        <p style={pStyle}>🔥 {t('WhatWeDo.Farming.1')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Farming.2')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Farming.3')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Farming.4')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Farming.5')}</p>
      </Tab.Pane>,
    },
    {
      menuItem: '🤝 ' + t('WhatWeDo.Affiliate'),
      render: () => <Tab.Pane attached={false} style={panesStyle}>
        {!isMobile && <Header style={{ color: '#ffae00' }}>{t('WhatWeDo.Affiliate.Slogan')}</Header>}
        {isMobile && <p style={{ ...pStyle, color: '#ffae00' }}>{t('WhatWeDo.Affiliate.Slogan')}</p>}

        {/* You earn 8 types of different bonuses from people at 1, 10 or even 2,000,000+ referral levels. */}
        <p style={pStyle}>🔥 {t('WhatWeDo.Affiliate.2')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Affiliate.3')}</p>
        <p style={pStyle}>🔥 {t('WhatWeDo.Affiliate.4')}</p>
      </Tab.Pane>,
    },
  ];

  return (
    <Tab menu={{
      secondary: true, stackable: true,
      //vertical: !isMobile,
    }} panes={panes} />
  );
}

const Landing: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  const panesStyle = {
    backgroundColor: 'rgba(10,25,54,0.60)',
    minHeight: isMobile ? '175px' : '200px',
    fontSize: isMobile ? '18px' : '22px',
    padding: '6px',
  };

  useEffect(() => {
  }, []);


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

  const timestamp = Math.floor(Date.now() / 1000);

  const poolRatePersonal = utils.formatEther(getRewardRateNext24hV2(timestamp, 'personal'));
  const poolRatePersonalInUsd = new BN(poolRatePersonal).multipliedBy(cclpPrice).toString();

  const poolRateTime = utils.formatEther(getRewardRateNext24hV2(timestamp, 'time'));
  const poolRateTimeInUsd = new BN(poolRateTime).multipliedBy(cclpPrice).toString();

  const poolRateTeam = utils.formatEther(getRewardRateNext24hV2(timestamp, 'team'));
  const poolRateTeamInUsd = new BN(poolRateTeam).multipliedBy(cclpPrice).toString();

  const poolRateReferral = utils.formatEther(getRewardRateNext24hV2(timestamp, 'referral'));
  const poolRateReferralInUsd = new BN(poolRateReferral).multipliedBy(cclpPrice).toString();

  return (
    <Page title={'' + t('projectTitle')}>
      <div className={getAdaptiveClassName('landing__header', isMobile)}>
        <Container>
          <Header as='h1' content={t('projectTitle')} style={{ color: '#ffae00' }} />
          <div style={panesStyle}>
            <br /><p>{t('projectSlogan')}</p><br />
            <Button
              content={t('Get started now').toUpperCase()}
              style={{ background: '#ffae00', color: '#0a1936', borderRadius: '6px' }}
              as={Link}
              to='/signup'
            />
          </div>
        </Container>
      </div>

      <div className={getAdaptiveClassName('landing__section-1', isMobile)}>
        <Container>
          <Header as='h2' content={t('What we do').toUpperCase()} style={{ color: '#ffae00' }} />
          <WhatWeDo />
        </Container>
      </div>


      <div className={getAdaptiveClassName('landing__section-2', isMobile)}>
        <Container>
          <Header as='h2' content={'NFT'} style={{ color: '#ffae00' }} />
        </Container>
      </div>


      <div className={getAdaptiveClassName('landing__section-3', isMobile)}>
        <Container>
          <Header as='h2' content={t('Collect rewards from 4 farming pools').toUpperCase()} style={{ color: '#ffae00' }} />

          <Grid relaxed columns={2} style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }} textAlign='left'>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.25rem', }}>
              <Header as='h3' style={{ color: '#ffae00' }} >
                {t('Primary pool')} <RoiModal isHeader />
              </Header>
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.25rem', }}>
              <Header as='h3' content={t('Team pool')} style={{ color: '#ffae00' }} />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.25rem', paddingBottom: '0.5rem', color: 'white', fontSize: '22px', }}>
              <b><Number value={poolRatePersonal} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
              <br /> <Number value={poolRatePersonalInUsd} prefix='≈ $' decimalScale={2} style={{ fontSize: '14px', color: '#ffae00', }} />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.25rem', paddingBottom: '0.5rem', color: 'white', fontSize: '22px', }}>
              <b><Number value={poolRateTeam} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
              <br /> <Number value={poolRateTeamInUsd} prefix='≈ $' decimalScale={2} style={{ fontSize: '14px', color: '#ffae00', }} />
            </Grid.Column>

            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.25rem', }}>
              <Header as='h3' content={t('Bonus pool')} style={{ color: '#ffae00' }} />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.5rem', paddingBottom: '0.25rem', }}>
              <Header as='h3' content={t('Referral pool')} style={{ color: '#ffae00' }} />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.25rem', paddingBottom: '0.5rem', color: 'white', fontSize: '22px', }}>
              <b><Number value={poolRateTime} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
              <br /> <Number value={poolRateTimeInUsd} prefix='≈ $' decimalScale={2} style={{ fontSize: '14px', color: '#ffae00', }} />
            </Grid.Column>
            <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.25rem', paddingBottom: '0.5rem', color: 'white', fontSize: '22px', }}>
              <b><Number value={poolRateReferral} suffix={' CCLP/' + t('day')} decimalScale={0} /></b>
              <br /> <Number value={poolRateReferralInUsd} prefix='≈ $' decimalScale={2} style={{ fontSize: '14px', color: '#ffae00', }} />
            </Grid.Column>
          </Grid>

          <Divider />
          <Header as={Link} to='/signup' style={{ color: '#ffae00', textDecoration: 'none', }} >
            {t('Register to start making money')}
            <Header.Subheader style={{ color: 'white', }}>
              {t('Take your share of all the distributed bonuses')}
            </Header.Subheader>
          </Header>
        </Container>
      </div>
    </Page>
  );
};
/*

Register to join the CosmoSwap farming community.
Зарегистрируйтесь, чтобы присоединиться к сообществу фермеров CosmoSwap.

Learn more
*/

export default Landing;

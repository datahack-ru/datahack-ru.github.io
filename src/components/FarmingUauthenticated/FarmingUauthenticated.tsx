import React from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import {
  Container, Grid, Segment, Button, Header,
} from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import './FarmingUauthenticated.scss';
import { Link } from 'react-router-dom';



const FarmingUauthenticated = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <Container>
      <Segment textAlign='left' style={{ color: 'black', fontSize: '18px', lineHeight: '18px', }}>
        <Grid relaxed style={{ color: 'black', }} stackable>
          <Grid.Column width={16}>
            <Header as='h3' content={t('Stake together with friends and get rewards')} style={{ color: 'black', }} />
            <p>{t('Get daily CCLP reward from each friend that staked CCLP-LP with the first team farming protocol ever created')}</p>

            <Button as={Link} to='/signup' primary>{t('Sign Up')}</Button>
            <Button as={Link} to='/signin' positive>{t('Sign In')}</Button>

            <Header as='h4' style={{ color: 'black', }}>
              {t('Get your share')}
              <Header.Subheader style={{ color: 'black', }}>
                🔥 {t('CCLP tokens distributed among the “weak” teams every day')}
              </Header.Subheader>
            </Header>

            <Header as='h4' style={{ color: 'black', }}>
              {t('Earn from endless levels')}
              <Header.Subheader style={{ color: 'black', }}>
                🔥 {t('Income from 2nd, 20th or 2000th level will definitely make a difference')}
              </Header.Subheader>
            </Header>

            <Header as='h4' style={{ color: 'black', }}>
              {t('Grow your binary teams')}
              <Header.Subheader style={{ color: 'black', }}>
                🔥 {t('The first referral level consists of 2 people, the next level consists of 4 people, and so on')}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};


export default hot(module)(FarmingUauthenticated);

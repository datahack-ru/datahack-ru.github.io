import React, { useState, useEffect, useCallback, } from "react";
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Header, Container, Button, Icon, Select, Grid, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import ReferralLink from "./components/ReferralLink/ReferralLink";
import ReferralMyAccount from "./components/ReferralMyAccount/ReferralMyAccount";
import ReferralTeam from "./components/ReferralTeam/ReferralTeam";
//import * as A from '../../store/actions';
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import "./MyReferralsTree.scss";
import RefTree from './RefTree';




const myStateInitData = {
  "email": { "confirmed": false, "value": "email@example.com" },
  "team": { "parent": null, "distribution": "RANDOM", "left": null, "right": null, "level": null },
  "permissions": ["user"],
  "address": null,
  "level": "STARTER",  // old
  "parent": null,
  "guid": null,
};


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

const MyReferralsTree: React.FC<any> = () => {
  const myGuid = useSelector((state) => S.profile.getGuid(state));

  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const distributions = [
    { key: "RANDOM", value: "RANDOM", text: t("Random team"), },
    { key: "LEFT", value: "LEFT", text: t("Left team"), },
    { key: "RIGHT", value: "RIGHT", text: t("Right team"), },
  ];

  const [search, setSearch] = useState('');
  const onSearchChange = async (e: any, { name, value }: any) => {
    setSearch(value);
  }


  const [myState, setMyState] = useState(myStateInitData);
  const refreshMy = async () => {
    const res = await api.getV2My();
    if (res.ok)
      setMyState(res.result);
    else
      setMyState(myStateInitData);
  }
  const setMyReferralsDistribution = async (e: any, { name, value }: any) => {
    if (myState.team.distribution !== value) {
      const res = await api.setMyReferralsDistribution(value);
      if (res.ok)
        setMyState({ ...myState, team: { ...myState.team, distribution: value } });
    }
  }

  const [treeStats, setTreeStats] = useState(treeStatsInitData);
  const [treeData, setTreeData] = useState({});


  const toAccount = async (guid: any) => {
    const res = await api.getV2Team(guid);
    if (res.ok)
      setTreeStats(res.result);
    const res2 = await api.getV2Tree(guid);
    if (res2.ok)
      setTreeData(res2.result);
  }

  const toMyAccount = async () => {
    toAccount(myGuid);
  }

  const onNodeClick = async (nodeGuid: number | null) => {
    toAccount(nodeGuid);
  }

  const doSearch = () => {
    toAccount(search);
  }

  const refresh = async () => {
    if (treeStats.guid)
      toAccount(treeStats.guid);
    else
      toAccount(myGuid);
  }


  const update = () => {
    refreshMy();
    refresh();
  }

  useEffect(() => {
    update();
  }, []);

  const oneLevelUp = () => {
    toAccount(treeStats.parent);
  }


  const itsMy = (id: any) => {
    if (myGuid === id) {
      return true;
    }
    return false;
  }


  return (
    <Page title={t('Referral program')}>
      <div className={getAdaptiveClassName("referrals-tree__header", isMobile)}>
        <Container>
          <ReferralLink />
          <Header as="h1" content={t('Referral program')} className="shadow" style={{ color: '#ffae00' }} />
          <p>
            {t('We introduce a unique farming model where only you chooce whether to stake alone or with a team')}
          </p>
        </Container>
      </div>

      <div className={getAdaptiveClassName("referrals-tree", isMobile)}>
        <Container>
          <div className="referrals-tree__menu">
            <Link to={"/my/referrals"}>{t('My statistics')}</Link>
            <Link to={"/my/referrals/tree"}>{t('My referral tree')}</Link>
          </div>

          <Input
            value={search}
            onChange={onSearchChange}
            icon={<Icon name='search' link onClick={doSearch} />}
            placeholder={t('Search') + '...'}
          />

          <label htmlFor="distribution">{t('Distribution of referrals')}</label>
          <Select
            options={distributions}
            value={myState.team.distribution}
            name="distribution"
            onChange={setMyReferralsDistribution}
          />

          <div className="referrals-tree__btn-group">
            <Button onClick={toMyAccount}>{t('To my account')}</Button>
            <Button onClick={oneLevelUp}>{t('One level up')}</Button>
            <Button onClick={update}>{t('Refresh')}</Button>
          </div>

          <div className="referrals-tree__row-teams">
            <ReferralTeam left={true} weakTeam={treeStats.weakTeam === 'LEFT'} data={treeStats.left} />
            <div className="referrals-tree__accounts">
              <Grid>
                <Grid.Row>
                  <Grid.Column width='5'>
                    <div className="referrals-tree__account">
                      {itsMy(treeStats.guid) ? t('Your account') : <>ID {treeStats.guid}</>}
                    </div>
                  </Grid.Column>
                  <Grid.Column width='11'>
                    <ReferralMyAccount data={treeStats} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <ReferralTeam weakTeam={treeStats.weakTeam === 'RIGHT'} data={treeStats.right} />
          </div>
        </Container>

        <RefTree onNodeClick={onNodeClick} treeData={treeData} />
      </div>
    </Page >
  );
};


export default hot(module)(MyReferralsTree);

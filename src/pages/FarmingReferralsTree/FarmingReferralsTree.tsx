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
import "./FarmingReferralsTree.scss";
import './Farming.scss';
import RefTree from './RefTree';
import FarmingHeader from '../../components/FarmingHeader';
import FarmingUauthenticated from '../../components/FarmingUauthenticated';




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


const FarmingReferralsTree: React.FC<any> = () => {
  const isAuthenticated = useSelector((state) => S.profile.isAuthenticated(state));
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
    console.log('getV2Team', guid, res.result)
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
    if (isAuthenticated) {
      refreshMy();
      refresh();
    }
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

  if (!isAuthenticated)
    return (
      <Page
        title={t('Referral tree') + ' - ' + t('projectTitle')}
      >
        <div className={getAdaptiveClassName('referrals-tree-farming__header', isMobile)}>
          <Container>
            <FarmingHeader />
          </Container>
        </div>

        <div className={getAdaptiveClassName("referrals-tree", isMobile)}>
          <FarmingUauthenticated />
        </div>
      </Page>
    );

  return (
    <Page
      title={t('Referral tree') + ' - ' + t('projectTitle')}
    >
      <div className={getAdaptiveClassName('referrals-tree-farming__header', isMobile)}>
        <Container>
          <FarmingHeader />
        </Container>
      </div>

      <div className={getAdaptiveClassName("referrals-tree", isMobile)}>
        <Container>
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


export default hot(module)(FarmingReferralsTree);

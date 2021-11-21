import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Header, Container, Grid, Button, Tab } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import "./BscFarm.scss";
import Connect from "../../components/Connect/Connect";
import { api } from '../../store/configureStore';

import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';

import FormBscFarmCmp from '../../components/FormBscFarmCmp';
import FormBscFarmCosmo from '../../components/FormBscFarmCosmo';
import FormBscFarmCosmoCmp from '../../components/FormBscFarmCosmoCmp';
import FormBscFarmCosmoBnb from '../../components/FormBscFarmCosmoBnb';
import FormBscFarmCosmoEth from '../../components/FormBscFarmCosmoEth';
import FormBscFarmCosmoUsdt from '../../components/FormBscFarmCosmoUsdt';


import FormBscFarmV2Cmp from '../../components/FormBscFarmV2Cmp';
import FormBscFarmV2Cosmo from '../../components/FormBscFarmV2Cosmo';
import FormBscFarmV2CosmoCmp from '../../components/FormBscFarmV2CosmoCmp';
import FormBscFarmV2CosmoUsdt from '../../components/FormBscFarmV2CosmoUsdt';


const BscFarm: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { account } = context3;


  const [data, setData] = useState<any>(null);
  const update = async () => {
    try {
      if (account) {
        const res = await api.getBonusPoolsBscData(account);
        if (res.ok)
          setData(res.result);
      }
    } catch (error) { console.error(error); }
  }


  const interval = 60 * 1000;
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, interval);

    const intervalId2 = setInterval(() => {
      setTime(Date.now());
      clearInterval(intervalId2);
    }, 3 * 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);


  useEffect(() => {
    try {
      update();
    } catch (error) { console.error(error); }
  }, [time]);



  const panes = [
    {
      menuItem: null,
      render: () => {
        return (
          <Grid textAlign='center'>
            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmV2Cmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmV2Cosmo data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmV2CosmoCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmV2CosmoUsdt data={data} />
            </Grid.Column>
          </Grid>
        );
      },
    },
    {
      menuItem: null,
      render: () => {
        return (
          <Grid textAlign='center'>
            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCosmo data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCosmoCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCosmoUsdt data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCosmoEth data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormBscFarmCosmoBnb data={data} />
            </Grid.Column>
          </Grid>
        );
      },
    },
  ];

  const getTabNum = (tabIndex: number) => {
    if (tabIndex === 0)
      return 2;
    else if (tabIndex === 1)
      return 1;
  }

  return (
    <Page title={`${t('BSC Farms')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("bsc__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content={t('BSC Farms')} />

          <div className="bsc__header-menu">
            {/*<Button
              onClick={() => setTab(2)}
              className={tab === 0 ? "btn-active" : undefined}
            >{t('BSC Farms')} V3</Button>*/}
            <Button
              onClick={() => setTab(0)}
              className={tab === 0 ? "btn-active" : undefined}
            >{t('BSC Farms')} V2</Button>
            <Button
              onClick={() => setTab(1)}
              className={tab === 1 ? "btn-active" : undefined}
            >{t('BSC Farms')} V1</Button>
          </div>
          <p>{t('BSC Farms')} V{getTabNum(tab)}</p>
        </Container>
      </div>

      <div className={getAdaptiveClassName("bsc", isMobile)}>
        <Container>
          <Tab
            renderActiveOnly={true}
            panes={panes}
            activeIndex={tab}
          />
        </Container>
      </div>
    </Page>
  );
};

export default BscFarm;

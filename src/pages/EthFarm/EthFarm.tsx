import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Header, Container, Grid, Button, Tab } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import "./EthFarm.scss";
import Connect from "../../components/Connect/Connect";
import { api } from '../../store/configureStore';

import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';

import FormEthFarmCmp from '../../components/FormEthFarmCmp';
import FormEthFarmCosmo from '../../components/FormEthFarmCosmo';
import FormEthFarmCosmoCmp from '../../components/FormEthFarmCosmoCmp';
import FormEthFarmCosmoEth from '../../components/FormEthFarmCosmoEth';
import FormEthFarmCosmoUsdt from '../../components/FormEthFarmCosmoUsdt';


import FormEthFarmV2Cmp from '../../components/FormEthFarmV2Cmp';
import FormEthFarmV2Cup from '../../components/FormEthFarmV2Cup';
import FormEthFarmV2Cosmo from '../../components/FormEthFarmV2Cosmo';
import FormEthFarmV2CosmoCmp from '../../components/FormEthFarmV2CosmoCmp';
import FormEthFarmV2CosmoCup from '../../components/FormEthFarmV2CosmoCup';
import FormEthFarmV2CosmoEth from '../../components/FormEthFarmV2CosmoEth';
import FormEthFarmV2CosmoUsdt from '../../components/FormEthFarmV2CosmoUsdt';


const EthFarm: React.FC = () => {
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
        const res = await api.getBonusPoolsEthData(account);
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
              <FormEthFarmV2CosmoCup data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmV2Cmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmV2Cosmo data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmV2CosmoCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmV2CosmoUsdt data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmV2CosmoEth data={data} />
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
              <FormEthFarmCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmCosmo data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmCosmoCmp data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmCosmoUsdt data={data} />
            </Grid.Column>

            <Grid.Column mobile='16' tablet='16' computer='8' largeScreen='8' widescreen='8'>
              <FormEthFarmCosmoEth data={data} />
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
    <Page title={`${t('ETH Farms')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("eth__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content={t('ETH Farms')} />

          <div className="eth__header-menu">
            {/*<Button
              onClick={() => setTab(2)}
              className={tab === 0 ? "btn-active" : undefined}
            >{t('ETH Farms')} V3</Button>*/}
            <Button
              onClick={() => setTab(0)}
              className={tab === 0 ? "btn-active" : undefined}
            >{t('ETH Farms')} V2</Button>
            <Button
              onClick={() => setTab(1)}
              className={tab === 1 ? "btn-active" : undefined}
            >{t('ETH Farms')} V1</Button>
          </div>
          <p>{t('ETH Farms')} V{getTabNum(tab)}</p>
        </Container>
      </div>

      <div className={getAdaptiveClassName("eth", isMobile)}>
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

export default EthFarm;

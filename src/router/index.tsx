import React from "react";
import { Switch, Route } from "react-router";
import Loadable from 'react-loadable';

import { Routes } from "./helper";
import PrivateRoute from "../components/PrivateRoute";
import { ErrorBoundary } from "../components/ErrorBoundary";



const delay = 200;

const AppStatus = Loadable({
  loader: () => import('../pages/AppStatus'),
  loading: () => null,
  delay,
});

const Landing = Loadable({
  loader: () => import('../pages/Landing'),
  loading: () => null,
  delay,
});

const Farming = Loadable({
  loader: () => import('../pages/Farming'),
  loading: () => null,
  delay,
});
const FarmingPools = Loadable({
  loader: () => import('../pages/FarmingPools'),
  loading: () => null,
  delay,
});
const FarmingPersonal = Loadable({
  loader: () => import('../pages/FarmingPersonal'),
  loading: () => null,
  delay,
});
const FarmingTeam = Loadable({
  loader: () => import('../pages/FarmingTeam'),
  loading: () => null,
  delay,
});
const FarmingReferralsTree = Loadable({
  loader: () => import('../pages/FarmingReferralsTree'),
  loading: () => null,
  delay,
});

const Dashboard = Loadable({
  loader: () => import('../pages/Dashboard'),
  loading: () => null,
  delay,
});
const Change = Loadable({
  loader: () => import('../pages/Change'),
  loading: () => null,
  delay,
});
const Bridge = Loadable({
  loader: () => import('../pages/Bridge'),
  loading: () => null,
  delay,
});
const CupToken = Loadable({
  loader: () => import('../pages/CupToken'),
  loading: () => null,
  delay,
});

const BscFarm = Loadable({
  loader: () => import('../pages/BscFarm'),
  loading: () => null,
  delay,
});
const EthFarm = Loadable({
  loader: () => import('../pages/EthFarm'),
  loading: () => null,
  delay,
});
const Nft = Loadable({
  loader: () => import('../pages/Nft'),
  loading: () => null,
  delay,
});

const CosmoVirtual = Loadable({
  loader: () => import('../pages/CosmoVirtual'),
  loading: () => null,
  delay,
});

const Wallet = Loadable({
  loader: () => import('../pages/Wallet'),
  loading: () => null,
  delay,
});
const Team = Loadable({
  loader: () => import('../pages/Team'),
  loading: () => null,
  delay,
});
const Profile = Loadable({
  loader: () => import('../pages/Profile'),
  loading: () => null,
  delay,
});

const MyReferrals = Loadable({
  loader: () => import('../pages/MyReferrals'),
  loading: () => null,
  delay,
});
const MyReferralsTree = Loadable({
  loader: () => import('../pages/MyReferralsTree'),
  loading: () => null,
  delay,
});
const SmartContracts = Loadable({
  loader: () => import('../pages/SmartContracts'),
  loading: () => null,
  delay,
});

const PageSignIn = Loadable({
  loader: () => import('../pages/PageSignIn'),
  loading: () => null,
  delay,
});
const PageSignUp = Loadable({
  loader: () => import('../pages/PageSignUp'),
  loading: () => null,
  delay,
});
const Unavailable = Loadable({
  loader: () => import('../pages/Unavailable'),
  loading: () => null,
  delay,
});
const PageNotFound = Loadable({
  loader: () => import('../pages/NotFound'),
  loading: () => null,
  delay,
});




const NftMyStatistics = Loadable({
  loader: () => import('../pages/NftMyStatistics'),
  loading: () => null,
  delay,
});
const NftCollections = Loadable({
  loader: () => import('../pages/NftCollections'),
  loading: () => null,
  delay,
});



export const AppRouter = () => (
  <ErrorBoundary>
    <Switch>
      <Route exact path={Routes.appStatus} component={AppStatus} />

      <Route exact path={Routes.main} component={Landing} />

      <Route exact path={Routes.farming} component={Farming} />
      <Route exact path={Routes.farmingPool} component={FarmingPools} />
      <Route exact path={Routes.farmingPersonal} component={FarmingPersonal} />
      <Route exact path={Routes.farmingTeam} component={FarmingTeam} />
      <Route exact path={Routes.farmingTree} component={FarmingReferralsTree} />

      <PrivateRoute exact path={Routes.farmingTree}>
        <FarmingReferralsTree />
      </PrivateRoute>

      {/*
      <Route exact path={Routes.nft} component={Nft} />
      */}
      <PrivateRoute exact path={Routes.nftMyStatistics}>
        <NftMyStatistics />
      </PrivateRoute>
      <PrivateRoute exact path={Routes.nftCollections}>
        <NftCollections />
      </PrivateRoute>


      <Route exact path={Routes.dashboard} component={Dashboard} />
      <Route exact path={Routes.exchange} component={Change} />
      <Route exact path={Routes.bridge} component={Bridge} />
      <Route exact path={Routes.cupToken} component={CupToken} />
      <Route exact path={Routes.cosmovirtual} component={CosmoVirtual} />

      <Route exact path={Routes.bscFarm} component={BscFarm} />
      <Route exact path={Routes.ethFarm} component={EthFarm} />

      <Route exact path={Routes.signin} component={PageSignIn} />
      <Route exact path={Routes.signup} component={PageSignUp} />

      <Route exact path={Routes.team} component={Team} />
      <Route exact path={Routes.profile} component={Profile} />
      <Route exact path={Routes.wallet} component={Wallet} />
      <Route exact path={'/contracts'} component={SmartContracts} />

      <Route exact path={Routes.unavailable} component={Unavailable} />
      <Route component={PageNotFound} />
    </Switch>
  </ErrorBoundary>
);

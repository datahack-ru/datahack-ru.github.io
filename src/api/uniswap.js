
import BigNumber from 'bignumber.js';
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk';
import {
  usdtAddress,
  cosmoAddress,
  cupAddress, cosmoMasksPowerAddress, cosmoBugsPowerAddress, cosmoDoodlePowerAddress,
} from '../constants/index';



export default ({
  ethProvider,
}) => {
  const COSMO = new Token(ChainId.MAINNET, cosmoAddress, 18);
  const CUP = new Token(ChainId.MAINNET, cupAddress, 18);
  const POWER = new Token(ChainId.MAINNET, cosmoMasksPowerAddress, 18);
  const CBP = new Token(ChainId.MAINNET, cosmoBugsPowerAddress, 18);
  const CDP = new Token(ChainId.MAINNET, cosmoDoodlePowerAddress, 18);
  const USDT = new Token(ChainId.MAINNET, usdtAddress, 6);
  const WETH2 = WETH[ChainId.MAINNET];

  const getPair = async (token1, token2) => {
    const pair = await Fetcher.fetchPairData(token1, token2, ethProvider);
    return pair;
  }

  const getRoute = async (token1, token2) => {
    const pair = await getPair(token1, token2);
    const route = new Route([pair], token2);
    return route;
  }


  const getRouteUsdtWEth = async () => {
    const route = await getRoute(USDT, WETH2);
    return route;
  }


  const getRouteWEthCosmo = async () => {
    const route = await getRoute(WETH2, COSMO);
    return route;
  }

  const getRouteUsdtCosmo = async () => {
    const route = await getRoute(USDT, COSMO);
    return route;
  }
  const getRoutePowerCosmo = async () => {
    const route = await getRoute(POWER, COSMO);
    return route;
  }
  const getRouteCupCosmo = async () => {
    const route = await getRoute(CUP, COSMO);
    return route;
  }
  const getRouteCbpCosmo = async () => {
    const route = await getRoute(CBP, COSMO);
    return route;
  }
  const getRouteCdpCosmo = async () => {
    const route = await getRoute(CDP, COSMO);
    return route;
  }

  const getPriceCosmoUsdt = async () => {
    const route = await getRouteUsdtCosmo();
    return route.midPrice.toSignificant(18);
  }

  const getPriceCosmoPower = async () => {
    const route = await getRoutePowerCosmo();
    return route.midPrice.invert().toSignificant(18);
  }
  const getPriceCosmoCup = async () => {
    const route = await getRouteCupCosmo();
    return route.midPrice.invert().toSignificant(18);
  }
  const getPriceCosmoCbp = async () => {
    const route = await getRouteCbpCosmo();
    return route.midPrice.invert().toSignificant(18);
  }
  const getPriceCosmoCdp = async () => {
    const route = await getRouteCdpCosmo();
    return route.midPrice.invert().toSignificant(18);
  }

  const getPricePower = async () => {
    const cosmoUsdt = await getPriceCosmoUsdt();
    const cosmoPower = await getPriceCosmoPower();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoPower)).toFixed(18);
  }
  const getPriceCup = async () => {
    const cosmoUsdt = await getPriceCosmoUsdt();
    const cosmoCup = await getPriceCosmoCup();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoCup)).toFixed(18);
  }

  const getPriceCbp = async () => {
    const cosmoUsdt = await getPriceCosmoUsdt();
    const cosmoCbp = await getPriceCosmoCbp();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoCbp)).toFixed(18);
  }

  const getPriceCdp = async () => {
    const cosmoUsdt = await getPriceCosmoUsdt();
    const cosmoCdp = await getPriceCosmoCdp();
    return new BigNumber(cosmoUsdt).multipliedBy(new BigNumber(cosmoCdp)).toFixed(18);
  }

  return {
    getPair, getRoute,

    getRouteUsdtWEth,

    getRouteWEthCosmo,
    getRouteUsdtCosmo,
    getRoutePowerCosmo,

    getPriceCosmoUsdt, getPriceCosmoPower, getPriceCosmoCup, getPriceCosmoCbp,
    getPricePower, getPriceCup, getPriceCbp, getPriceCdp,
  };
}

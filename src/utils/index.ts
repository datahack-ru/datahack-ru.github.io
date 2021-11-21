// https://github.com/pancakeswap/pancake-swap-interface-v1/blob/master/src/utils/index.ts
import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber,/* BigNumberish*/ } from '@ethersproject/bignumber';
import { utils } from 'ethers';
import BN from 'bignumber.js';

import { ChainId } from '../constants/index';


BN.config({ DECIMAL_PLACES: 18 });

/*import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER } from '@pancakeswap-libs/sdk'
import { ROUTER_ADDRESS } from '../constants'
import { TokenAddressMap } from '../state/lists/hooks'
*/

export const DAY: number = 60 * 60 * 24;
export const WEEK_DURATION: number = DAY * 7;

export const DISTRIBUTION_START_TIME: number = 1632117600;
export const DISTRIBUTION_START_TIME_STR: string = '2021-09-20T06:00:000Z';
export const DISTRIBUTION_START_RATE: BigNumber = BigNumber.from('4000000000000000000000000000');
export const DISTRIBUTION_START_RATE_PER_SEC: BigNumber = DISTRIBUTION_START_RATE.div(DAY).add(1);


interface IPoolShares extends Array<number> { };
export const poolShares_01_28: IPoolShares = [0, 0.625, 0.375];
export const poolShares_29_56: IPoolShares = [0, 0.5625, 0.4375];
export const poolShares_57_xx: IPoolShares = [0, 0.5, 0.5];


export const POOL = {
  DEFAULT_VALUE: 0,
  PRIMARY: 1,
  FUND: 2
};
export function getPoolShares(timestamp: number, pool: number): number {
  if (timestamp <= (DISTRIBUTION_START_TIME + DAY * 29))
    return poolShares_01_28[pool];
  else if (timestamp <= (DISTRIBUTION_START_TIME + DAY * 57))
    return poolShares_29_56[pool];
  else
    return poolShares_57_xx[pool];
}

interface IMintScheduleItem {
  weekCount: number;
  weekCompletenessMultiplier: number;
  poolShares: IPoolShares;
};

interface IMintScheduleItemV2 {
  [key: string]: number;
};

export const mintScheduleItems: IMintScheduleItem[] = [
  /* period 1-7 days | duration 7 days | summary 1 week */
  { weekCount: 1, weekCompletenessMultiplier: 0.75, poolShares: poolShares_01_28, },
  /* period 8-14 days | duration 7 days | summary 2 weeks */
  { weekCount: 1, weekCompletenessMultiplier: 0.35, poolShares: poolShares_01_28, },
  /* period 15-28 days | 2 weeks | summary 4 weeks */
  { weekCount: 2, weekCompletenessMultiplier: 100.0, poolShares: poolShares_01_28, },

  /* period 29-56 days | 4 weeks | summary 8 weeks */
  { weekCount: 1, weekCompletenessMultiplier: 1.04, poolShares: poolShares_29_56, },
  { weekCount: 1, weekCompletenessMultiplier: 1.04, poolShares: poolShares_29_56, },
  { weekCount: 1, weekCompletenessMultiplier: 1.04, poolShares: poolShares_29_56, },
  { weekCount: 1, weekCompletenessMultiplier: 1.04, poolShares: poolShares_29_56, },

  /* period 57-105 days | 7 weeks | summary 15 weeks */
  { weekCount: 7, weekCompletenessMultiplier: 1.04, poolShares: poolShares_57_xx, },
  /* period 106-196 days | duration 3 months | summary 28 weeks */
  { weekCount: 13, weekCompletenessMultiplier: 1.02, poolShares: poolShares_57_xx, },
  /* period 197-287 days | duration 3 months | summary 41 weeks */
  { weekCount: 13, weekCompletenessMultiplier: 1.01, poolShares: poolShares_57_xx, },
  /* period 288-378 days | duration 3 months | summary 54 weeks */
  { weekCount: 13, weekCompletenessMultiplier: 1.0, poolShares: poolShares_57_xx, },
  /* period 379-560 days | duration 6 months | summary 80 weeks */
  { weekCount: 26, weekCompletenessMultiplier: 0.9995, poolShares: poolShares_57_xx, },
  /* period 561-742 days | duration 6 months | summary 106 weeks */
  { weekCount: 26, weekCompletenessMultiplier: 0.999, poolShares: poolShares_57_xx, },
  /* period 743-924 days | duration 6 months | summary 132 weeks */
  { weekCount: 26, weekCompletenessMultiplier: 0.9985, poolShares: poolShares_57_xx, },
  /* period 925-1106 days | duration 6 months | summary 158 weeks */
  { weekCount: 26, weekCompletenessMultiplier: 0.998, poolShares: poolShares_57_xx, },
  /* period 1107-1470 days | duration 1 year | summary 210 weeks */
  { weekCount: 52, weekCompletenessMultiplier: 0.9975, poolShares: poolShares_57_xx, },
  /* period 1471-1834 days | duration 1 year | summary 262 weeks */
  { weekCount: 52, weekCompletenessMultiplier: 0.997, poolShares: poolShares_57_xx, },
  /* period 1835-2198 days | duration 1 year | summary 314 weeks */
  { weekCount: 52, weekCompletenessMultiplier: 0.9965, poolShares: poolShares_57_xx, },
  /* period 2199-2562 days | duration 1 year | summary 366 weeks */
  { weekCount: 52, weekCompletenessMultiplier: 0.996, poolShares: poolShares_57_xx, },
  /* period 2563-2926 days | duration 1 year | summary 418 weeks */
  { weekCount: 52, weekCompletenessMultiplier: 0.997, poolShares: poolShares_57_xx, },
  /* period 2927-3654 days | duration 2 year | summary 522 weeks */
  { weekCount: 104, weekCompletenessMultiplier: 0.998, poolShares: poolShares_57_xx, },
  /* period 3655-5110 days | duration 4 years | summary 730 weeks */
  { weekCount: 208, weekCompletenessMultiplier: 0.999, poolShares: poolShares_57_xx, },
  /* period 5111-8022 days | duration 8 years | summary 1146 weeks */
  { weekCount: 416, weekCompletenessMultiplier: 0.9995, poolShares: poolShares_57_xx, },
  /* period 8023-22582 days | duration 40 years | summary 3226 weeks */
  { weekCount: 2080, weekCompletenessMultiplier: 0.9999, poolShares: poolShares_57_xx, },
  /* period 22583-26096 days | duration 10 years (without 18 weeks) | summary 3728 weeks */
  { weekCount: 502, weekCompletenessMultiplier: 0.99995, poolShares: poolShares_57_xx, },
];


export function getMintScheduleItemsV2() {
  // primary pool
  const poolPersonalShares_01_28 = 0.625;
  const poolPersonalShares_29_56 = 0.5625;
  const poolPersonalShares_57_xx = 0.5;

  // Time Staking Bonus Rewards
  const poolTimeShares_01_28 = 0.125;
  const poolTimeShares_29_56 = 0.1125;
  const poolTimeShares_57_xx = 0.1;
  // Direct Referral Staking Rewards
  const poolReferralShares_01_28 = 0.125;
  const poolReferralShares_29_56 = 0.1125;
  const poolReferralShares_57_xx = 0.1;
  // Affiliate Team Staking Rewards
  const poolTeamShares_01_28 = 0.125;
  const poolTeamShares_29_56 = 0.1125;
  const poolTeamShares_57_xx = 0.1;

  // Fund at all
  const poolFundAtAllShares_01_28 = 0;
  const poolFundAtAllShares_29_56 = 0.1;
  const poolFundAtAllShares_57_xx = 0.2;
  // Funding Team
  const poolFundTeamShares_01_28 = 0;
  const poolFundTeamShares_29_56 = 0.04;
  const poolFundTeamShares_57_xx = 0.07;
  // Operational fund
  const poolFundOperationalShares_01_28 = 0;
  const poolFundOperationalShares_29_56 = 0.03;
  const poolFundOperationalShares_57_xx = 0.06;
  // Reserve fund
  const poolFundReserveShares_01_28 = 0;
  const poolFundReserveShares_29_56 = 0.03;
  const poolFundReserveShares_57_xx = 0.07;

  const mintScheduleItems = [
    /* period 1-7 days | duration 7 days | summary 1 week */
    {
      weekCount: 1, weekCompletenessMultiplier: 0.75,
      poolPersonalShares: poolPersonalShares_01_28,
      poolTimeShares: poolTimeShares_01_28,
      poolReferralShares: poolReferralShares_01_28,
      poolTeamShares: poolTeamShares_01_28,
      poolFundAtAllShares: poolFundAtAllShares_01_28,
      poolFundTeamShares: poolFundTeamShares_01_28,
      poolFundOperationalShares: poolFundOperationalShares_01_28,
      poolFundReserveShares: poolFundReserveShares_01_28,
    },

    /* period 8-14 days | duration 7 days | summary 2 weeks */
    {
      weekCount: 1, weekCompletenessMultiplier: 0.35,
      poolPersonalShares: poolPersonalShares_01_28,
      poolTimeShares: poolTimeShares_01_28,
      poolReferralShares: poolReferralShares_01_28,
      poolTeamShares: poolTeamShares_01_28,
      poolFundAtAllShares: poolFundAtAllShares_01_28,
      poolFundTeamShares: poolFundTeamShares_01_28,
      poolFundOperationalShares: poolFundOperationalShares_01_28,
      poolFundReserveShares: poolFundReserveShares_01_28,
    },

    /* period 15-28 days | 2 weeks | summary 4 weeks */
    {
      weekCount: 2, weekCompletenessMultiplier: 100.0,
      poolPersonalShares: poolPersonalShares_01_28,
      poolTimeShares: poolTimeShares_01_28,
      poolReferralShares: poolReferralShares_01_28,
      poolTeamShares: poolTeamShares_01_28,
      poolFundAtAllShares: poolFundAtAllShares_01_28,
      poolFundTeamShares: poolFundTeamShares_01_28,
      poolFundOperationalShares: poolFundOperationalShares_01_28,
      poolFundReserveShares: poolFundReserveShares_01_28,
    },

    /* period 29-56 days | 4 weeks | summary 8 weeks */
    {
      weekCount: 1, weekCompletenessMultiplier: 1.04,
      poolPersonalShares: poolPersonalShares_29_56,
      poolTimeShares: poolTimeShares_29_56,
      poolReferralShares: poolReferralShares_29_56,
      poolTeamShares: poolTeamShares_29_56,
      poolFundAtAllShares: poolFundAtAllShares_29_56,
      poolFundTeamShares: poolFundTeamShares_29_56,
      poolFundOperationalShares: poolFundOperationalShares_29_56,
      poolFundReserveShares: poolFundReserveShares_29_56,
    },
    {
      weekCount: 1, weekCompletenessMultiplier: 1.04,
      poolPersonalShares: poolPersonalShares_29_56,
      poolTimeShares: poolTimeShares_29_56,
      poolReferralShares: poolReferralShares_29_56,
      poolTeamShares: poolTeamShares_29_56,
      poolFundAtAllShares: poolFundAtAllShares_29_56,
      poolFundTeamShares: poolFundTeamShares_29_56,
      poolFundOperationalShares: poolFundOperationalShares_29_56,
      poolFundReserveShares: poolFundReserveShares_29_56,
    },
    {
      weekCount: 1, weekCompletenessMultiplier: 1.04,
      poolPersonalShares: poolPersonalShares_29_56,
      poolTimeShares: poolTimeShares_29_56,
      poolReferralShares: poolReferralShares_29_56,
      poolTeamShares: poolTeamShares_29_56,
      poolFundAtAllShares: poolFundAtAllShares_29_56,
      poolFundTeamShares: poolFundTeamShares_29_56,
      poolFundOperationalShares: poolFundOperationalShares_29_56,
      poolFundReserveShares: poolFundReserveShares_29_56,
    },
    {
      weekCount: 1, weekCompletenessMultiplier: 1.04,
      poolPersonalShares: poolPersonalShares_29_56,
      poolTimeShares: poolTimeShares_29_56,
      poolReferralShares: poolReferralShares_29_56,
      poolTeamShares: poolTeamShares_29_56,
      poolFundAtAllShares: poolFundAtAllShares_29_56,
      poolFundTeamShares: poolFundTeamShares_29_56,
      poolFundOperationalShares: poolFundOperationalShares_29_56,
      poolFundReserveShares: poolFundReserveShares_29_56,
    },

    /* period 57-105 days | 7 weeks | summary 15 weeks */
    {
      weekCount: 7, weekCompletenessMultiplier: 1.04,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 106-196 days | duration 3 months | summary 28 weeks */
    {
      weekCount: 13, weekCompletenessMultiplier: 1.02,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 197-287 days | duration 3 months | summary 41 weeks */
    {
      weekCount: 13, weekCompletenessMultiplier: 1.01,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 288-378 days | duration 3 months | summary 54 weeks */
    {
      weekCount: 13, weekCompletenessMultiplier: 1.0,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 379-560 days | duration 6 months | summary 80 weeks */
    {
      weekCount: 26, weekCompletenessMultiplier: 0.9995,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 561-742 days | duration 6 months | summary 106 weeks */
    {
      weekCount: 26, weekCompletenessMultiplier: 0.999,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 743-924 days | duration 6 months | summary 132 weeks */
    {
      weekCount: 26, weekCompletenessMultiplier: 0.9985,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 925-1106 days | duration 6 months | summary 158 weeks */
    {
      weekCount: 26, weekCompletenessMultiplier: 0.998,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 1107-1470 days | duration 1 year | summary 210 weeks */
    {
      weekCount: 52, weekCompletenessMultiplier: 0.9975,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 1471-1834 days | duration 1 year | summary 262 weeks */
    {
      weekCount: 52, weekCompletenessMultiplier: 0.997,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 1835-2198 days | duration 1 year | summary 314 weeks */
    {
      weekCount: 52, weekCompletenessMultiplier: 0.9965,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 2199-2562 days | duration 1 year | summary 366 weeks */
    {
      weekCount: 52, weekCompletenessMultiplier: 0.996,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 2563-2926 days | duration 1 year | summary 418 weeks */
    {
      weekCount: 52, weekCompletenessMultiplier: 0.997,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 2927-3654 days | duration 2 year | summary 522 weeks */
    {
      weekCount: 104, weekCompletenessMultiplier: 0.998,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 3655-5110 days | duration 4 years | summary 730 weeks */
    {
      weekCount: 208, weekCompletenessMultiplier: 0.999,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 5111-8022 days | duration 8 years | summary 1146 weeks */
    {
      weekCount: 416, weekCompletenessMultiplier: 0.9995,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 8023-22582 days | duration 40 years | summary 3226 weeks */
    {
      weekCount: 2080, weekCompletenessMultiplier: 0.9999,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },

    /* period 22583-26096 days | duration 10 years (without 18 weeks) | summary 3728 weeks */
    {
      weekCount: 502, weekCompletenessMultiplier: 0.99995,
      poolPersonalShares: poolPersonalShares_57_xx,
      poolTimeShares: poolTimeShares_57_xx,
      poolReferralShares: poolReferralShares_57_xx,
      poolTeamShares: poolTeamShares_57_xx,
      poolFundAtAllShares: poolFundAtAllShares_57_xx,
      poolFundTeamShares: poolFundTeamShares_57_xx,
      poolFundOperationalShares: poolFundOperationalShares_57_xx,
      poolFundReserveShares: poolFundReserveShares_57_xx,
    },
  ];

  return mintScheduleItems;
}


export function min(num1: number, num2: number): number {
  if (num1 < num2) return num1;
  return num2;
}

export interface IMintScheduleState {
  time: number;
  itemIndex: number;
  weekIndex: number;
  weekStartTime: number;
  nextTickSupply: BigNumber;
}

export function getRewardRateNext24h(time: number, pool: number): BigNumber {
  const timePlusDay = time + DAY;

  const items: IMintScheduleItem[] = mintScheduleItems;
  let state: IMintScheduleState = {
    time: 0,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  // Если время еще не настало
  if (time < DISTRIBUTION_START_TIME)
    return DISTRIBUTION_START_RATE
      .mul(items[0].poolShares[pool] * 1000000)
      .div(1000000);

  // Перематываем items до текущего момента
  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    state = persistStateChange(state, item, boundary);
  }

  // Считаем сколько будет вознаграждений за следующие 24 часа
  let tokenSupply = BigNumber.from(0);
  while (timePlusDay > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(timePlusDay, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item.poolShares[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChange(state, item, boundary);
  }

  return tokenSupply;
}


export function getRewardRateNext24hV2(time: number, poolName: string): BigNumber {
  const timePlusDay = time + DAY;
  let pool: string = poolName;
  switch (poolName) {
    case 'personal': pool = 'poolPersonalShares'; break;
    case 'time': pool = 'poolTimeShares'; break;
    case 'referral': pool = 'poolReferralShares'; break;
    case 'team': pool = 'poolTeamShares'; break;
    case 'fundAtAll': pool = 'poolFundAtAllShares'; break;
    case 'fundTeam': pool = 'poolFundTeamShares'; break;
    case 'fundOperational': pool = 'poolFundOperationalShares'; break;
    case 'fundReserve': pool = 'poolFundReserveShares'; break;
  }

  const items: IMintScheduleItemV2[] = getMintScheduleItemsV2();
  let state: IMintScheduleState = {
    time: 0,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  // Если время еще не настало
  if (time < DISTRIBUTION_START_TIME)
    return DISTRIBUTION_START_RATE
      .mul(items[0][pool] * 1000000)
      .div(1000000);

  // Перематываем items до текущего момента
  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    state = persistStateChangeV2(state, item, boundary);
  }

  // Считаем сколько будет вознаграждений за следующие 24 часа
  let tokenSupply = BigNumber.from(0);
  while (timePlusDay > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(timePlusDay, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChangeV2(state, item, boundary);
  }

  return tokenSupply;
}


export function getRewardRateNext7DV2(time: number, poolName: string): BigNumber {
  const timePlusDay = time + 7 * DAY;

  let pool: string = poolName;
  switch (poolName) {
    case 'personal': pool = 'poolPersonalShares'; break;
    case 'time': pool = 'poolTimeShares'; break;
    case 'referral': pool = 'poolReferralShares'; break;
    case 'team': pool = 'poolTeamShares'; break;
    case 'fundAtAll': pool = 'poolFundAtAllShares'; break;
    case 'fundTeam': pool = 'poolFundTeamShares'; break;
    case 'fundOperational': pool = 'poolFundOperationalShares'; break;
    case 'fundReserve': pool = 'poolFundReserveShares'; break;
  }

  const items: IMintScheduleItemV2[] = getMintScheduleItemsV2();
  let state: IMintScheduleState = {
    time: 0,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  // Если время еще не настало
  if (time < DISTRIBUTION_START_TIME)
    return DISTRIBUTION_START_RATE
      .mul(items[0][pool] * 1000000)
      .div(1000000);

  // Перематываем items до текущего момента
  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    state = persistStateChangeV2(state, item, boundary);
  }

  // Считаем сколько будет вознаграждений за следующие 24 часа
  let tokenSupply = BigNumber.from(0);
  while (timePlusDay > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(timePlusDay, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChangeV2(state, item, boundary);
  }

  return tokenSupply;
}



export function getRewardRateNext30DV2(time: number, poolName: string): BigNumber {
  const timePlusDay = time + 30 * DAY;

  let pool: string = poolName;
  switch (poolName) {
    case 'personal': pool = 'poolPersonalShares'; break;
    case 'time': pool = 'poolTimeShares'; break;
    case 'referral': pool = 'poolReferralShares'; break;
    case 'team': pool = 'poolTeamShares'; break;
    case 'fundAtAll': pool = 'poolFundAtAllShares'; break;
    case 'fundTeam': pool = 'poolFundTeamShares'; break;
    case 'fundOperational': pool = 'poolFundOperationalShares'; break;
    case 'fundReserve': pool = 'poolFundReserveShares'; break;
  }

  const items: IMintScheduleItemV2[] = getMintScheduleItemsV2();
  let state: IMintScheduleState = {
    time: 0,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  // Если время еще не настало
  if (time < DISTRIBUTION_START_TIME)
    return DISTRIBUTION_START_RATE
      .mul(items[0][pool] * 1000000)
      .div(1000000);

  // Перематываем items до текущего момента
  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    state = persistStateChangeV2(state, item, boundary);
  }

  // Считаем сколько будет вознаграждений за следующие 24 часа
  let tokenSupply = BigNumber.from(0);
  while (timePlusDay > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(timePlusDay, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChangeV2(state, item, boundary);
  }

  return tokenSupply;
}



function persistStateChange(
  state: IMintScheduleState,
  item: IMintScheduleItem,
  time: number
): IMintScheduleState {
  state.time = time;

  // Начало новой недели
  if (time === state.weekStartTime + WEEK_DURATION) {
    // Изменяем количество дневных ревардов в этой неделе
    state.nextTickSupply = state.nextTickSupply
      .mul(item.weekCompletenessMultiplier * 1000000)
      .div(1000000);

    // Переключаем неделю, и указываем время ее начала
    state.weekIndex++;
    state.weekStartTime = time;

    // Если недели одного периода (item) закончились,
    // переключаем на следующий период.
    if (state.weekIndex === item.weekCount) {
      state.weekIndex = 0;
      state.itemIndex++;
    }
  }
  return state;
}

function persistStateChangeV2(
  state: IMintScheduleState,
  item: IMintScheduleItemV2,
  time: number
): IMintScheduleState {
  state.time = time;

  // Начало новой недели
  if (time === state.weekStartTime + WEEK_DURATION) {
    // Изменяем количество дневных ревардов в этой неделе
    state.nextTickSupply = state.nextTickSupply
      .mul(item.weekCompletenessMultiplier * 1000000)
      .div(1000000);

    // Переключаем неделю, и указываем время ее начала
    state.weekIndex++;
    state.weekStartTime = time;

    // Если недели одного периода (item) закончились,
    // переключаем на следующий период.
    if (state.weekIndex === item.weekCount) {
      state.weekIndex = 0;
      state.itemIndex++;
    }
  }
  return state;
}

export function getCurrentTokenSupply(
  mintScheduleState: IMintScheduleState,
  time: number,
  pool: number,
): BigNumber {
  let tokenSupply = BigNumber.from(0);
  const items: IMintScheduleItem[] = mintScheduleItems;
  let state: IMintScheduleState = {
    time: mintScheduleState.time,
    itemIndex: mintScheduleState.itemIndex,
    weekIndex: mintScheduleState.weekIndex,
    weekStartTime: mintScheduleState.weekStartTime,
    nextTickSupply: mintScheduleState.nextTickSupply,
  };

  if (time <= state.time)
    return tokenSupply;

  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item.poolShares[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChange(state, item, boundary);
  }
  return tokenSupply;
}

export function getCurrentTokenSupplyV2(
  mintScheduleState: IMintScheduleState,
  time: number,
  poolName: string,
): BigNumber {
  let pool: string = poolName;
  switch (poolName) {
    case 'personal': pool = 'poolPersonalShares'; break;
    case 'time': pool = 'poolTimeShares'; break;
    case 'referral': pool = 'poolReferralShares'; break;
    case 'team': pool = 'poolTeamShares'; break;
    case 'fundAtAll': pool = 'poolFundAtAllShares'; break;
    case 'fundTeam': pool = 'poolFundTeamShares'; break;
    case 'fundOperational': pool = 'poolFundOperationalShares'; break;
    case 'fundReserve': pool = 'poolFundReserveShares'; break;
  }

  let tokenSupply = BigNumber.from(0);
  const items: IMintScheduleItemV2[] = getMintScheduleItemsV2();
  let state: IMintScheduleState = {
    time: mintScheduleState.time,
    itemIndex: mintScheduleState.itemIndex,
    weekIndex: mintScheduleState.weekIndex,
    weekStartTime: mintScheduleState.weekStartTime,
    nextTickSupply: mintScheduleState.nextTickSupply,
  };

  if (time <= state.time)
    return tokenSupply;

  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .mul(item[pool] * 1000000)
      .div(1000000)
      .add(tokenSupply);
    state = persistStateChangeV2(state, item, boundary);
  }
  return tokenSupply;
}

export function getTotalFarmedToTimeV2(
  time: number,
  poolName: string
): BigNumber {
  let state = {
    time: DISTRIBUTION_START_TIME,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  return getCurrentTokenSupplyV2(state, time, poolName);
}

export function getTotalFarmedAtAllV2(
  poolName: string
): BigNumber {
  let state = {
    time: DISTRIBUTION_START_TIME,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  const items: IMintScheduleItemV2[] = getMintScheduleItemsV2();
  let i = 0;
  let weekCount = 0;
  while (i < items.length) {
    weekCount = weekCount + items[i].weekCount;
    i++;
  }
  let time = DISTRIBUTION_START_TIME + weekCount * WEEK_DURATION;

  return getCurrentTokenSupplyV2(state, time, poolName);
}
//

function getTotalFarmedToTime(
  time: number
): BigNumber {
  let tokenSupply = BigNumber.from(0);
  const items = mintScheduleItems;
  let state = {
    time: DISTRIBUTION_START_TIME,
    itemIndex: 0,
    weekIndex: 0,
    weekStartTime: DISTRIBUTION_START_TIME,
    nextTickSupply: DISTRIBUTION_START_RATE_PER_SEC,
  };

  while (time > state.time && state.itemIndex < items.length) {
    const item = items[state.itemIndex];
    const boundary = min(time, state.weekStartTime + WEEK_DURATION);
    const secondsFromLastUpdate = boundary - state.time;

    tokenSupply = state.nextTickSupply
      .mul(secondsFromLastUpdate)
      .add(tokenSupply);

    state = persistStateChange(state, item, boundary);
  }
  return tokenSupply;
}








function getAPY(P: BN, I: BN) {
  // https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  // P - вложенные средства
  // I - сколько заработал
  // A= P+I
  const A = P.plus(I);

  const d1div365 = 0.00273972602739726027;
  //const p1div365 = new BN(1).dividedBy(365).toNumber();
  // 0.00273972602739726027
  // 2.73972602739726027e-3

  const AdivP = parseFloat(A.dividedBy(P).toString());

  const r = 365 * (Math.pow(AdivP, d1div365) - 1);

  const R = r * 100;

  return R;
}


function yearEarnNoReinvestment(invest: BN, share: BN) {
  // P - вложенные средства
  // share - доля пула
  // I - сколько заработал
  let P = new BN(invest);
  let Itokens = new BN(0);
  let day = 0;
  let timestamp = Math.floor(Date.now() / 1000);
  while (day < 365) {
    const timeNow = timestamp + day * 24 * 60 * 60;
    const poolRate1Day: string = utils.formatEther(getRewardRateNext24hV2(timeNow, 'personal'));
    const earn1Day: BN = share.multipliedBy(poolRate1Day);
    Itokens = Itokens.plus(earn1Day);
    day++;
  }
  return { P, I: Itokens };
}

function yearEarnWeeklyReinvestment(invest: BN, tokenPrice: BN, lpPrice: BN, totalStaked: BN) {
  // P - вложенные средства
  // share - доля пула
  // I - сколько заработал
  let P = new BN(invest);
  let PAdditional = new BN(0);
  let Itokens = new BN(0);


  let staked = totalStaked;
  let amountLp = invest.dividedBy(lpPrice);
  let share = amountLp.dividedBy(staked);

  let day = 0;
  let timestamp = Math.floor(Date.now() / 1000);
  let week = 0;
  while (day < 365) {
    //console.log('day', day, 'week', week);

    const timeNow = timestamp + day * 24 * 60 * 60;
    const poolRate1Day: string = utils.formatEther(getRewardRateNext24hV2(timeNow, 'personal'));
    const earn1Day: BN = share.multipliedBy(poolRate1Day);
    Itokens = Itokens.plus(earn1Day);

    if (week === 6) {
      const ItokensInUsd = Itokens.multipliedBy(tokenPrice);
      //P = P.plus(ItokensInUsd); // по сути к токенам он доставляет такую же сумму в баксах
      PAdditional = PAdditional.plus(ItokensInUsd); // по сути к токенам он доставляет такую же сумму в баксах
      // теперь типа покупаем lp токены,  при условии что цена не меняется за эту неделю, 
      const newLp = ItokensInUsd.multipliedBy(2).dividedBy(lpPrice);
      //const newLp = ItokensInUsd.dividedBy(lpPrice);
      amountLp = amountLp.plus(newLp);
      staked = staked.plus(newLp);
      share = amountLp.dividedBy(staked);

      week = 0;
      Itokens = new BN(0);
    } else {
      week++;
    }

    day++;
  }

  // сумма акивов в итоге
  let I = new BN(0);
  // + стоимость ликвидности
  I = I.plus(amountLp.multipliedBy(lpPrice));
  // + стоимость токенов
  I = I.plus(Itokens.multipliedBy(tokenPrice));
  I = I.minus(PAdditional); //1,015%
  // 1,014%

  return { P, I };
}



function yearEarnMonthlyReinvestment(invest: BN, tokenPrice: BN, lpPrice: BN, totalStaked: BN) {
  // P - вложенные средства
  // share - доля пула
  // I - сколько заработал
  let P = new BN(invest);
  let PAdditional = new BN(0);
  let Itokens = new BN(0);


  let staked = totalStaked;
  let amountLp = invest.dividedBy(lpPrice);
  let share = amountLp.dividedBy(staked);

  let day = 0;
  let timestamp = Math.floor(Date.now() / 1000);
  let month = 0;
  while (day < 365) {
    //console.log('day', day, 'week', week);

    const timeNow = timestamp + day * 24 * 60 * 60;
    const poolRate1Day: string = utils.formatEther(getRewardRateNext24hV2(timeNow, 'personal'));
    const earn1Day: BN = share.multipliedBy(poolRate1Day);
    Itokens = Itokens.plus(earn1Day);

    if (month === 29) {
      const ItokensInUsd = Itokens.multipliedBy(tokenPrice);
      //P = P.plus(ItokensInUsd); // по сути к токенам он доставляет такую же сумму в баксах
      PAdditional = PAdditional.plus(ItokensInUsd); // по сути к токенам он доставляет такую же сумму в баксах
      // теперь типа покупаем lp токены,  при условии что цена не меняется за эту неделю, 
      const newLp = ItokensInUsd.multipliedBy(2).dividedBy(lpPrice);
      //const newLp = ItokensInUsd.dividedBy(lpPrice);
      amountLp = amountLp.plus(newLp);
      staked = staked.plus(newLp);
      share = amountLp.dividedBy(staked);

      month = 0;
      Itokens = new BN(0);
    } else {
      month++;
    }

    day++;
  }

  // сумма акивов в итоге
  let I = new BN(0);
  // + стоимость ликвидности
  I = I.plus(amountLp.multipliedBy(lpPrice));
  // + стоимость токенов
  I = I.plus(Itokens.multipliedBy(tokenPrice));
  I = I.minus(PAdditional); //1,015%
  // 1,014%

  return { P, I };
}


export function getRoiData(tokenPrice: string, lpPrice: string, totalStakedLp: string) {
  const tokenPriceBN = new BN(tokenPrice);
  const lpPriceBN = new BN(lpPrice);
  const totalStakedLpBN = new BN(totalStakedLp);

  const timestamp = Math.floor(Date.now() / 1000);
  const amountUsdInvest = new BN('1000');

  const poolRate1DayPersonal = utils.formatEther(getRewardRateNext24hV2(timestamp, 'personal'));

  const poolRate7DayPersonal = utils.formatEther(getRewardRateNext7DV2(timestamp, 'personal'));

  const poolRate30DayPersonal = utils.formatEther(getRewardRateNext30DV2(timestamp, 'personal'));

  const initAmountLp = amountUsdInvest.dividedBy(lpPriceBN);
  const initAmountFarmShare = initAmountLp.dividedBy(totalStakedLpBN);

  const rewards1Day = initAmountFarmShare.multipliedBy(poolRate1DayPersonal);
  const roi1DaySum = rewards1Day.multipliedBy(tokenPriceBN);
  const roi1Day = roi1DaySum.dividedBy(amountUsdInvest).multipliedBy(100).toString();

  const rewards7Day = initAmountFarmShare.multipliedBy(poolRate7DayPersonal);
  const roi7DaySum = rewards7Day.multipliedBy(tokenPriceBN);
  const roi7Day = roi7DaySum.dividedBy(amountUsdInvest).multipliedBy(100).toString();

  const rewards30Day = initAmountFarmShare.multipliedBy(poolRate30DayPersonal);
  const roi30DaySum = rewards30Day.multipliedBy(tokenPriceBN);
  const roi30Day = roi30DaySum.dividedBy(amountUsdInvest).multipliedBy(100).toString();


  const PI1 = yearEarnNoReinvestment(amountUsdInvest, initAmountFarmShare);
  let apyNoReinvestment = getAPY(
    PI1.P, PI1.I.multipliedBy(tokenPriceBN).plus(PI1.P)
  );

  const PI2 = yearEarnWeeklyReinvestment(amountUsdInvest, tokenPriceBN, lpPriceBN, totalStakedLpBN);
  let apyWeeklyReinvestment = getAPY(
    PI2.P, PI2.I
  );

  const PI3 = yearEarnMonthlyReinvestment(amountUsdInvest, tokenPriceBN, lpPriceBN, totalStakedLpBN);
  let apyMonthlyReinvestment = getAPY(
    PI3.P, PI3.I
  );

  const roiData = {
    roi1Day: roi1Day,
    roi1DayEarn: roi1DaySum.toString(),
    roi7Day: roi7Day,
    roi7DayEarn: roi7DaySum.toString(),
    roi30Day: roi30Day,
    roi30DayEarn: roi30DaySum.toString(),
    apyNoReinvestment: apyNoReinvestment,
    apyWeeklyReinvestment: apyWeeklyReinvestment,
    apyMonthlyReinvestment: apyMonthlyReinvestment,
    timestamp,
  };
  console.log('roiData', roiData)
  return roiData;
}


// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const PREFIXES: { [chainId in ChainId]: string } = {
  // ETH
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
  // BSC
  56: '',
  97: 'testnet.',
};

export function getAnyScanSuffix(data: string, type: 'transaction' | 'token' | 'address'): string {
  switch (type) {
    case 'transaction': {
      return `/tx/${data}`;
    }
    case 'token': {
      return `/token/${data}`;
    }
    case 'address':
    default: {
      return `/address/${data}`;
    }
  }
}

export function getBscScanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://${PREFIXES[chainId] || PREFIXES[ChainId.BSC_MAINNET]}bscscan.com`;
  const suffix = getAnyScanSuffix(data, type);
  return prefix + suffix;
}

export function getEtherScanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
  const prefix = `https://${PREFIXES[chainId] || PREFIXES[ChainId.ETH_MAINNET]}etherscan.io`;
  const suffix = getAnyScanSuffix(data, type);
  return prefix + suffix;
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
}

/*
// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(Math.floor(num)), JSBI.BigInt(10000))
}

export function calculateSlippageAmount(value: CurrencyAmount, slippage: number): [JSBI, JSBI] {
  if (slippage < 0 || slippage > 10000) {
    throw Error(`Unexpected slippage value: ${slippage}`)
  }
  return [
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 - slippage)), JSBI.BigInt(10000)),
    JSBI.divide(JSBI.multiply(value.raw, JSBI.BigInt(10000 + slippage)), JSBI.BigInt(10000))
  ]
}
*/

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

// account is optional
/*
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account);
}
*/

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/*
export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === ETHER) return true;
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address]);
}
*/


export const switchNetworkToBscRequestData = {
  id: 1, jsonrpc: '2.0', method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x38', chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: { name: 'Binance Smart Chain Mainnet Native Token', symbol: 'BNB', decimals: 18, },
    rpcUrls: ['https://bsc-dataseed1.ninicoin.io/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    //iconUrls: ['https://avatars.githubusercontent.com/u/45615063'],
  }]
};

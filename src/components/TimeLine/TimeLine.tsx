import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Divider, Header, } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Connect from '../Connect/Connect';
import Number from '../Number';
import * as S from '../../store/selectors';
import './TimeLine.scss';
import RoiModal from '../RoiModal';



const TimeLine: React.FC<any> = (props) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const stage = props.stage;

  return (

  <div>
  <p className={`tl ${stage == 1 ? 'timeline_current' : stage > 1 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 1 ? t('ForSale') : stage > 1 ? t('StageCompleted') : t('coming_soon', {stage:"1"})}
   10 000 000 {t('tokensFor')} 0.01 USDT</p>
  <p className={`tl ${stage == 2 ? 'timeline_current' : stage > 2 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 2 ? t('ForSale') : stage > 2 ? t('StageCompleted') : t('coming_soon', {stage:"2"})}
   9 333 333 {t('tokensFor')} 0.03 USDT</p>
  <p className={`tl ${stage == 3 ? 'timeline_current' : stage > 3 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 3 ? t('ForSale') : stage > 3 ? t('StageCompleted') : t('coming_soon', {stage:"3"})}
   8 666 667 {t('tokensFor')} 0.05 USDT</p>
  <p className={`tl ${stage == 4 ? 'timeline_current' : stage > 4 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 4 ? t('ForSale') : stage > 4 ? t('StageCompleted') : t('coming_soon', {stage:"4"})}
   8 000 000 {t('tokensFor')} 0.07 USDT</p>
  <p className={`tl ${stage == 5 ? 'timeline_current' : stage > 5 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 5 ? t('ForSale') : stage > 5 ? t('StageCompleted') : t('coming_soon', {stage:"5"})}
   7 333 333 {t('tokensFor')} 0.09 USDT</p>
  <p className={`tl ${stage == 6 ? 'timeline_current' : stage > 6 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 6 ? t('ForSale') : stage > 6 ? t('StageCompleted') : t('coming_soon', {stage:"6"})}
   6 666 667 {t('tokensFor')} 0.15 USDT</p>
  <p className={`tl ${stage == 7 ? 'timeline_current' : stage > 7 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 7 ? t('ForSale') : stage > 7 ? t('StageCompleted') : t('coming_soon', {stage:"7"})}
   6 000 000 {t('tokensFor')} 0.20 USDT</p>
  <p className={`tl ${stage == 8 ? 'timeline_current' : stage > 8 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 8 ? t('ForSale') : stage > 8 ? t('StageCompleted') : t('coming_soon', {stage:"8"})}
   5 333 333 {t('tokensFor')} 0.30 USDT</p>
  <p className={`tl ${stage == 9 ? 'timeline_current' : stage > 9 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 9 ? t('ForSale') : stage > 9 ? t('StageCompleted') : t('coming_soon', {stage:"9"})}
   4 666 667 {t('tokensFor')} 0.40 USDT</p>
  <p className={`tl ${stage == 10 ? 'timeline_current' : stage > 10 ? 'timeline_over' : 'timeline_future'}`} >
  {stage == 10 ? t('ForSale') : stage > 10 ? t('StageCompleted') : t('coming_soon', {stage:"10"})}
   4 000 000 {t('tokensFor')} 0.50 USDT</p>

 </div>

  );
};
export default TimeLine;


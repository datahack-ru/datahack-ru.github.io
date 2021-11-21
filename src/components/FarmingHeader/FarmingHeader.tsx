import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Divider, Header, } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { getAdaptiveClassName, mobileBreakpoint } from '../../helpers/Media';
import Connect from '../../components/Connect/Connect';
import Number from '../../components/Number';
import * as S from '../../store/selectors';
import FarmingMenu from './FarmingMenu';
import './FarmingHeader.scss';
import RoiModal from '../RoiModal';



const FarmingHeader: React.FC<any> = (props) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();


  const isWsConnected: boolean = useSelector((state) => S.data.isWsConnected(state));
  const bscData: any = useSelector((state) => S.data.getBscData(state));
  const bscData2: any = useSelector((state) => S.binance.getBscData(state));

  let cclpPrice = '0';
  let cclpUsdtTotalLiquidity = '0';

  // еще бы сравнивать номер блока для большей достоверности
  if (isWsConnected && bscData) {
    // данные с сервера
    cclpPrice = bscData.cclpPrice;
    cclpUsdtTotalLiquidity = bscData.cclpUsdtTotalLiquidity;
  } else if (bscData2) {
    // данные из блокчейна которые собираются через браузер пользователя
    cclpPrice = bscData2.cclpPrice;
    cclpUsdtTotalLiquidity = bscData2.cclpUsdtTotalLiquidity;
  }

  return (
    <div>
      <Connect />
      {/*<Header as='h1' content={t('Farming').toUpperCase()} className='shadow' style={{ color: '#ffae00' }} />*/}
      <br /><br /><br /><br /><br /><br />


      <p style={{ backgroundColor: 'rgba(10,25,54,.60)', }}>
        CCLP <span style={{ color: '#ffae00' }} >
          <Number prefix='$' value={cclpPrice} decimalScale={12} />
        </span>
        <br />
        <div>
          <RoiModal isHeader /> | {t('Total liquidity')} <span style={{ color: '#ffae00' }} >
            <Number prefix='$' value={cclpUsdtTotalLiquidity} decimalScale={2} />
          </span>
        </div>
        <br /><br />
      </p>

      <FarmingMenu style={{ backgroundColor: 'rgba(10,25,54,.60)', marginTop: '60px' }} />
    </div>
  );
};

export default hot(module)(FarmingHeader);

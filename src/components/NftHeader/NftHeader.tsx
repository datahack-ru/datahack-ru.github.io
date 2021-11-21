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
import NftMenu from './NftMenu';
import './NftMenu.scss';
import RoiModal from '../RoiModal';



const FarmingHeader: React.FC<any> = (props) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();


  return (
    <div>
      <Connect />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      <NftMenu style={{ backgroundColor: 'rgba(10,25,54,.60)', marginTop: '60px' }} />
    </div>
  );
};

export default hot(module)(FarmingHeader);

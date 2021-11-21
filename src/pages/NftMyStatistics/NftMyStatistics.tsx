import React from "react";
import { hot } from 'react-hot-loader';
import { useTranslation, Trans } from 'react-i18next';
import { Header, Container, Grid, Image, Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import NftHeader from '../../components/NftHeader';
import "./NftMyStatistics.scss";



import _ from 'lodash';
import { Table } from 'semantic-ui-react';


const PageNftCollections: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();


  return (
    <Page title={`NFT My statistics - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("nft__header", isMobile)}>
        <Container>
          <NftHeader />
        </Container>
      </div>

      <div>
        <br />
        <br />
      </div>
    </Page>
  );
};

export default hot(module)(PageNftCollections);

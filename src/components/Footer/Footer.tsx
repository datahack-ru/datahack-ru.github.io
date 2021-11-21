import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Routes } from "../../router/helper";
import { Grid, Image, Container, List } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import getExternalLinkProps from '../../utils/getExternalLinkProps';

import "./Footer.scss";



const BlockIcons: React.FC = () => (
  <>
    <a
      href="https://t.me/CosmoFundChannel"
      {...getExternalLinkProps()}
    >
      <Image src="/icons/telegram.png" inline />
    </a>
    <a
      href="https://twitter.com/CosmoFund"
      {...getExternalLinkProps()}
    >
      <Image src="/icons/twitter.png" inline />
    </a>
    <a
      href="https://medium.com/@CosmoFund"
      {...getExternalLinkProps()}
    >
      <Image src="/icons/medium.png" inline />
    </a>
  </>
);



const Footer: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();

  return (
    <footer className={getAdaptiveClassName("footer", isMobile)}>
      <div className="footer__bg">
        <Container>
          <div className="footer__icons">
            <BlockIcons />
          </div>

          <div className="footer__links">
            <Grid columns={5} stackable padded>
              {/*
              <Grid.Column>
                <b>{t('My Menu')}</b>
                <List link>
                  <List.Item
                    as={Link}
                    to={Routes.dashboard}
                    {...getExternalLinkProps()}
                  >
                    {t('My Dashboard')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.team}
                    {...getExternalLinkProps()}
                  >
                    {t('My Team')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.wallet}
                    {...getExternalLinkProps()}
                  >
                    {t('My Wallet')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.profile}
                    {...getExternalLinkProps()}
                  >
                    {t('My Profile')}
                  </List.Item>
                </List>
              </Grid.Column>
              */}
              <Grid.Column>
                <b>{t('Farms')}</b>
                <List link>
                  <List.Item
                    as={Link}
                    to={Routes.bscFarm}
                    {...getExternalLinkProps()}
                  >
                    {t('Binance Farms')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.ethFarm}
                    {...getExternalLinkProps()}
                  >
                    {t('Ethereum Farms')}
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column>
                <b>{t('Services')}</b>
                <List link>
                  <List.Item
                    as={Link}
                    to={Routes.exchange}
                    {...getExternalLinkProps()}
                  >
                    {t('Exchange')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.bridge}
                    {...getExternalLinkProps()}
                  >
                    {t('Cross-chain Bridge')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.cupToken}
                    {...getExternalLinkProps()}
                  >
                    Cosmo Universal Power (CUP)
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column>
                <b>CosmoFund NFTs</b>
                <List link>
                  <List.Item
                    as={'a'}
                    href={'https://opensea.io/assets/cosmomasks-main-collection'}
                    {...getExternalLinkProps()}
                  >
                    CosmoMasks
                  </List.Item>
                  {/*<List.Item
                    as={'a'}
                    href={'https://opensea.io/assets/cosmomasks-limited-pack'}
                    {...getExternalLinkProps()}
                  >
                    CosmoMasks Limited Pack
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={'https://opensea.io/assets/maskformusk'}
                    {...getExternalLinkProps()}
                  >
                    MaskForMusk
                  </List.Item>*/}
                  <List.Item
                    as={'a'}
                    href={'https://opensea.io/assets/cosmobugs'}
                    {...getExternalLinkProps()}
                  >
                    CosmoBugs
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={'https://opensea.io/collection/cosmodoodle'}
                    {...getExternalLinkProps()}
                  >
                    CosmoDoodle
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={'https://opensea.io/collection/cosmoart'}
                    {...getExternalLinkProps()}
                  >
                    CosmoArt
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={Routes.nft}
                    {...getExternalLinkProps()}
                  >
                    {t('More')}...
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column>
                <b>{t('Info')}</b>
                <List link>
                  <List.Item
                    as={Link}
                    to={'#'}
                  //to={Routes.about}
                  //{...getExternalLinkProps()}
                  >
                    {t('About')}
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={'/cosmofund_whitepaper.pdf'}
                    {...getExternalLinkProps()}
                  >
                    {t('Whitepaper')}
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={"/" + i18n.language + "/cosmofund_roadmap.pdf"}
                    {...getExternalLinkProps()}
                  >
                    {t('Roadmap')}
                  </List.Item>
                  <List.Item
                    as={'a'}
                    href={"/cosmofund_marketing_plan.pdf"}
                    {...getExternalLinkProps()}
                  >
                    {t('Marketing plan')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={'#'}
                  //to={Routes.tokenomics}
                  //{...getExternalLinkProps()}
                  >
                    {t('Tokenomics')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={'#'}
                  //to={Routes.faq}
                  //{...getExternalLinkProps()}
                  >
                    {t('FAQ')}
                  </List.Item>
                  <List.Item
                    as={Link}
                    to={'#'}
                  //to={Routes.contracts}
                  //{...getExternalLinkProps()}
                  >
                    {t('Smart Contracts')}
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </div>

          <div className="footer__banner">
            <div className="footer__copyright">
              <List link horizontal={!isMobile}>
                <List.Item
                  as={'a'}
                  href={'https://cosmofund.space/'}
                  {...getExternalLinkProps()}
                >
                  {t('copyright', { year: new Date().getFullYear() })}{"\u00A0 "}
                </List.Item>
              </List>

              <List link horizontal={!isMobile}>
                <List.Item
                  as={Link}
                  to={'#'}
                //to={Routes.terms}
                //{...getExternalLinkProps()}
                >
                  {t('Terms and Conditions')}
                </List.Item>
                <List.Item
                  as={Link}
                  to={'#'}
                //to={Routes.privacy}
                //{...getExternalLinkProps()}
                >
                  {t('Privacy Policy')}
                </List.Item>
                <List.Item
                  as={'a'}
                  href='mailto:support@cosmofund.space'
                  {...getExternalLinkProps()}
                >
                  {t('Contact Us')}
                </List.Item>
                <List.Item
                  as={Link}
                  to={'#'}
                //to={Routes.disclaimer}
                //{...getExternalLinkProps()}
                >
                  {t('Disclaimer')}
                </List.Item>
              </List>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { Header, Container, Grid, Image, Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import "./SmartContracts.scss";



const SmartContracts: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();

  return (
    <Page title={`${t('Smart Contracts')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("scontracts__header", isMobile)}>
        <Container>
          <Header as="h1" content={t('Smart Contracts')} />
        </Container>
      </div>

      <div className={getAdaptiveClassName("scontracts__section-1", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <p>
                <Header as="h2" content="CosmoMasks" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasks1'>
                  website <a
                    href='https://thecosmomasks.com/'
                    {...getExternalLinkProps()}
                  >TheCosmoMasks.com</a> and
                  on the <a
                    href='https://opensea.io/collection/cosmomasks-main-collection'
                    {...getExternalLinkProps()}
                  >OpenSea.io</a>
                </Trans>
              </p>
              <p>
                <Header as="h2" content="CosmoMasks Power" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasks2'></Trans>
              </p>
              <p>
                <Header as="h2" content="CosmoSwap Bonus" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasks3'></Trans>
              </p>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/mask-1.png" alt="CosmoMasks" centered />
            </Grid.Column>
          </Grid>

          <div
            className={getAdaptiveClassName("scontracts__button-wrapper", isMobile)}
          >
            <Button
              className="btn-buy"
              as={'a'} href='https://thecosmomasks.com/'
              {...getExternalLinkProps()}
            >
              {t('Buy')} CosmoMasks
            </Button>
          </div>
        </Container>
      </div>

      <div className={getAdaptiveClassName("scontracts__section-2", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            {!isMobile && (
              <Grid.Column>
                <Image src="/images/mask-2.png" alt="CosmoMasks Limited Pack" centered />
              </Grid.Column>
            )}
            <Grid.Column>
              <p>
                <Header as="h2" content="CosmoMasks Limited Pack" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasksLp1'>
                  on <a
                    href='https://opensea.io/collection/cosmomasks-limited-pack'
                    {...getExternalLinkProps()}
                  >OpenSea.io</a>
                </Trans>
              </p>
              <p>
                <Header as="h2" content="CosmoSwap Bonus" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasksLp2'></Trans>
              </p>
            </Grid.Column>
            {isMobile && (
              <Grid.Column>
                <Image src="/images/mask-2.png" alt="CosmoMasks Limited Pack" centered />
              </Grid.Column>
            )}
          </Grid>
          <div
            className={getAdaptiveClassName("scontracts__button-wrapper", isMobile)}
          >
            <Button className="btn-buy"
              as='a'
              href='https://opensea.io/collection/cosmomasks-limited-pack'
              {...getExternalLinkProps()}
            >
              {t('buyOnOpenSea', { name: 'CosmoMasks Limited Pack' })}
            </Button>
          </div>
        </Container>
      </div>

      <div className={getAdaptiveClassName("scontracts__section-3", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <p>
                <Header as="h2" content="MaskForMusk" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasksMFM1'>
                  on <a
                    href='https://opensea.io/collection/maskformusk'
                    {...getExternalLinkProps()}
                  >OpenSea.io</a>
                </Trans>
              </p>
              <p>
                <Header as="h2" content="CosmoSwap Bonus" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoMasksMFM2'></Trans>
              </p>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/mask-3.png" alt="MaskForMusk" centered />
            </Grid.Column>
          </Grid>
          <div
            className={getAdaptiveClassName("scontracts__button-wrapper", isMobile)}
          >
            <Button className="btn-buy"
              as='a'
              href='https://opensea.io/collection/maskformusk'
              {...getExternalLinkProps()}
            >
              {t('buyOnOpenSea', { name: 'MaskForMusk' })}
            </Button>
          </div>
        </Container>
      </div>

      <div className={getAdaptiveClassName("scontracts__section-2", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            {!isMobile && (
              <Grid.Column>
                <Image src="/images/mask-4.png" alt="CosmoBugs" centered />
              </Grid.Column>
            )}
            <Grid.Column>
              <p>
                <Header as="h2" content="CosmoBugs" />
                <Trans i18n={i18n} i18nKey='nftDescCosmoBugs1'>
                  website <a
                    href='https://cosmobugs.com/'
                    {...getExternalLinkProps()}
                  >CosmoBugs.com</a> and
                  on the <a
                    href='https://opensea.io/collection/cosmobugs'
                    {...getExternalLinkProps()}
                  >OpenSea.io</a>
                </Trans>
              </p>
              <p></p>
            </Grid.Column>
            {isMobile && (
              <Grid.Column>
                <Image src="/images/mask-4.png" alt="CosmoBugs" centered />
              </Grid.Column>
            )}
          </Grid>
          <div
            className={getAdaptiveClassName("scontracts__button-wrapper", isMobile)}
          >
            <Button className="btn-buy"
              as='a'
              href='https://opensea.io/collection/cosmobugs'
              {...getExternalLinkProps()}
            >
              {t('buyOnOpenSea', { name: 'CosmoBugs' })}
            </Button>
          </div>
        </Container>
      </div>

    </Page>
  );
};

export default SmartContracts;

import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { Header, Container, Grid, Image, Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import "./CosmoVirtual.scss";



const CosmoVirtual: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();

  return (
    <Page title={`CosmoVirtual - ${t('projectTitle')}`}>
        <Container>
        <Image src="/images/cv_header.png" alt="CosmoVirtual" centered />
        </Container>
      <div >
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <p>
                <Header as="h3" content="${t(cv1)}"/>
                <Trans i18n={i18n} i18nKey='cv1'>
                 </Trans>
              </p>
            </Grid.Column>
            <Grid.Column>
             <Image src="/images/cv_1.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            </Grid>
           
          <Grid columns="equal" stackable>
            <Grid.Column>
             <Image src="/images/cv_2.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            <Grid.Column>
              <p>
                <Trans i18n={i18n} i18nKey='cv2'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            <Grid columns="equal" stackable>
            <Grid.Column>
              <p>
                <Trans i18n={i18n} i18nKey='cv3'>
                 </Trans>
              </p>
            </Grid.Column>
            <Grid.Column>
             <Image src="/images/cv_3.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            </Grid>
           
          <Grid columns="equal" stackable>
            <Grid.Column>
             <Image src="/images/cv_4.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            <Grid.Column>
              <p>
                <Trans i18n={i18n} i18nKey='cv4'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            <Grid columns="equal" stackable>
            <Grid.Column>
              <p>
                <Trans i18n={i18n} i18nKey='cv5'>
                 </Trans>
              </p>
            </Grid.Column>
            <Grid.Column>
             <Image src="/images/cv_5.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            </Grid>
           
          <Grid columns="equal" stackable>
            <Grid.Column>
             <Image src="/images/cv_6.png" alt="CosmoVirtual" centered />
            </Grid.Column>
            <Grid.Column>
              <p>
                <Trans i18n={i18n} i18nKey='cv6'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            
          <Container>
            <p>${t('cv7')}</p>
            <p>${t('cv7.1')}</p>
            <p>${t('cv7.2')}</p>
            <p>${t('cv7.3')}</p>
            <p>${t('cv7.4')}</p>
            <p>${t('cv7.5')}</p>
            <p>${t('cv7.6')}</p>
          
          </Container>  
            
          <div
            className={getAdaptiveClassName("nft__button-wrapper", isMobile)}
          >
            <Button
              className="btn-buy"
              as={'a'} href='https://thecosmomasks.com/'
              {...getExternalLinkProps()}
            >
              {t('BuyCV')} </Button>
          </div>
        
      </Container>
      </div>
    </Page>
  );
};

export default CosmoVirtual;

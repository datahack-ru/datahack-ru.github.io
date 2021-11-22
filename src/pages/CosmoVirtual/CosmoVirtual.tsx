import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import { Header, Container, Grid, Table, Image, Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import TimeLine from "../../components/TimeLine/TimeLine";

import getExternalLinkProps from "../../utils/getExternalLinkProps";
import "./CosmoVirtual.scss";



const CosmoVirtual: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();

  return (
    <Page title={`CosmoVirtual - ${t('projectTitle')}`}>
        <Container>
        <Image src="/images/cv_header.png" alt="CosmoVirtual" centered />
        
      <div className="ui divider"></div>
        <TimeLine stage="3" />

      <div className="ui divider"></div>
        </Container>
      <div >
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <p className="cvirtual">
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
              <p className="cvirtual">
                <Trans i18n={i18n} i18nKey='cv2'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            <Grid columns="equal" stackable>
            <Grid.Column>
              <p className="cvirtual">
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
              <p className="cvirtual">
                <Trans i18n={i18n} i18nKey='cv4'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            <Grid columns="equal" stackable>
            <Grid.Column>
              <p className="cvirtual">
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
              <p className="cvirtual">
                <Trans i18n={i18n} i18nKey='cv6'>
                 </Trans>
              </p>
            </Grid.Column>
            </Grid>   
            
          <Container>
          <div className="ui divider"></div>  
          <Header as="h3" content={t('cv7')}/>
            <ul>
            <p className="cvirtual"><li>{t('cv7.1')}</li></p>
            <p className="cvirtual"><li>{t('cv7.2')}</li></p>
            <p className="cvirtual"><li>{t('cv7.3')}</li></p>
            <p className="cvirtual"><li>{t('cv7.4')}</li></p>
            <p className="cvirtual"><li>{t('cv7.5')}</li></p>
            <p className="cvirtual"><li>{t('cv7.6')}</li></p>
          </ul>
          <div className="ui divider"></div>
          <p className="cvirtual">{t('cv8')}</p>
          <p className="cvirtual">{t('cv9')}</p>
          <p className="cvirtual">{t('cv10')}</p>
          <p className="cvirtual">{t('cv11')}</p>

          </Container>  
          <div className="ui divider"></div>
          <Table className="compact ui inverted blue table">
	<Table.Body>
	<Table.Row>
		<Table.Cell> {t('cv_table_h1')} </Table.Cell>
		<Table.Cell> {t('cv_table_h2')} </Table.Cell>
		<Table.Cell> {t('cv_table_h3')} </Table.Cell>
		<Table.Cell> {t('cv_table_h4')} </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 1 </Table.Cell>
		<Table.Cell> 15 000 000 </Table.Cell>
		<Table.Cell> 10 000 000 </Table.Cell>
		<Table.Cell> 0.01 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 2 	</Table.Cell>
		<Table.Cell> 14 000 000 </Table.Cell>
		<Table.Cell>  9	333 333 </Table.Cell>
		<Table.Cell> 0.03 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 3 </Table.Cell>
		<Table.Cell> 13 000 000 </Table.Cell>
		<Table.Cell>  8 666 667 </Table.Cell>
		<Table.Cell> 0.05 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 4 </Table.Cell>
		<Table.Cell> 12 000 000 </Table.Cell>
		<Table.Cell>  8 000 000 </Table.Cell>
		<Table.Cell> 0.07 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 5 </Table.Cell>
		<Table.Cell> 11 000 000 </Table.Cell>
		<Table.Cell>  7 333 333 </Table.Cell>
		<Table.Cell> 0.09 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 6 </Table.Cell>
		<Table.Cell> 10 000 000 </Table.Cell>
		<Table.Cell>  6 666 667 </Table.Cell>
		<Table.Cell> 0.15 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 7 </Table.Cell>
		<Table.Cell> 9 000 000 </Table.Cell>
		<Table.Cell> 6 000 000 </Table.Cell>
		<Table.Cell> 0.20 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 8 </Table.Cell>
		<Table.Cell> 8 000 000 </Table.Cell>
		<Table.Cell> 5 333 333 </Table.Cell>
		<Table.Cell> 0.30 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 9 </Table.Cell>
		<Table.Cell> 7 000 000 </Table.Cell>
		<Table.Cell> 4 666 667 </Table.Cell>
		<Table.Cell> 0.40 </Table.Cell>
	</Table.Row>
	<Table.Row>
		<Table.Cell> 10 </Table.Cell>
		<Table.Cell> 6 000 000 </Table.Cell>
		<Table.Cell> 4 000 000 </Table.Cell>
		<Table.Cell> 0.50 </Table.Cell>
	</Table.Row>
</Table.Body>
</Table>
        
      </Container>
      <div className="ui divider"></div>
      <Container>
        <ul>
        <li className="cvirtual">{t('cv12')}</li>
        <li className="cvirtual">{t('cv13')}</li>
        <li className="cvirtual">{t('cv14')}</li>
        </ul>
        </Container>
        <Container>
      <Button
              className="btn-buy cvirtual center"
              as={'a'} href='/sendtransaction'
              {...getExternalLinkProps()}
            >
              {t('BuyCV')} </Button>

     </Container>
      </div>
    </Page>
  );
};

export default CosmoVirtual;

import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Icon, Modal, Grid, Divider, Segment, Popup } from 'semantic-ui-react';
import Number from './Number';
import * as S from '../store/selectors';



const RoiModal = (props: any) => {
  const isHeader: boolean = props.isHeader;
  //const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const roiData: any = useSelector((state) => S.data.getRoiData(state));

  const onClick = (e: any) => {
    e.preventDefault();
  }


  return (
    <Modal
      //onClose={() => setOpen(false)}
      //onOpen={() => setOpen(true)}
      //open={true}
      //closeIcon={true}
      size='tiny'
      trigger={
        <span>
          🔥 APY <Popup
            trigger={<Icon name='info circle' color={isHeader ? undefined : 'blue'} />}
            content={t('CCLP farming APY (weekly reinvestment)')}
          />
          {isHeader
            ? <b style={{ color: 'rgb(255, 174, 0)' }}><Number value={roiData.apyWeeklyReinvestment} suffix='%' decimalScale={0} /></b>
            : <b><Number value={roiData.apyWeeklyReinvestment} suffix='%' decimalScale={0} /></b>
          }{' '}
          <Icon name='calculator' color={isHeader ? undefined : 'blue'} onClick={onClick} />
        </span>
      }
    >
      <Modal.Header>ROI</Modal.Header>
      <Modal.Content>
        <Segment basic>
          <Grid relaxed columns={2} style={{ color: 'black', }}>
            <Grid.Column width='11' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              <b>APY</b> ({t('no reinvestment')})
            </Grid.Column>
            <Grid.Column width='5' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }} textAlign='right'>
              <b><Number value={roiData.apyNoReinvestment} suffix='%' decimalScale={0} /></b>
            </Grid.Column>

            <Grid.Column width='11' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              <b>APY</b> ({t('monthly reinvestment')})
            </Grid.Column>
            <Grid.Column width='5' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }} textAlign='right'>
              <b><Number value={roiData.apyMonthlyReinvestment} suffix='%' decimalScale={0} /></b>
            </Grid.Column>

            <Grid.Column width='11' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }} >
              <b>APY</b> ({t('weekly reinvestment')})
            </Grid.Column>
            <Grid.Column width='5' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }} textAlign='right' >
              <b><Number value={roiData.apyWeeklyReinvestment} suffix='%' decimalScale={0} /></b>
            </Grid.Column>
          </Grid>
        </Segment>
        <Divider />


        <Segment basic>
          <Grid relaxed columns={3} style={{ color: 'black', }}>
            <Grid.Column width='6' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              {t('Timeframe')}
            </Grid.Column>
            <Grid.Column width='3' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
              ROI
            </Grid.Column>
            <Grid.Column width='7' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
              {t('Profit per $1,000')}
            </Grid.Column>


            <Grid.Column width='6' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              1 {t('day')}
            </Grid.Column>
            <Grid.Column width='3' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
              <b><Number value={roiData.roi1Day} suffix='%' decimalScale={4} /></b>
            </Grid.Column>
            <Grid.Column width='7' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
              <b><Number value={roiData.roi1DayEarn} prefix='$' decimalScale={2} /></b>
            </Grid.Column>


            <Grid.Column width='6' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              7 {t('days')}
            </Grid.Column>
            <Grid.Column width='3' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
              <b><Number value={roiData.roi7Day} suffix='%' decimalScale={4} /></b>
            </Grid.Column>
            <Grid.Column width='7' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
              <b><Number value={roiData.roi7DayEarn} prefix='$' decimalScale={2} /></b>
            </Grid.Column>


            <Grid.Column width='6' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
              30 {t('days')}
            </Grid.Column>
            <Grid.Column width='3' style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
              <b><Number value={roiData.roi30Day} suffix='%' decimalScale={4} /></b>
            </Grid.Column>
            <Grid.Column width='7' style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }} textAlign='right'>
              <b><Number value={roiData.roi30DayEarn} prefix='$' decimalScale={2} /></b>
            </Grid.Column>
          </Grid>
        </Segment>

        <p style={{ color: 'black', fontSize: '12px' }}>{t('Calculations are based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.')}</p>
      </Modal.Content>
    </Modal >
  );
}


export default hot(module)(RoiModal);


import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { Modal, Table, Grid, Progress } from 'semantic-ui-react';



const AllHolderBonusModal = () => {
  //const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onClick = (e: any) => {
    e.preventDefault();
  }

  return (
    <Modal
      //onClose={() => setOpen(false)}
      //onOpen={() => setOpen(true)}
      //open={true}
      //closeIcon={true}
      size={'mini'}
      trigger={<a href='#' onClick={onClick}>{t('Learn more') + ' >'}</a>}
    >
      <Modal.Header>{t('Holder bonus')}</Modal.Header>
      <Modal.Content>
        <Table celled padded compact unstackable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='left'>{t('Staking period')}</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>{t('My pool rate')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>7 — 14 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+20%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>15 — 29 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+50%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>30 — 59 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+100%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>60 — 89 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+200%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>90 — 179 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+300%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>180 — 359 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+500%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>360 {t('days')}</Table.Cell>
              <Table.Cell textAlign='right'>+900%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
    </Modal >
  );
}


function getHolderBonusDaysTo(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 360;
  else if (daysCount > 180) return 360;
  else if (daysCount > 90) return 180;
  else if (daysCount > 60) return 90;
  else if (daysCount > 30) return 60;
  else if (daysCount > 15) return 30;
  else if (daysCount > 7) return 15;
  else return 7;
}
function getHolderBonusPercent(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 900;
  else if (daysCount > 180) return 500;
  else if (daysCount > 90) return 300;
  else if (daysCount > 60) return 200;
  else if (daysCount > 30) return 100;
  else if (daysCount > 15) return 50;
  else if (daysCount > 7) return 20;
  else return 0;
}

function getHolderBonusPercentTo(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 900;
  else if (daysCount > 180) return 900;
  else if (daysCount > 90) return 500;
  else if (daysCount > 60) return 300;
  else if (daysCount > 30) return 200;
  else if (daysCount > 15) return 100;
  else if (daysCount > 7) return 50;
  else return 20;
}

const ProgressHolderBonus = (props: any) => {
  const { t } = useTranslation();

  const days = props.days || 0;
  const daysTo = getHolderBonusDaysTo(days);
  let daysLeft = daysTo - days;
  if (daysLeft < 0) {
    daysLeft = 0;
  }
  const percent = getHolderBonusPercent(days);
  const percentTo = getHolderBonusPercentTo(days);

  return (
    <div style={{ color: 'black', }}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={8} textAlign='left'><b>+{percent}%</b></Grid.Column>
          <Grid.Column mobile={8} textAlign='right'><b>+{percentTo}%</b></Grid.Column>
        </Grid.Row>
      </Grid>
      <Progress percent={days / daysTo} size='tiny' color='yellow'><b>{days}/{daysTo} {t('days')}</b></Progress>
      {t('Stake X days more to increase your pool rate in the bonus pool on X%.', { days: 0, percent: percentTo, })} <AllHolderBonusModal />
    </div>
  );
}

export default hot(module)(ProgressHolderBonus);

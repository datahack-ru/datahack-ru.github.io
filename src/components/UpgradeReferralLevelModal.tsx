import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { Icon, Popup, Modal, Table, Grid, Button, Divider, Select } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Number from './Number';



const getNextLevel = (currentLevel: string) => {
  switch (currentLevel) {
    case 'STARTER':
      return 'PARTNER';
    case 'PARTNER':
      return 'PRO';
    case 'PRO':
      return 'VIP';
    case 'VIP':
      return 'ELITE';
    case 'ELITE':
      return 'MAX';
    case 'MAX':
      return 'MAX';
    default:
      return 'MAX';
  }
}
const getBonus = (currentLevel: string) => {
  switch (currentLevel) {
    case 'STARTER':
      return { ref: 0, team: 0, };
    case 'PARTNER':
      return { ref: 5, team: 5, };
    case 'PRO':
      return { ref: 8, team: 8, };
    case 'VIP':
      return { ref: 10, team: 10, };
    case 'ELITE':
      return { ref: 15, team: 15, };
    case 'MAX':
      return { ref: 20, team: 20, };
    default:
      return { ref: 20, team: 20, };
  }
}
const getResources = (currentLevel: string) => {
  switch (currentLevel) {
    case 'STARTER':
      return { usdt: 0, nft: 0, };
    case 'PARTNER':
      return { usdt: 50, nft: 0, };
    case 'PRO':
      return { usdt: 500, nft: 0, };
    case 'VIP':
      return { usdt: 3000, nft: 1, };
    case 'ELITE':
      return { usdt: 10000, nft: 3, };
    case 'MAX':
      return { usdt: 50000, nft: 5, };
    default:
      return { usdt: 50000, nft: 5, };
  }
}


const getLevelValue = (currentLevel: string) => {
  switch (currentLevel) {
    case 'STARTER':
      return 0;
    case 'PARTNER':
      return 1;
    case 'PRO':
      return 2;
    case 'VIP':
      return 3;
    case 'ELITE':
      return 4;
    case 'MAX':
      return 5;
    default:
      return 5;
  }
}

const isDisabled = (currentLevel: string, cLevel: string) => {
  if (getLevelValue(currentLevel) >= getLevelValue(cLevel))
    return true;
  return false;
}

const UpgradeReferralLevelModal = (props: any) => {
  //const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onClick = (e: any) => {
    e.preventDefault();
  }

  const level = props.level;
  const totalStakedUsd = props.stakedUsd;
  const totalNft = props.nfts;

  const levels: any = [
    { key: 'STARTER', value: 'STARTER', text: 'STARTER', disabled: isDisabled(level, 'STARTER') },
    { key: 'PARTNER', value: 'PARTNER', text: 'PARTNER', disabled: isDisabled(level, 'PARTNER') },
    { key: 'PRO', value: 'PRO', text: 'PRO', disabled: isDisabled(level, 'PRO') },
    { key: 'VIP', value: 'VIP', text: 'VIP', disabled: isDisabled(level, 'VIP') },
    { key: 'ELITE', value: 'ELITE', text: 'ELITE', disabled: isDisabled(level, 'ELITE') },
    { key: 'MAX', value: 'MAX', text: 'MAX', disabled: isDisabled(level, 'MAX') },
  ];


  const [nextLevel, setNextLevel] = useState(getNextLevel(level));
  const [bonus, setBonus] = useState(getBonus(getNextLevel(level)));
  const [resources, setResources] = useState(getResources(getNextLevel(level)));
  const onSelect = (e: any, data: any) => {
    setNextLevel(data.value);
    setBonus(getBonus(data.value));
    setResources(getResources(data.value));
  }

  useEffect(() => {
    const nextLevel2 = getNextLevel(level);
    setNextLevel(nextLevel2);
    setBonus(getBonus(nextLevel2));
    setResources(getResources(nextLevel2));
  }, [level]);


  let toNextUsdt = resources.usdt - parseFloat(totalStakedUsd);
  if (toNextUsdt < 0) toNextUsdt = 0;
  let toNextNft = resources.nft - totalNft;
  if (toNextNft < 0) toNextNft = 0;

  return (
    <Modal
      //onClose={() => setOpen(false)}
      //onOpen={() => setOpen(true)}
      //open={true}
      //closeIcon={true}
      size='tiny'
      trigger={<Button onClick={onClick} content={t('Upgrade level')} color='green' size='mini' />}
    >
      <Modal.Header>{t('Upgrade referral level')}</Modal.Header>
      <Modal.Content>
        <Grid relaxed columns={1} style={{ color: 'black', }}>
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <Grid relaxed columns={2} style={{ color: 'black', }}>
              <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('Total staked')}
              </Grid.Column>
              <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
                {t('Total')} NFT
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
                <b><Number value={totalStakedUsd} suffix=' USDT' decimalScale={2} /></b>
              </Grid.Column>
              <Grid.Column style={{ paddingLeft: '1.5rem', paddingRight: '1.0rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '18px', lineHeight: '18px', }}>
                <b><Number value={totalNft} suffix=' NFT' decimalScale={0} /></b>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Divider hidden />
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <b>{t('Next referral level')}</b>
          </Grid.Column>
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <Select
              placeholder='Select referral level' value={nextLevel} options={levels} fluid
              onChange={onSelect}
            />
          </Grid.Column>
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            {t('Add USDT to liquidity pool and stake received pool tokens (CCLP-LP) to reach next referral level', {
              usdt: toNextUsdt,
              level: nextLevel,
              nft: toNextNft,
            })}
          </Grid.Column>
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <Table celled padded compact unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {t('Referral farming reward')} <Popup
                      trigger={<Icon name='info circle' color='blue' />}
                      content={t('Receive from 5% to 20% from amount of CCLP farmed by your direct referrals')}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign='center'>{bonus.ref}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    {t('Team farming reward')} <Popup
                      trigger={<Icon name='info circle' color='blue' />}
                      content={t('Receive from 5% to 20% from amount of CCLP farmed by your weak team')}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign='center'>+{bonus.team}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>

          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <Button as={Link} to='/farming/pool' positive fluid>{t('Add liquidity')}</Button>
          </Grid.Column>
          <Grid.Column style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>
            <Button as={Link} to='/nft' positive fluid>{t('Buy NFT')}</Button>
          </Grid.Column>
        </Grid>

      </Modal.Content>
    </Modal >
  );
}


export default hot(module)(UpgradeReferralLevelModal);


import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { Icon, Popup, Modal, Table, } from 'semantic-ui-react';



const AllReferralLevelsModal = () => {
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
      trigger={<a href='#' onClick={onClick}>{t('All referral levels') + ' >'}</a>}
    >
      <Modal.Header>{t('Referral levels')}</Modal.Header>
      <Modal.Content>
        <Table celled padded compact unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='left'>{t('Referral level')}</Table.HeaderCell>
              <Table.HeaderCell>STARTER</Table.HeaderCell>
              <Table.HeaderCell>PARTNER</Table.HeaderCell>
              <Table.HeaderCell>PRO</Table.HeaderCell>
              <Table.HeaderCell>VIP</Table.HeaderCell>
              <Table.HeaderCell>ELITE</Table.HeaderCell>
              <Table.HeaderCell>MAX</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>USDT</Table.Cell>
              <Table.Cell textAlign='center'>0</Table.Cell>
              <Table.Cell textAlign='center'>50</Table.Cell>
              <Table.Cell textAlign='center'>500</Table.Cell>
              <Table.Cell textAlign='center'>3,000</Table.Cell>
              <Table.Cell textAlign='center'>10,000</Table.Cell>
              <Table.Cell textAlign='center'>50,000</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>CosmoFund NFTs</Table.Cell>
              <Table.Cell textAlign='center'>-</Table.Cell>
              <Table.Cell textAlign='center'>-</Table.Cell>
              <Table.Cell textAlign='center'>-</Table.Cell>
              <Table.Cell textAlign='center'>1</Table.Cell>
              <Table.Cell textAlign='center'>3</Table.Cell>
              <Table.Cell textAlign='center'>5</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className='separator' colSpan={7}>
                {t('Farming rewards')}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('Referral farming reward')} <Popup
                  trigger={<Icon name='info circle' color='blue' />}
                  content={t('Receive from 5% to 20% from amount of CCLP farmed by your direct referrals')}
                />
              </Table.Cell>
              <Table.Cell textAlign='center'>0%</Table.Cell>
              <Table.Cell textAlign='center'>5%</Table.Cell>
              <Table.Cell textAlign='center'>8%</Table.Cell>
              <Table.Cell textAlign='center'>10%</Table.Cell>
              <Table.Cell textAlign='center'>15%</Table.Cell>
              <Table.Cell textAlign='center'>20%</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {t('Team farming reward')} <Popup
                  trigger={<Icon name='info circle' color='blue' />}
                  content={t('Receive from 5% to 20% from amount of CCLP farmed by your weak team')}
                />
              </Table.Cell>
              <Table.Cell textAlign='center'>+0%</Table.Cell>
              <Table.Cell textAlign='center'>+5%</Table.Cell>
              <Table.Cell textAlign='center'>+8%</Table.Cell>
              <Table.Cell textAlign='center'>+10%</Table.Cell>
              <Table.Cell textAlign='center'>+15%</Table.Cell>
              <Table.Cell textAlign='center'>+20%</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
    </Modal >
  );
}

export default hot(module)(AllReferralLevelsModal);


import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Header, Table, Button, Progress, Grid, Accordion, Tab, Input, } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Number from '../../components/Number';
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import "./Farm.scss";




const FarmPanes = (props: any) => {
  const { t } = useTranslation();
  const {
    done,
    symbol,
    handleChange,
    stakeAmount, setAllStakeAmountAction, stakeAction,
    unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
    claimAllAction, update,
  } = props;

  const panes = [
    {
      menuItem: <Button fluid className="farm__btn-1" onClick={update} >{t('Update')}</Button>,
      render: () => null,
    },
    {
      menuItem: <Button fluid disabled={done} className="farm__btn-2" onClick={() => null} >{t('Stake')}</Button>,
      render: () => <Tab.Pane attached={false}>
        <Input fluid labelPosition='right'
          type='number' placeholder='123.456'
          id='stakeAmount' name='stakeAmount'
          value={stakeAmount} onChange={handleChange}
          label={<Button primary onClick={setAllStakeAmountAction}>MAX</Button>}
        />
        <br />
        <Button fluid className="farm__btn-2" onClick={stakeAction}>{t('Stake')}</Button>
      </Tab.Pane>,
    },
    {
      menuItem: <Button fluid className="farm__btn-3" onClick={() => null} >{t('Unstake')}</Button>,
      render: () => <Tab.Pane attached={false}>
        <Input fluid labelPosition='right'
          type='number' placeholder='123.456'
          id='unstakeAmount' name='unstakeAmount'
          value={unstakeAmount} onChange={handleChange}
          label={<Button primary onClick={setAllUnstakeAmountAction}>MAX</Button>}
        />
        <br />
        <Button color='red' fluid onClick={unstakeAction}>{t('Unstake')}</Button>
      </Tab.Pane>,
    },
    {
      menuItem: <Button fluid className="farm__btn-4" onClick={claimAllAction} >{t('Claim')}</Button>,
      render: () => null,
    },
  ];
  return panes;
}

function FarmTabActions(props: any) {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const {
    done,
    symbol, handleChange,
    stakeAmount, setAllStakeAmountAction, stakeAction,
    unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
    claimAllAction, update,
  } = props;
  return (
    <div className={getAdaptiveClassName("farm__buttons", isMobile)}>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={FarmPanes({
          done,
          symbol, handleChange,
          stakeAmount, setAllStakeAmountAction, stakeAction,
          unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
          claimAllAction, update,
        })}
      />
    </div>
  );
}


function getCleanDateTimeStamp(delta = 0) {
  const now = new Date(Date.now() + delta);
  const utcDate = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0
  ));
  return Math.floor(utcDate.getTime() / 1000);
}

function getHolderBonus(days = 0) {
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


interface IFarmProps {
  title: string;
  symbol: string;
  affectReferralLevel?: boolean;
  addLiquidityLink?: string;
  removeLiquidityLink?: string;
  data?: any;

  totalStakedAmount?: any;
  farmRate?: any;
  myFarmShare?: any;
  myFarmRate?: any;
  stakedAmount?: any;
  unstakedAmount?: any;
  pendingReward?: any;

  handleChange?: any;
  stakeAmount?: any;
  setAllStakeAmountAction?: any;
  stakeAction?: any;
  unstakeAmount?: any;
  setAllUnstakeAmountAction?: any;
  unstakeAction?: any;
  claimAllAction?: any;
  update?: any;
  done?: boolean;
}

const Farm: React.FC<IFarmProps> = ({
  done,
  title, symbol, affectReferralLevel,
  addLiquidityLink, removeLiquidityLink,
  data,

  totalStakedAmount, farmRate, myFarmShare, myFarmRate,
  stakedAmount, unstakedAmount, pendingReward,

  handleChange,
  stakeAmount, setAllStakeAmountAction, stakeAction,
  unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
  claimAllAction, update,
}) => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  }

  // Bonus pool data
  let bonusPool: any = {};
  if (data) {
    bonusPool = data;
  }
  const timestamp = getCleanDateTimeStamp();
  let days = 0;
  if (bonusPool.lastWithdrawTimestamp) {
    days = Math.floor((timestamp - bonusPool.lastWithdrawTimestamp) / (24 * 60 * 60));
    if (days < 0) days = 0;
  }
  let daysTo = getHolderBonusDaysTo(days);
  let holderBonus = getHolderBonus(days);
  let holderBonusPercentTo = getHolderBonusPercentTo(days);

  return (
    <div className={getAdaptiveClassName("farm", isMobile)}>
      <Header as="h2" content={title} />
      <p>{affectReferralLevel && t('Affects your Referral Level')}&#160;</p>
      <Table padded compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{t('Total stake')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={totalStakedAmount} decimalScale={0} fixedDecimalScale={true} suffix={` ${symbol}`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('Farm rate')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={farmRate} decimalScale={0} fixedDecimalScale={true} suffix={` COSMO`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="farm__mark">
            <Table.Cell>{t('My stake')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={stakedAmount} decimalScale={0} fixedDecimalScale={true} suffix={` ${symbol}`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="farm__mark">
            <Table.Cell>{t('My share')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={myFarmShare} decimalScale={0} fixedDecimalScale={true} suffix={`%`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="farm__mark">
            <Table.Cell>{t('My rate')} / {t('day')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={myFarmRate} decimalScale={0} fixedDecimalScale={true} suffix={` COSMO`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="farm__mark">
            <Table.Cell>{t('Unclaimed rewards')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={pendingReward} decimalScale={0} fixedDecimalScale={true} suffix={` COSMO`} />
            </Table.Cell>
          </Table.Row>
          <Table.Row className="farm__mark-1">
            <Table.Cell>{t('Wallet Balance')}</Table.Cell>
            <Table.Cell textAlign="right">
              <Number value={unstakedAmount} decimalScale={0} fixedDecimalScale={true} suffix={` ${symbol}`} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Accordion>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <div className="farm__bonus">
            <Grid columns="equal">
              <Grid.Column>
                {t('Holder bonus')}:
                <br />holderBonus
                +{holderBonus}%
              </Grid.Column>
              <Grid.Column textAlign="right">
                +{holderBonus}% {t('To my Bonus pool rate')}
                <br />
                +{holderBonusPercentTo}%
              </Grid.Column>
            </Grid>

            <Progress
              size="small"
              percent={days / daysTo * 100}
            ><b>{days}/{daysTo} {t('days')}</b></Progress>

            <Grid columns="equal">
              <Grid.Column>{t('Earned today')}</Grid.Column>
              <Grid.Column textAlign="right">
                <Number
                  value={bonusPool.earnedToday ? parseFloat(bonusPool.earnedToday).toFixed(6) : '0'}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  suffix={' COSMO'}
                />
              </Grid.Column>
            </Grid>
            {t('Bonus Pool rate - % of Farm rate per day')}
          </div>
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 1}>
          <Grid columns="2" className="farm__period">
            <Grid.Row>
              <Grid.Column width={7}>
                <b>{t('Staking period')}</b>
              </Grid.Column>
              <Grid.Column textAlign="right" width={9}>
                <b>{t('My Bonus pool rate')}</b>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>7 — 14 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+20%</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>15 — 29 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+50%</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>30 — 59 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+100%</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>60 — 89 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+200%</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>90 — 179 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+300%</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>180 — 359 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+500%</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>360 {t('days')}</Grid.Column>
              <Grid.Column textAlign="right">+900%</Grid.Column>
            </Grid.Row>
          </Grid>
        </Accordion.Content>
      </Accordion>

      <FarmTabActions
        {...{
          done,
          symbol, handleChange,
          stakeAmount, setAllStakeAmountAction, stakeAction,
          unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
          claimAllAction, update,
        }}
      />

      <div className="farm__links">
        {addLiquidityLink &&
          <Button
            className="farm__btn-4"
            as='a' {...getExternalLinkProps()}
            href={addLiquidityLink}
          >{t('Add liquidity')}</Button>}
        {removeLiquidityLink &&
          <Button
            className="farm__btn-3"
            as='a' {...getExternalLinkProps()}
            href={removeLiquidityLink}
          >{t('Remove liquidity')}</Button>}
      </div>
    </div>
  );
};

export default Farm;

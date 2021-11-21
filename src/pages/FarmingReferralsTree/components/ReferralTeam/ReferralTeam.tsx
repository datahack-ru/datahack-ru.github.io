import React from "react";
import { useTranslation } from 'react-i18next';
import { Button, Grid, Image } from "semantic-ui-react";
import Number from "../../../../components/Number";
import "./ReferralTeam.scss";



interface IPage {
  left?: boolean | undefined;
  weakTeam?: boolean | undefined;
  data?: any;
}
const ReferralTeam: React.FC<IPage> = ({
  left,
  weakTeam,
  data,
}: IPage) => {
  const { t } = useTranslation();

  return (
    <div className="referral__team">

      <div className="referral__team-header">
        {left
          ? <div >{t('Left team')}</div>
          : <div >{t('Right team')}</div>
        }
        {weakTeam
          ? <Button style={{ backgroundColor: '#ffae00' }}>{t('Weak team')}</Button>
          : <Button>{t('Strong team')}</Button>
        }

      </div>
      <div className="referral__team-body">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>{t('Members')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.members}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Staked')} USD</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.stakedUsd} suffix={' USD'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{t('Staked')} LP</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.staked} suffix={' LP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>NFT</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.nfts}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Farmed today')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.farmed} suffix={' CCLP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {/*<div className="referral__team-footer">
        <div>
          <Image src="/icons/rocket.png" inline />
          {t('Total farmed')}
        </div>
        <div>
          <Number
            value={data.totalFarmed} suffix={' CCLP'}
            decimalScale={0} fixedDecimalScale
          />
        </div>
      </div>*/}
    </div>
  );
};

export default ReferralTeam;

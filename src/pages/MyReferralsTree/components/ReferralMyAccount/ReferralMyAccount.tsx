import React from "react";
import { useTranslation } from 'react-i18next';
import { Grid } from "semantic-ui-react";
import Number from "../../../../components/Number";
import "./ReferralMyAccount.scss";



interface IPage {
  data?: any;
}
const ReferralMyAccount: React.FC<IPage> = ({
  data,
}: IPage) => {
  const { t } = useTranslation();
  console.log('ReferralMyAccount', data)

  return (
    <div className="referral__myteam" style={{
      marginLeft: '-1rem',
    }}>
      <div className="referral__myteam-body">
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>{t('Level')}</Grid.Column>
            <Grid.Column textAlign="right">{data.level}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Staked')} USD</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.root.stakedUsd} suffix={' USD'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{t('Staked')} LP</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.root.staked} suffix={' LP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>NFT</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.root.nfts}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Referrals')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data && data.referrals}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Farmed today')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data && data.root.farmed} suffix={' CCLP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>{t('Team rewards')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.earned} suffix={' CCLP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>


          <Grid.Row>
            <Grid.Column>{t('Referral rewards')}</Grid.Column>
            <Grid.Column textAlign="right">
              <Number
                value={data.refEarned} suffix={' CCLP'}
                decimalScale={0} fixedDecimalScale
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default ReferralMyAccount;

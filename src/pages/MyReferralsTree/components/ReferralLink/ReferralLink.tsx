import React from "react";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Input, Image } from "semantic-ui-react";
import copy from 'copy-to-clipboard';
import * as S from '../../../../store/selectors';
import "./ReferralLink.scss";



const ReferralLink: React.FC = () => {
  const { t } = useTranslation();
  const myRefId: any = useSelector(S.profile.getGuid);
  const referralLink = `https://${window.location.hostname}/?r=${myRefId}`;

  return (
    <div className="referral-link__wrapper">
      <div className="referral-link">
        <label>{t('My Referral link')}</label>
        <div className="referral-link__form">
          <Input placeholder={referralLink} onClick={() => copy(referralLink)}/>
          <Button onClick={() => copy(referralLink)}>
            <Image src="/icons/referral.png" inline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralLink;

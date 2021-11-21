import React from "react";
import { Image } from "semantic-ui-react";
import { useTranslation } from 'react-i18next';



const ReferralBlock: React.FC<any> = ({
  data,
  toAccount,
}) => {
  const { t } = useTranslation();

  if (data && data.guid)
    return (
      <div className="referral__block">
        <a onClick={() => toAccount(data.guid)}>
          {/*<b>{data.email}</b>*/}
          <br />
          ID {data.guid}
          <p>
            <Image src="/icons/lightning.png" inline /> {data.level}
          </p>
        </a>
      </div>
    );

  return (
    <div className="referral__block-empty">{t('Free place')}</div>
  );
};

export default ReferralBlock;

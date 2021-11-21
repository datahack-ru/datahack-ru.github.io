import React from "react";
import { useTranslation } from 'react-i18next';
import { Image } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../helpers/Media";

const Loading: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <div className={getAdaptiveClassName("fullPage", isMobile)}>
      <Image src="/images/layout/loading.gif" alt={t('Loading')} centered />
    </div>
  );
};

export default Loading;

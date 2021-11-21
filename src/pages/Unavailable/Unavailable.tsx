import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container, Image } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import { Routes } from "../../router/helper";
import "./Unavailable.scss";

const Unavailable = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <Page title={t("Maintenance") + " - CosmoMasks"} isEmpty>
      <div className={getAdaptiveClassName("unavailable", isMobile)}>
        <Container>
          <div className="unavailable__home">
            <Image src="/images/layout/rocket.png" />
            <Link to={Routes.main}>
              {t(isMobile ? "Go to Home" : "Go to Home page")}
            </Link>
          </div>
          <div className="unavailable__message-wrapper">
            <div className="unavailable__message">
              <Trans t={t} i18nKey="onThisPlanetAreMaintenance">
                On this planet
                <br /> are maintenance, <br />
                it is not yet suitable for life.
              </Trans>
            </div>
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default Unavailable;

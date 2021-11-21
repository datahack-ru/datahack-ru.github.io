import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import { Routes } from "../../router/helper";
import "./NotFound.scss";

const PageNotFound = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <Page title={`${t("Page not found")} - ${t("projectTitle")}`} isEmpty className='fullPage'>
      <div className={getAdaptiveClassName("notFound", isMobile)}>
        <Container>
          <p>
            <Trans t={t} i18nKey="thisPlanetNoLongerExists">
              This planet no longer exists.
              <br />
              But you have a chance to return to the world where there is life
              :)
            </Trans>
          </p>
          <Link to={Routes.main}>
            {t(isMobile ? "Go to Home" : "Go to Home page")}
          </Link>
        </Container>
      </div>
    </Page>
  );
};

export default PageNotFound;

import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Container, Menu, Image, Sidebar, Dropdown, Label } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { mobileBreakpoint, getAdaptiveClassName } from "../helpers/Media";
import { Routes } from "../router/helper";
import * as S from "../store/selectors";
import * as A from "../store/actions";



const MenuItems: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Menu.Item header as={NavLink} to={Routes.nft}>
        NFT
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.farming}>
        {t("Farming")}
      </Menu.Item>
      <Menu.Item header as={NavLink} exact to={Routes.exchange}>
        {t("Exchange")}
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.bridge}>
        {t("Bridge")}
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.cupToken}>
        CUP
      </Menu.Item>
      <Menu.Item header as={NavLink} to={Routes.cosmovirtual}>
        CosmoVirtual
      </Menu.Item>

    </>
  );
};

const MenuProfile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(S.profile.isAuthenticated);

  const signOut = () => {
    dispatch(A.profile.signOut());
  };

  if (isAuthenticated) {
    return (
      <>
        {/*<Dropdown.Item as={Link} to={Routes.profile}>
          {t("My Profile")}
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={Routes.wallet}>
          {t("My Wallet")}
        </Dropdown.Item>
        <Dropdown.Item as={Link} to={Routes.team}>
          {t("My Team")}
        </Dropdown.Item>
        <Dropdown.Item as={Link} exact to={Routes.MyReferrals}>
          {t('Referral program')}
        </Dropdown.Item>
        */}
        <Menu.Item header as={Link} exact to={Routes.dashboard}>
          {t('Dashboard')}
        </Menu.Item>

        <Dropdown.Divider />
        <Dropdown.Item as='a' onClick={signOut}>{t('Sign Out')}</Dropdown.Item>
      </>
    );
  } else {
    return (
      <>
        <Menu.Item header as={Link} to={Routes.signin}>
          {t("Sign In")}
        </Menu.Item>
        <Menu.Item header as={Link} to={Routes.signup}>
          {t("Sign Up")}
        </Menu.Item>
      </>
    );
  }
};

export const langOptions = [
  { key: "en", value: "en", text: "EN" },
  { key: "cn", value: "cn", text: "CN" },
  { key: "ru", value: "ru", text: "RU" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();
  const isAuthenticated = useSelector(S.profile.isAuthenticated);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (e: any, se: any) => {
    i18n.changeLanguage(se.value);
  };
  //<div style={{ color: '#ffae00' }}>{t("projectTitle")}</div>

  if (isAuthenticated)
    return (
      <>
        <Menu
          fixed="top"
          size="large"
          className={getAdaptiveClassName("main-menu", isMobile)}
        >
          <Container>
            <Menu.Item header as={Link} to={Routes.main} className="logo">
              <Image src="/images/layout/logo.png" spaced="right" />
              {t("projectTitle")}
            </Menu.Item>

            {isMobile ? (
              <Menu.Item onClick={toggleMenu} position="right">
                <Dropdown
                  name="lang"
                  pointing
                  className="link item"
                  options={langOptions}
                  value={i18n.language}
                  onChange={changeLanguage}
                />
                <Image src="/icons/menu.png" inline />
              </Menu.Item>
            ) : (
              <>
                <MenuItems />
                <Menu.Menu position="right">
                  <Dropdown text={t("Profile")} pointing className="link item">
                    <Dropdown.Menu>
                      <MenuProfile />
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown
                    name="lang"
                    pointing
                    className="link item"
                    options={langOptions}
                    value={i18n.language}
                    onChange={changeLanguage}
                  />
                </Menu.Menu>
              </>
            )}
          </Container>
        </Menu>

        {isMobile && (
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={() => setMenuOpen(false)}
            vertical
            visible={isMenuOpen}
          >
            <MenuItems />
            <MenuProfile />
          </Sidebar>
        )}
      </>
    );
  else
    return (
      <>
        <Menu
          fixed="top"
          size="large"
          className={getAdaptiveClassName("main-menu", isMobile)}
        >
          <Container>
            <Menu.Item header as={Link} to={Routes.main} className="logo">
              <Image src="/images/layout/logo.png" spaced="right" />
              {t("projectTitle")}
            </Menu.Item>

            {isMobile ? (
              <Menu.Item onClick={toggleMenu} position="right">
                <Dropdown
                  name="lang"
                  pointing
                  className="link item"
                  options={langOptions}
                  value={i18n.language}
                  onChange={changeLanguage}
                />
                <Image src="/icons/menu.png" inline />
              </Menu.Item>
            ) : (
              <>
                <MenuItems />
                <Menu.Menu position="right">
                  <Menu.Item header as={Link} to={Routes.signin}>
                    {t("Sign In")}
                  </Menu.Item>
                  {/*<Menu.Item header as={Link} to={Routes.signup}>
                    {t("Sign Up")}
                  </Menu.Item>*/}

                  <Dropdown
                    name="lang"
                    pointing
                    className="link item"
                    options={langOptions}
                    value={i18n.language}
                    onChange={changeLanguage}
                  />
                </Menu.Menu>
              </>
            )}
          </Container>
        </Menu>

        {isMobile && (
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={() => setMenuOpen(false)}
            vertical
            visible={isMenuOpen}
          >
            <MenuItems />
            <MenuProfile />
          </Sidebar>
        )}
      </>
    );
};

export default Header;

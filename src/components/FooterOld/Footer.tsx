import React from "react";
import { Grid, Image, Container } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { mobileBreakpoint } from "../../helpers/Media";

import "./Footer.scss";

const BlockIcons: React.FC = () => (
  <>
    {/* TODO: add telegram link */}
    <a href="#" target="_blank" rel="noopener noreferrer">
      <Image src="/icons/telegram.png" inline />
    </a>
    <a
      href="https://twitter.com/CosmoFund"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/icons/twitter.png" inline />
    </a>
    <a
      href="https://medium.com/@CosmoFund"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/icons/medium.png" inline />
    </a>
  </>
);

const Footer: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <footer className="footer">
      <div className=" footer__bg">
        <Container>
          <Grid columns="equal" stackable padded>
            <Grid.Column className="footer__rights">
              © 2021 CosmoFund. Все права защищены.
              <br />
              Обмен <br />
              Кросс-цепной мост <br />
              НФЦ CosmoFund <br />
              CosmoMasks Купить новый! <br />
              Ограниченный набор CosmoMasks <br />
              МаскаДляМуск
            </Grid.Column>
            <Grid.Column>
              <div className="icons">
                <BlockIcons />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

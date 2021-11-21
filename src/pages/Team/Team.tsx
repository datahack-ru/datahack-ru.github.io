import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Button,
  Header,
  Select,
  Input,
} from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import Loading from "../../components/Loading";
import "./Team.scss";

const Team: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: remove - demo loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page title="My team">
      <div className={getAdaptiveClassName("team__header", isMobile)}>
        <Container>
          <h1>
            Want to earn more COSMO? <br />
            Invite a friend and farm together.
          </h1>
          <p>
            Share your referral link to your friends and get daily COSMO reward
            from each registered friend that staked in your team.
          </p>
        </Container>
      </div>
      <div className={getAdaptiveClassName("team", isMobile)}>
        <Container>
          <div className={getAdaptiveClassName("team__content", isMobile)}>
            <Grid stackable columns={2}>
              <Grid.Row className="team__section-1">
                <Grid.Column>
                  <Header as="h2" content=" My Team tree" />
                  <label>Referrals Distributions</label>
                  <Select
                    options={[
                      { key: "Random", value: "Random", text: "Random Team" },
                    ]}
                    value="Random"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" content=" My Referral link" />
                  <div className="input-group">
                    <Input />
                    <Button>Copy</Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid columns={1} className="team__section-2">
              <Grid.Column textAlign="center">
                <Button>To my account</Button>
                <Button>One level up</Button>
                <Button>Refresh</Button>
              </Grid.Column>
            </Grid>
            <Grid columns={2} stackable>
              <Grid.Row className="team__section-3">
                <Grid.Column>ID: 0</Grid.Column>
                <Grid.Column textAlign="right">
                  Your account (email@example.com)
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="team__section-4">
              <div className="row-between dotted">
                <dt> Referral level</dt>
                <dd>MAX</dd>
              </div>
              <div className="row-between dotted">
                <dt>Direct referrals</dt>
                <dd>123,456,789</dd>
              </div>
              <div className="row-between dotted">
                <dt>Total farmed</dt>
                <dd>1,234,567 COSMO</dd>
              </div>
              <div className="row-between dotted">
                <dt> Farmed today</dt>
                <dd>123,456,789 COSM</dd>
              </div>
            </div>
            <Grid columns={2} stackable>
              <Grid.Row className="team__section-5">
                <Grid.Column className=" br">
                  <div className="row-between row-header">
                    <dt> Left Team</dt>
                    <dd>
                      <b>Weak team</b>
                    </dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Members</dt>
                    <dd>123,456,789</dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Farmed today</dt>
                    <dd>123,456,000 COSMO</dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Total farmed</dt>
                    <dd>123,456,789,000 COSMO</dd>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="row-between row-header">
                    <dt> Right Team</dt>
                    <dd>
                      <b>Weak team</b>
                    </dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Members</dt>
                    <dd>123,456,789</dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Farmed today</dt>
                    <dd>123,456,000 COSMO</dd>
                  </div>
                  <div className="row-between dotted">
                    <dt> Total farmed</dt>
                    <dd>123,456,789,000 COSMO</dd>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default Team;

import React from "react";
import { Header, Container } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import "./Profile.scss";
import Connect from "../../components/Connect/Connect";

const Profile: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <Page title="Профиль">
      <div className={getAdaptiveClassName("profile__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content="Profile" />
        </Container>
      </div>
      <div className={getAdaptiveClassName("profile", isMobile)}>
        <Container>
          <div className="profile__level">Referral levels</div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Referral levels</th>
                  <th> STARTER</th>
                  <th>PARTNER</th>
                  <th>PRO</th>
                  <th>VIP</th>
                  <th>ELITE</th>
                  <th>MAX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CMP</td>
                  <td>-</td>
                  <td>50</td>
                  <td>500</td>
                  <td>3,000</td>
                  <td>10,000</td>
                  <td>50,000</td>
                </tr>
                <tr>
                  <td>CosmoFund NFTs</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>1</td>
                  <td>3</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Farming rewards</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Referral farming reward</td>
                  <td>-</td>
                  <td>5%</td>
                  <td>8%</td>
                  <td>10%</td>
                  <td>15%</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Team farming reward</td>
                  <td>-</td>
                  <td>5%</td>
                  <td>8%</td>
                  <td>10%</td>
                  <td>15%</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default Profile;

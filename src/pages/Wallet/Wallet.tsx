import React from "react";
import {
  Header,
  Container,
  Table,
  Grid,
  Button,
  Image,
} from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import "./Wallet.scss";
import Connect from "../../components/Connect/Connect";

const Wallet: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);

  return (
    <Page title="Мой кошелек">
      <div className={getAdaptiveClassName("wallet__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content="Мой кошелек" />
        </Container>
      </div>
      <div className={getAdaptiveClassName("wallet", isMobile)}>
        <Container>
          <Grid columns="equal" stackable>
            <Grid.Column>
              <Header as="h2" content="Wallet not Connected" />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button>
                <Image src="/icons/update.png" inline /> Update
              </Button>
            </Grid.Column>
          </Grid>
          <Table celled unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="left">
                  <b>CosmoFund NFTs</b>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <b>Amount</b>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell singleLine>CosmoMasks</Table.Cell>
                <Table.Cell textAlign="center">0/16,410</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell singleLine>CosmoMasks Limited Pack</Table.Cell>
                <Table.Cell textAlign="center">0/610</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell singleLine>MaskForMusk</Table.Cell>
                <Table.Cell textAlign="center">0/7</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {isMobile ? (
            <>
              <Table celled className="mt-1" unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell rowSpan={3} textAlign="left">
                      <b>Assets</b>
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan={3}>BSC Mainnet</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell rowSpan={2}>Unstaked</Table.HeaderCell>
                    <Table.HeaderCell colSpan={2}>Staked</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Farm V1</Table.HeaderCell>
                    <Table.HeaderCell>Farm V2</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell singleLine className="marker">
                      CMP
                    </Table.Cell>
                    <Table.Cell textAlign="center">-</Table.Cell>
                    <Table.Cell>50</Table.Cell>
                    <Table.Cell>500</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO</Table.Cell>
                    <Table.Cell textAlign="center">-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/CMP-LP</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>5%</Table.Cell>
                    <Table.Cell>8%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>5%</Table.Cell>
                    <Table.Cell>8%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>5%</Table.Cell>
                    <Table.Cell>8%</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table celled className="mt-1" unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell rowSpan={3} textAlign="left">
                      <b>Assets</b>
                    </Table.HeaderCell>

                    <Table.HeaderCell colSpan={3}>ETH Mainnet</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell rowSpan={2}>Unstaked</Table.HeaderCell>
                    <Table.HeaderCell colSpan={2}>Staked</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Farm V1</Table.HeaderCell>
                    <Table.HeaderCell>Farm V2</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell singleLine className="marker">
                      CMP
                    </Table.Cell>
                    <Table.Cell>3,000</Table.Cell>
                    <Table.Cell>10,000</Table.Cell>
                    <Table.Cell>50,000</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO</Table.Cell>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>5</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/CMP-LP</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>10%</Table.Cell>
                    <Table.Cell>15%</Table.Cell>
                    <Table.Cell>20%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>10%</Table.Cell>
                    <Table.Cell>15%</Table.Cell>
                    <Table.Cell>20%</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                    <Table.Cell>10%</Table.Cell>
                    <Table.Cell>15%</Table.Cell>
                    <Table.Cell>20%</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </>
          ) : (
            <Table celled className="mt-1" unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan={3} textAlign="left">
                    <b>Assets</b>
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan={3}>BSC Mainnet</Table.HeaderCell>
                  <Table.HeaderCell colSpan={3}>ETH Mainnet</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell rowSpan={2}>Unstaked</Table.HeaderCell>
                  <Table.HeaderCell colSpan={2}>Staked</Table.HeaderCell>
                  <Table.HeaderCell rowSpan={2}>Unstaked</Table.HeaderCell>
                  <Table.HeaderCell colSpan={2}>Staked</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Farm V1</Table.HeaderCell>
                  <Table.HeaderCell>Farm V2</Table.HeaderCell>
                  <Table.HeaderCell>Farm V1</Table.HeaderCell>
                  <Table.HeaderCell>Farm V2</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell singleLine className="marker">
                    CMP
                  </Table.Cell>
                  <Table.Cell textAlign="center">-</Table.Cell>
                  <Table.Cell>50</Table.Cell>
                  <Table.Cell>500</Table.Cell>
                  <Table.Cell>3,000</Table.Cell>
                  <Table.Cell>10,000</Table.Cell>
                  <Table.Cell>50,000</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>COSMO</Table.Cell>
                  <Table.Cell textAlign="center">-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>3</Table.Cell>
                  <Table.Cell>5</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>COSMO/CMP-LP</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>5%</Table.Cell>
                  <Table.Cell>8%</Table.Cell>
                  <Table.Cell>10%</Table.Cell>
                  <Table.Cell>15%</Table.Cell>
                  <Table.Cell>20%</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>5%</Table.Cell>
                  <Table.Cell>8%</Table.Cell>
                  <Table.Cell>10%</Table.Cell>
                  <Table.Cell>15%</Table.Cell>
                  <Table.Cell>20%</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell singleLine>COSMO/ETH-LP</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>5%</Table.Cell>
                  <Table.Cell>8%</Table.Cell>
                  <Table.Cell>10%</Table.Cell>
                  <Table.Cell>15%</Table.Cell>
                  <Table.Cell>20%</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
        </Container>
      </div>
    </Page>
  );
};

export default Wallet;

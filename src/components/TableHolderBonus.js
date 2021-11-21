import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import {
  Segment, Grid, Button, Icon, Table, Accordion, Progress
} from 'semantic-ui-react';
import Number from './Number';



function getCleanDateTimeStamp(delta = 0) {
  const now = new Date(Date.now() + delta);
  const utcDate = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0
  ));
  return Math.floor(utcDate.getTime() / 1000);
}

function getHolderBonus(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 900;
  else if (daysCount > 180) return 500;
  else if (daysCount > 90) return 300;
  else if (daysCount > 60) return 200;
  else if (daysCount > 30) return 100;
  else if (daysCount > 15) return 50;
  else if (daysCount > 7) return 20;
  else return 0;
}

function getHolderBonusPercentTo(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 900;
  else if (daysCount > 180) return 900;
  else if (daysCount > 90) return 500;
  else if (daysCount > 60) return 300;
  else if (daysCount > 30) return 200;
  else if (daysCount > 15) return 100;
  else if (daysCount > 7) return 50;
  else return 20;
}

function getHolderBonusDaysTo(days = 0) {
  const daysCount = Math.floor(days);
  if (daysCount > 360) return 360;
  else if (daysCount > 180) return 360;
  else if (daysCount > 90) return 180;
  else if (daysCount > 60) return 90;
  else if (daysCount > 30) return 60;
  else if (daysCount > 15) return 30;
  else if (daysCount > 7) return 15;
  else return 7;
}


class TableHolderBonus extends React.Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;

    const bonusPool = this.props.data || {};
    const timestamp = getCleanDateTimeStamp();
    let days = 0;
    if (bonusPool.lastWithdrawTimestamp) {
      days = Math.floor((timestamp - bonusPool.lastWithdrawTimestamp) / (24 * 60 * 60));
      if (days < 0) days = 0;
    }
    let daysTo = getHolderBonusDaysTo(days);
    let holderBonus = getHolderBonus(days);
    let holderBonusPercentTo = getHolderBonusPercentTo(days);

    return (
      <Segment>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={8} textAlign='left'><b>Holder bonus:</b> <Icon name='info circle' color='blue' /></Grid.Column>
                <Grid.Column mobile={8} textAlign='right'><b>+{holderBonus}% Bonus pool rate</b></Grid.Column>
                <Grid.Column mobile={8} textAlign='left'><b>+{holderBonus}%</b></Grid.Column>
                <Grid.Column mobile={8} textAlign='right'><b>+{holderBonusPercentTo}%</b></Grid.Column>
              </Grid.Row>
            </Grid>
            <Progress percent={days / daysTo} size='tiny' color='teal'><b>{days}/{daysTo} days</b></Progress>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={8} textAlign='left'><b>Earned today</b>
                </Grid.Column>
                <Grid.Column mobile={8} textAlign='right'>
                  <b><Number amount={bonusPool.earnedToday ? parseFloat(bonusPool.earnedToday).toFixed(6) : '0'} suffix={' COSMO'} /></b>
                </Grid.Column>
                <Grid.Column mobile={16} textAlign='left'>
                  <b>Bonus Pool rate - 30% of Farm rate per day</b>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Grid>
              <Grid.Row>
                <Table striped structured>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign='left'>Staking period</Table.HeaderCell>
                      <Table.HeaderCell textAlign='right'>My Bonus pool rate</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>7 — 14 days</Table.Cell>
                      <Table.Cell textAlign='right'>+20%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>15 — 29 days</Table.Cell>
                      <Table.Cell textAlign='right'>+50%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>30 — 59 days</Table.Cell>
                      <Table.Cell textAlign='right'>+100%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>60 — 89 days</Table.Cell>
                      <Table.Cell textAlign='right'>+200%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>90 — 179 days</Table.Cell>
                      <Table.Cell textAlign='right'>+300%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>180 — 359 days</Table.Cell>
                      <Table.Cell textAlign='right'>+500%</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>360 days</Table.Cell>
                      <Table.Cell textAlign='right'>+900%</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(TableHolderBonus));

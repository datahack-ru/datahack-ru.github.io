import React from 'react';
import { Label, Table } from 'semantic-ui-react';
import Number from './Number';



function FarmTableStakedUnstaked(props = {}) {
  const {
    symbol, totalStakedAmount, farmRate, myFarmShare, myFarmRate,
    stakedAmount, unstakedAmount, pendingReward,
  } = props;
  const suffix = ' ' + symbol;
  return (
    <Table compact>
      <Table.Body>
        <Table.Row>
          <Table.Cell><b>Total staked</b></Table.Cell>
          <Table.Cell textAlign='right'>
            <b><Number amount={parseFloat(totalStakedAmount).toFixed(6)} suffix={suffix} /></b>
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell><b>Farm rate</b></Table.Cell>
          <Table.Cell textAlign='right'>
            <b><Number amount={parseFloat(farmRate).toFixed(0)} suffix={' COSMO/day'} /></b>
          </Table.Cell>
        </Table.Row>

        <Table.Row positive>
          <Table.Cell>
            <b>My stake</b>
          </Table.Cell>
          <Table.Cell>
            <Label ribbon='right' color='teal' size='large' compact>
              <b><Number amount={parseFloat(stakedAmount).toFixed(6)} suffix={suffix} /></b>
            </Label>
          </Table.Cell>
        </Table.Row>

        <Table.Row positive>
          <Table.Cell><b>My share</b></Table.Cell>
          <Table.Cell textAlign='right'>
            <b><Number amount={parseFloat(myFarmShare).toFixed(6)} suffix={' %'} /></b>
          </Table.Cell>
        </Table.Row>

        <Table.Row positive>
          <Table.Cell><b>My rate</b></Table.Cell>
          <Table.Cell textAlign='right'>
            <b><Number amount={parseFloat(myFarmRate).toFixed(6)} suffix={' COSMO/day'} /></b>
          </Table.Cell>
        </Table.Row>

        <Table.Row positive>
          <Table.Cell><b>Unclaimed rewards</b></Table.Cell>
          <Table.Cell >
            <Label ribbon='right' color='green' size='large' compact>
              <Number amount={parseFloat(pendingReward).toFixed(6)} suffix={' COSMO'} />
            </Label>
          </Table.Cell>
        </Table.Row>

        <Table.Row negative>
          <Table.Cell><b>Wallet Balance</b></Table.Cell>
          <Table.Cell textAlign='right'>
            <b><Number amount={parseFloat(unstakedAmount).toFixed(6)} suffix={suffix} /></b>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default FarmTableStakedUnstaked;

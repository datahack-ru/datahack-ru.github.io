import React from 'react';
import { Button, Label, Tab, Input } from 'semantic-ui-react';



const FarmPanes = (props) => {
  const {
    symbol,
    handleChange,
    stakeAmount, setAllStakeAmountAction, stakeAction,
    unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
    claimAllAction, update,
  } = props;
  return [
    {
      menuItem: <Button primary fluid onClick={() => update(true)} key='update'>Update</Button>,
      render: () => null,
    },
    {
      menuItem: <Button color='teal' fluid key='stake'>Stake</Button>,
      render: () => <Tab.Pane attached={false}>
        <Input fluid labelPosition='right'
          type='number' placeholder='123.456'
          id='stakeAmount' name='stakeAmount'
          value={stakeAmount} onChange={handleChange}
        >
          <Label basic>Amount</Label>
          <input />
          <Label basic>{symbol}</Label>
          <Button primary onClick={setAllStakeAmountAction}>All</Button>
        </Input>
        <br />
        <Button color='teal' fluid onClick={stakeAction}>Stake</Button>
      </Tab.Pane>,
    },
    {
      menuItem: <Button color='red' fluid key='unstake'>Unstake</Button>,
      render: () => <Tab.Pane attached={false}>
        <Input fluid labelPosition='right'
          type='number' placeholder='123.456'
          id='unstakeAmount' name='unstakeAmount'
          value={unstakeAmount} onChange={handleChange}
        >
          <Label basic>Amount</Label>
          <input />
          <Label basic>{symbol}</Label>
          <Button primary onClick={setAllUnstakeAmountAction}>All</Button>
        </Input>
        <br />
        <Button color='red' fluid onClick={unstakeAction}>Unstake</Button>
      </Tab.Pane>,
    },
    {
      menuItem: <Button color='green' fluid key='claim'>Claim</Button>,
      render: () => <Tab.Pane attached={false}>
        <Button color='green' fluid onClick={claimAllAction}>Claim all</Button>
      </Tab.Pane>,
    },
  ];
}

export default FarmPanes;

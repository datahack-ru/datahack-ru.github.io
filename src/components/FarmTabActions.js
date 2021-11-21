import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';
import FarmPanes from './FarmPanes';



function FarmTabActions(props = {}) {
  const {
    symbol, handleChange,
    stakeAmount, setAllStakeAmountAction, stakeAction,
    unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
    claimAllAction, update,
  } = props;
  return (
    <Segment>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={FarmPanes({
          symbol, handleChange,
          stakeAmount, setAllStakeAmountAction, stakeAction,
          unstakeAmount, setAllUnstakeAmountAction, unstakeAction,
          claimAllAction, update,
        })}
      />
    </Segment>
  );
}

export default FarmTabActions;

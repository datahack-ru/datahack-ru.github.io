import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
  Header,
  Container,
  Image,
  Button,
  Input,
  Select,
} from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import "./CupToken.scss";
import Connect from "../../components/Connect/Connect";

import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useChangeNetworkModal } from '../../modal/ChangeNetworkModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useInfoModal } from '../../modal/InfoModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';
import { ethers, utils } from 'ethers';


import CupMinterAbi from '../../constants/abis/CupMinter.json';
import Erc20Abi from '../../constants/abis/erc20.json';
import {
  cosmoMasksPowerAddress, cosmoBugsPowerAddress,
  cosmoDoodlePowerAddress, cosmoArtPowerAddress,
  cupMinterAddress,
} from '../../constants';


const cmpEth = cosmoMasksPowerAddress;
const cbpEth = cosmoBugsPowerAddress;
const cdpEth = cosmoDoodlePowerAddress;
const capEth = cosmoArtPowerAddress;

const cupMinter = cupMinterAddress;


const selectOptions = [
  { key: 'CMP', value: 'CMP', text: 'CosmoMasks Power (CMP)' },
  { key: 'CBP', value: 'CBP', text: 'CosmoBugs Power (CBP)' },
  { key: 'CDP', value: 'CDP', text: 'CosmoDoodle Power (CDP)' },
  { key: 'CAP', value: 'CAP', text: 'CosmoArt Power (CAP)' },
];


interface IState {
  chainId: number | undefined,
  fee: string,
  token: string | undefined,
  amount: string,
}

const getTokenAddress = (chainId: number | undefined, symbol: string | undefined) => {
  let tokenAddress = '';
  if (chainId === 1) {
    switch (symbol) {
      case 'CMP':
        tokenAddress = cmpEth;
        break;
      case 'CBP':
        tokenAddress = cbpEth;
        break;
      case 'CDP':
        tokenAddress = cdpEth;
        break;
      case 'CAP':
        tokenAddress = capEth;
        break;
    }
  } else {
    alert('Change to Ethereum Mainnet network');
  }
  return tokenAddress;
}

const CupToken: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { onPresentChangeNetworkModal } = useChangeNetworkModal();
  const { onPresentErrorModal } = useErrorModal();
  const { onPresentInfoModal } = useInfoModal();
  const { onPresentTransactionSendedModal } = useTransactionSendedModal();
  const { onPresentTransactionConfirmedModal } = useTransactionConfirmedModal();


  const [state, setState] = useState<IState>({
    chainId: -1,
    fee: '',
    token: undefined,
    amount: '0',
  });

  const handleChange = (e: any, { name, value }: any) => {
    if (name === 'token')
      setState({ ...state, [name]: value, amount: '0' });
    else
      setState({ ...state, [name]: value, });
  }


  useEffect(() => {
    if (state.chainId !== chainId) {
      let token = undefined;
      setState({ ...state, chainId, token, });
    }
  }, [chainId]);


  const handleSubmit = async () => {
    if (!library) {
      onPresentErrorModal({ message: 'Wrong connection' });
      return;
    }

    try {
      let tokenAddress = getTokenAddress(state.chainId, state.token);
      if (state.chainId != 1) {
        onPresentErrorModal({ message: 'Wrong network! Use Ethereum Mainnet!' });
        return;
      }

      let amount = utils.parseUnits(state.amount, 18);

      const contractToken = new ethers.Contract(
        tokenAddress, Erc20Abi, library
      );

      const signer = library?.getSigner();
      const contractTokenConnected = contractToken.connect(signer);

      const owner = await signer.getAddress();
      const allowance = await contractToken.allowance(owner, cupMinter);

      if (allowance.lte(amount)) {
        const approveTx = await contractTokenConnected.approve(
          cupMinter,
          ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        );
        onPresentInfoModal({ message: 'Waiting for token spend limit approving' });
        await approveTx.wait(1);
      }

      const contract = new ethers.Contract(
        cupMinter, CupMinterAbi, library
      );

      const contractConnected = contract.connect(library?.getSigner());
      let TransactionResponse = await contractConnected.convert(tokenAddress, amount);
      onPresentTransactionSendedModal(TransactionResponse);
      const TransactionReceipt = await TransactionResponse.wait(1);
      onPresentTransactionConfirmedModal({ hash: TransactionReceipt.transactionHash });
    } catch (error) {
      onPresentErrorModal(error);
    }
  }

  const setMaxAmount = async () => {
    if (!library || !state.chainId || !state.token) return;
    const tokenAddress = getTokenAddress(state.chainId, state.token);
    const contractToken = new ethers.Contract(
      tokenAddress, Erc20Abi, library
    );
    let amount = await contractToken.balanceOf(account);
    amount = utils.formatEther(amount);
    setState({ ...state, amount, });
  }

  return (
    <Page title={'Cosmo Universal Power (CUP) - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName("bridge__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content={'Cosmo Universal Power (CUP)'} className="shadow" style={{ color: '#ffae00' }} />
        </Container>
      </div>

      <div className={getAdaptiveClassName("bridge__section-1", isMobile)}>
        <Container>
          <Header as="h2" content={t('Convert')} />

          <div className="bridge__form">
            <Select
              placeholder={t('Select Token')}
              id='token' name='token'
              options={selectOptions}
              //defaultValue={selectOptions[1].key}
              value={state.token}
              onChange={handleChange}
            />
            {t('Amount')}
            <Input
              required
              id='amount' name='amount'
              type='number' min='0'
              placeholder='123.4567'
              value={state.amount}
              onChange={handleChange}
              action={
                triedEager && active && account && state.token
                  ? <Button onClick={setMaxAmount}>{"\u00A0"}Max{"\u00A0"}</Button>
                  : null
              }
            />
            {
              triedEager && active && account
                ? <Button
                  fluid
                  onClick={handleSubmit}
                >{t('Convert')}</Button>
                : <Button
                  fluid
                  onClick={onPresentConnectModal}
                >{t('Convert')}</Button>
            }
          </div>
        </Container>
      </div>
    </Page>
  );
};

export default CupToken;

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
import "./Bridge.scss";
import Connect from "../../components/Connect/Connect";

import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useChangeNetworkModal } from '../../modal/ChangeNetworkModal';
import { useErrorModal } from '../../modal/ErrorModal';
import { useInfoModal } from '../../modal/InfoModal';
import { useTransactionSendedModal } from '../../modal/TransactionSendedModal';
import { useTransactionConfirmedModal } from '../../modal/TransactionConfirmedModal';
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import { ethers, utils } from 'ethers';


import Erc20CrossChainSwapAbi from '../../constants/abis/CosmoFundErc20CrossChainSwap.json';
import Erc20Abi from '../../constants/abis/erc20.json';
import {
  cosmoAddress, cosmoBscAddress,
  cosmoMasksPowerAddress, cosmoMasksPowerBscAddress,
  swapEthAddress, swapBscAddress
} from '../../constants';



const swapEth = swapEthAddress;
const swapBsc = swapBscAddress;

const cosmoEth = cosmoAddress;
const cosmoBsc = cosmoBscAddress;

const cmpEth = cosmoMasksPowerAddress;
const cmpBsc = cosmoMasksPowerBscAddress;


const selectOptions = [
  { key: 'COSMO', value: 'COSMO', text: 'Cosmo Token (COSMO)' },
  { key: 'CMP', value: 'CMP', text: 'CosmoMasks Power (CMP)' },
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
      case 'COSMO':
        tokenAddress = cosmoEth;
        break;
      case 'CMP':
        tokenAddress = cmpEth;
        break;
    }
  } else if (chainId === 56) {
    switch (symbol) {
      case 'COSMO':
        tokenAddress = cosmoBsc;
        break;
      case 'CMP':
        tokenAddress = cmpBsc;
        break;
    }
  }
  return tokenAddress;
}

const Bridge: React.FC = () => {
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
      let fee = '?';
      let token = undefined;
      if (chainId === 1) {
        //fee = '0.001 BNB';
        fee = '0 BNB';
      } else if (chainId === 56) {
        //fee = '0.01 ETH';
        fee = '0 ETH';
      }
      setState({ ...state, chainId, token, fee, });
    }
  }, [chainId]);


  const handleSubmit = async () => {
    if (!library) {
      onPresentErrorModal({ message: 'Wrong connection' });
      return;
    }

    try {
      let swapAddress = swapEth;
      let tokenAddress = getTokenAddress(state.chainId, state.token);
      let netId = 99;
      // из эфира в бинанс
      if (state.chainId === 1) {
        swapAddress = swapEth;
        netId = 1;
        switch (state.token) {
          case 'COSMO':
            /*if (parseInt(state.amount) < 1000000000000) {
              onPresentErrorModal({ message: 'The amount is less than the fees. Minimum 1,000,000,000,000.' });
              return;
            }*/
            break;
          case 'CMP':
            /*if (parseInt(state.amount) < 1000) {
              onPresentErrorModal({ message: 'The amount is less than the fees. Minimum 1,000.' });
              return;
            }*/
            break;
        }
        // из бинанса в эфир
      } else if (state.chainId === 56) {
        swapAddress = swapBsc;
        netId = 0;
        switch (state.token) {
          case 'COSMO':
            /*if (parseInt(state.amount) < 1000000000000) {
              onPresentErrorModal({ message: 'The amount is less than the fees. Minimum 1,000,000,000,000.' });
              return;
            }*/
            break;
          case 'CMP':
            /*if (parseInt(state.amount) < 1000) {
              onPresentErrorModal({ message: 'The amount is less than the fees. Minimum 1,000.' });
              return;
            }*/
            break;
        }
      } else {
        onPresentErrorModal({ message: 'Wrong network!' });
        return;
      }

      let amount = utils.parseUnits(state.amount, 18);

      const contractToken = new ethers.Contract(
        tokenAddress, Erc20Abi, library
      );

      const signer = library?.getSigner();
      const contractTokenConnected = contractToken.connect(signer);

      const owner = await signer.getAddress();
      const allowance = await contractToken.allowance(owner, swapAddress);

      if (allowance.lte(amount)) {
        const approveTx = await contractTokenConnected.approve(
          swapAddress,
          ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
        );
        onPresentInfoModal({ message: 'Waiting for token spend limit approving' });
        await approveTx.wait(1);
      }

      const contract = new ethers.Contract(
        swapAddress, Erc20CrossChainSwapAbi, library
      );
      const paused = await contract.paused();
      if (paused) {
        onPresentErrorModal({ message: 'Exchange for this direction is temporarily paused' });
        return;
      }

      const contractConnected = contract.connect(library?.getSigner());
      let TransactionResponse = await contractConnected.swap(netId, tokenAddress, amount);
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
    <Page title={t('Cross-chain Bridge') + ' - ' + t('projectTitle')}>
      <div className={getAdaptiveClassName("bridge__header", isMobile)}>
        <Container>
          <Connect />
          <Header as="h1" content={t('Cross-chain Bridge')} className="shadow" style={{ color: '#ffae00' }} />
        </Container>
      </div>

      <div className={getAdaptiveClassName("bridge__section-1", isMobile)}>
        <Container>
          <Header as="h2" content={t('From network')} />
          <div className="bridge__network">
            <Button
              color={chainId === 1 ? 'green' : undefined}
              active={chainId === 1}
              onClick={onPresentChangeNetworkModal}
            >Ethereum</Button>
            {!isMobile && <div>{t('or')}</div>}
            <Button
              color={chainId === 56 ? 'green' : undefined}
              active={chainId === 56}
              onClick={onPresentChangeNetworkModal}
            >Binance Smart Chain</Button>
          </div>

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
                >{t('Swap')}</Button>
                : <Button
                  fluid
                  onClick={onPresentConnectModal}
                >{t('Swap')}</Button>
            }
            <p>
              {t('swapFee', { fee: state.fee })}
            </p>
          </div>
        </Container>
      </div>

      <div className={getAdaptiveClassName("bridge__section-2", isMobile)}>
        <Container>
          <Header as="h2" content={`BNB, ETH ${t('and')} USDT`} />
          <p>
            <Image src="/icons/change.png" inline />
            <a
              href="https://accounts.binance.com/ru/register?ref=HT5QUYMN&utm_source=CosmoSwap&utm_medium=page_exchange"
              {...getExternalLinkProps()}
            >{t('buyListOnBinance', { list: `BNB, ETH ${t('and')} USDT` })}</a>
          </p>
          <p>
            <Image src="/icons/change.png" inline />
            <a
              href="https://www.binance.org/en/bridge?ref=HT5QUYMN&utm_source=CosmoSwap&utm_medium=page_exchange"
              {...getExternalLinkProps()}
            >{t('useBinanceBridge', { list: `BNB, ETH ${t('and')} USDT` })}
            </a>
          </p>
        </Container>
      </div>
    </Page>
  );
};

export default Bridge;

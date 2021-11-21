import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { ethers } from 'ethers';
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import "./Connect.scss";


import { useEagerConnect, useActiveWeb3React } from '../../hooks/index';
import useAuth from '../../hooks/useAuth';
import { useWalletModal } from '../../modal/WalletModal';
import { useChangeNetworkModal } from '../../modal/ChangeNetworkModal';

import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';


const Connect: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  const history = useHistory();

  const userId = useSelector(S.profile.getGuid);
  const myWalletLinked = useSelector(S.wallet.getLinked);

  const triedEager = useEagerConnect();
  const context3 = useActiveWeb3React();
  const { library, chainId, account, active, error } = context3;
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  const { onPresentChangeNetworkModal } = useChangeNetworkModal();



  const [address, setAddress] = useState<any>(null);
  const [addressIsLinked, setAddressIsLinked] = useState(false);

  const eth_sign = async () => {
    if (!userId) return history.push('/signin');
    const address = account?.toLowerCase();
    const timestamp = Math.ceil(Date.now() / 1000);
    let message =
      `userId: ${userId}\n` +
      `timestamp: ${timestamp}\n` +
      `address: ${address}`;
    const hash = ethers.utils.hashMessage(message);
    const params = [message, address];

    await library?.send("personal_sign", params)
      .then(async (signature: any) => {
        const recoveredAddress = ethers.utils.recoverAddress(hash, signature).toLowerCase();
        if (address === recoveredAddress) {
          const res = await api.setWalletLinkAddress(address, userId, timestamp, message, signature);
          if (res.ok) {
            setAddress(account);
            setAddressIsLinked(true);
            return;
          }
        }
      })
      .catch((error: any) => console.error(error));
  }



  useEffect(() => {
    if (account && address !== account) {
      setAddressIsLinked(false);
      api.checkAddressIsLinked(account).then((res: any) => {
        if (res.result) {
          setAddress(account);
          setAddressIsLinked(true);
        }
      }).catch((error: any) => console.error(error));
    }
  }, [account]);
  return (
    <div className="connect__wrapper">
      <div className={getAdaptiveClassName("connect", isMobile)}>
        {triedEager && active && account
          ? addressIsLinked
            ? null//<Button compact className="connect__main-btn" as={Link} to={'/wallet'}>{t('Open Wallet')}</Button>
            : <Button color='teal' compact onClick={eth_sign}>{t('Link Wallet')}</Button>
          : <Button compact className="connect__main-btn" onClick={onPresentConnectModal}>
            {t('Connect Wallet')}
          </Button>
        }

        {
          chainId === 1 || chainId === 56
            ? <>
              <Button
                compact color={chainId === 1 ? 'green' : undefined}
                active={chainId === 1}
                onClick={onPresentChangeNetworkModal}
              >ETH</Button>
              <Button
                compact color={chainId === 56 ? 'green' : undefined}
                active={chainId === 56}
                onClick={onPresentChangeNetworkModal}
              >BSC</Button>
            </>
            : <Button
              compact color='red'
              onClick={onPresentChangeNetworkModal}
            >{t('Wrong Network')}</Button>
        }
      </div>
    </div>
  );
};

export default Connect;

import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Header,
  Container,
  Table,
  Button,
  //Grid,
  //Input,
  //Select,
} from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import BigNumber from 'bignumber.js';
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import Number12 from "../../components/Number12";
//import Number4 from "../../components/Number4";
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
//import getPowerBonus from '../../utils/getPowerBonus';
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import { getUniswapV2SwapLink } from "../../utils/uniswap";
import { getPancakeswapV2SwapLink } from "../../utils/pancakeswap";
import {
  usdtAddress, usdtBscAddress,
  cosmoAddress, cosmoBscAddress,
  cupAddress,
  cosmoMasksPowerAddress, cosmoMasksPowerBscAddress,
  cosmoBugsPowerAddress, cosmoDoodlePowerAddress,
  cclpBscAddress,
} from "../../constants";
import "./Change.scss";



const Change: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  const [powerEthPrice, setPowerEthPrice] = useState('0');
  const [cupEthPrice, setCupEthPrice] = useState('0');
  const [cbpEthPrice, setCbpEthPrice] = useState('0');
  const [cdpEthPrice, setCdpEthPrice] = useState('0');
  const [cosmoEthPrice, setCosmoEthPrice] = useState('0');
  const [powerBscPrice, setPowerBscPrice] = useState('0');
  const [cosmoBscPrice, setCosmoBscPrice] = useState('0');
  const [cclpBscPrice, setCclpBscPrice] = useState('0');

  const [powerPrice, setPowerPrice] = useState('0');
  const [cosmoPrice, setCosmoPrice] = useState('0');

  const getEthPriceCosmo = async () => {
    if (!api) return;
    try {
      const res = await api.getPriceCosmoUsdt();
      setCosmoEthPrice(res);
    } catch (error) { console.error(error); }
  }
  const getEthPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getPricePower();
      setPowerEthPrice(res);
    } catch (error) { console.error(error); }
  }
  const getEthPriceCup = async () => {
    if (!api) return;
    try {
      const res = await api.getPriceCup();
      setCupEthPrice(res);
    } catch (error) { console.error(error); }
  }
  const getEthPriceCbp = async () => {
    if (!api) return;
    try {
      const res = await api.getPriceCbp();
      setCbpEthPrice(res);
    } catch (error) { console.error(error); }
  }
  const getEthPriceCdp = async () => {
    if (!api) return;
    try {
      const res = await api.getPriceCdp();
      setCdpEthPrice(res);
    } catch (error) { console.error(error); }
  }

  const getBscPriceCosmo = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPriceCosmoUsdt();
      setCosmoBscPrice(res);
    } catch (error) { console.error(error); }
  }
  const getBscPricePower = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPricePower();
      setPowerBscPrice(res);
    } catch (error) { console.error(error); }
  }
  const getBscPriceCclp = async () => {
    if (!api) return;
    try {
      const res = await api.getBscPriceCclp();
      setCclpBscPrice(res);
    } catch (error) { console.error(error); }
  }

  useEffect(() => {
    let tempPrice = new BigNumber(0);
    let tempPriceItems = 0;
    if (parseFloat(powerEthPrice) > 0) {
      tempPrice = tempPrice.plus(powerEthPrice);
      tempPriceItems++;
    }
    if (parseFloat(powerBscPrice) > 0) {
      tempPrice = tempPrice.plus(powerBscPrice);
      tempPriceItems++;
    }
    if (tempPriceItems > 1)
      setPowerPrice(tempPrice.dividedBy(tempPriceItems).toFixed(14));
    else
      setPowerPrice(tempPrice.toFixed(14));
  }, [powerEthPrice, powerBscPrice]);

  useEffect(() => {
    let tempPrice = new BigNumber(0);
    let tempPriceItems = 0;
    if (parseFloat(cosmoEthPrice) > 0) {
      tempPrice = tempPrice.plus(cosmoEthPrice);
      tempPriceItems++;
    }
    if (parseFloat(cosmoBscPrice) > 0) {
      tempPrice = tempPrice.plus(cosmoBscPrice);
      tempPriceItems++;
    }

    if (tempPriceItems > 1)
      setCosmoPrice(tempPrice.dividedBy(tempPriceItems).toFixed(14));
    else
      setCosmoPrice(tempPrice.toFixed(14));
  }, [cosmoEthPrice, cosmoBscPrice]);

  const ethBlockNumber: number = useSelector((state) => S.ethereum.getBlockNumber(state));
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    if (updating) return;
    setUpdating(true);
    try {
      getEthPriceCosmo();
      getEthPriceCup();
      getEthPricePower();
      getEthPriceCbp();
      getEthPriceCdp();
    } catch (error) { console.error(error); }
    setUpdating(false);
  }, [ethBlockNumber]);


  const bscBlockNumber: number = useSelector((state) => S.binance.getBlockNumber(state));
  const [updating2, setUpdating2] = useState(false);
  useEffect(() => {
    if (updating2) return;
    setUpdating2(true);
    try {
      getBscPriceCosmo();
      getBscPricePower();
      getBscPriceCclp()
    } catch (error) { console.error(error); }
    setUpdating2(false);
  }, [bscBlockNumber]);

  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <Page title={`${t('Exchange')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("change__header", isMobile)}>
        <Container>
          <Header as="h1" content={t('projectTitle')} className="shadow" style={{ color: '#ffae00' }} />
        </Container>
      </div>


      <div className={getAdaptiveClassName("change__section-3", isMobile)}>
        <Container>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t('Asset')}</Table.HeaderCell>
                <Table.HeaderCell colSpan={2}>Ethereum</Table.HeaderCell>
                <Table.HeaderCell colSpan={2}>Binance Smart Chain</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell singleLine>CCLP</Table.Cell>

                <Table.Cell>-</Table.Cell>
                <Table.Cell className={'p0'}>-</Table.Cell>

                <Table.Cell><Number12 value={cclpBscPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getPancakeswapV2SwapLink(usdtBscAddress, cclpBscAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>COSMO</Table.Cell>

                <Table.Cell><Number12 value={cosmoEthPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getUniswapV2SwapLink(usdtAddress, cosmoAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>

                <Table.Cell><Number12 value={cosmoBscPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getPancakeswapV2SwapLink(usdtBscAddress, cosmoBscAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>CUP</Table.Cell>

                <Table.Cell><Number12 value={cupEthPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getUniswapV2SwapLink(cosmoAddress, cupAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>

                <Table.Cell>-</Table.Cell>
                <Table.Cell className={'p0'}>-</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>CMP</Table.Cell>

                <Table.Cell><Number12 value={powerEthPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getUniswapV2SwapLink(cosmoAddress, cosmoMasksPowerAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>

                <Table.Cell><Number12 value={powerBscPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getPancakeswapV2SwapLink(cosmoBscAddress, cosmoMasksPowerBscAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>CBP</Table.Cell>

                <Table.Cell><Number12 value={cbpEthPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getUniswapV2SwapLink(cosmoAddress, cosmoBugsPowerAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>

                <Table.Cell>-</Table.Cell>
                <Table.Cell className={'p0'}>-</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell singleLine>CDP</Table.Cell>

                <Table.Cell><Number12 value={cdpEthPrice} prefix='$' /></Table.Cell>
                <Table.Cell className={'p0'}>
                  <Button
                    size='small' as={'a'}
                    href={getUniswapV2SwapLink(cosmoAddress, cosmoDoodlePowerAddress)}
                    {...getExternalLinkProps()}
                  >{t('Swap')}</Button>
                </Table.Cell>

                <Table.Cell>-</Table.Cell>
                <Table.Cell className={'p0'}>-</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    </Page>
  );
};

export default Change;

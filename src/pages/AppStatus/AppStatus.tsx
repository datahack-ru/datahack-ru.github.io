import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Header,
  Container,
  Image,
  Button,
  Input,
  Select,
  Icon, Label, Menu, Table,
} from 'semantic-ui-react';
import Number from '../../components/Number';
import * as S from '../../store/selectors';
import { api } from '../../store/configureStore';
import './AppStatus.scss';



const AppStatusPage: React.FC = () => {
  const { t } = useTranslation();

  const isWsConnected: boolean = useSelector((state) => S.data.isWsConnected(state));
  const wsId: boolean = useSelector((state) => S.data.getWsId(state));

  const bscBlockNumberProvider: number = useSelector((state) => S.data.getBscBlockNumberProvider(state));
  const bscBlockNumberInternal: number = useSelector((state) => S.data.getBscBlockNumberInternal(state));
  const bscBlockNumberExternal: number = useSelector((state) => S.data.getBscBlockNumberExternal(state));

  const ethBlockNumberProvider: number = useSelector((state) => S.data.getEthBlockNumberProvider(state));
  const ethBlockNumberInternal: number = useSelector((state) => S.data.getEthBlockNumberInternal(state));
  const ethBlockNumberExternal: number = useSelector((state) => S.data.getEthBlockNumberExternal(state));

  const bscData: any = useSelector((state) => S.data.getBscData(state));

  return (
    <div>
      <Helmet>
        <title>App Status - CosmoSwap</title>
      </Helmet>

      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing >Parameter</Table.HeaderCell>
              <Table.HeaderCell collapsing >Value</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row negative={!isWsConnected} positive={isWsConnected}>
              <Table.Cell colSpan='3'>WebSocket</Table.Cell>
            </Table.Row>
            <Table.Row negative={!isWsConnected} positive={isWsConnected}>
              <Table.Cell>isWsConnected</Table.Cell>
              <Table.Cell>{JSON.stringify(isWsConnected)}</Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>
            <Table.Row negative={!isWsConnected} positive={isWsConnected}>
              <Table.Cell>wsId</Table.Cell>
              <Table.Cell>{JSON.stringify(wsId)}</Table.Cell>
              <Table.Cell>-</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell colSpan='3'>Nodes BSC</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Provider</Table.Cell>
              <Table.Cell><Number value={bscBlockNumberProvider} /></Table.Cell>
              <Table.Cell>BlockNumber</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Internal</Table.Cell>
              <Table.Cell><Number value={bscBlockNumberInternal} /></Table.Cell>
              <Table.Cell>BlockNumber from server via WS</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>External</Table.Cell>
              <Table.Cell><Number value={bscBlockNumberExternal} /></Table.Cell>
              <Table.Cell>BlockNumber from server via WS</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell colSpan='3'>Nodes ETH</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Provider</Table.Cell>
              <Table.Cell><Number value={ethBlockNumberProvider} /></Table.Cell>
              <Table.Cell>BlockNumber</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Internal</Table.Cell>
              <Table.Cell><Number value={ethBlockNumberInternal} /></Table.Cell>
              <Table.Cell>BlockNumber from server via WS</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>External</Table.Cell>
              <Table.Cell><Number value={ethBlockNumberExternal} /></Table.Cell>
              <Table.Cell>BlockNumber from server via WS</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell colSpan='3'>bscData</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>bscData</Table.Cell>
              <Table.Cell>{JSON.stringify(bscData, null, 2)}</Table.Cell>
              <Table.Cell>JSON</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan='3'>-</Table.Cell>
            </Table.Row>

          </Table.Body>
        </Table>
      </Container>
    </div>
  );
};

export default hot(module)(AppStatusPage);

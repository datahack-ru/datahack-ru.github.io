import React from "react";
import { hot } from 'react-hot-loader';
import { useTranslation, Trans } from 'react-i18next';
import { Header, Container, Grid, Image, Button } from "semantic-ui-react";
import { useMediaPredicate } from "react-media-hook";
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import Page from "../../components/Page";
import getExternalLinkProps from "../../utils/getExternalLinkProps";
import NftHeader from '../../components/NftHeader';
import "./NftCollections.scss";



import _ from 'lodash';
import { Table } from 'semantic-ui-react';


const tableData = [
  {
    name: 'CosmoMasks', price: 1.0, left: 100,
    address: '0x0580Ae26963230BFBd2A775ff0AFA937Fd157774',
    web: 'https://thecosmomasks.com/',
    opensea: 'https://opensea.io/collection/cosmomasks-main-collection',
  },
  {
    name: 'CosmoBugs', price: 2.0, left: 200,
    address: '0xE97dDABfE81E3532EF6A0119463C9D12D41a962A',
    web: 'https://cosmobugs.com/',
    opensea: 'https://opensea.io/collection/cosmobugs',
  },
  {
    name: 'CosmoDoodle', price: 3.0, left: 300,
    address: '0x01289F699Fb3fbFf7c94C597Fa784eb971d3fd5b',
    web: 'https://thecosmodoodle.com/',
    opensea: 'https://opensea.io/collection/cosmodoodle',
  },
  {
    name: 'CosmoArt', price: 0.1, left: 400,
    address: '0x5D464B5118e2c5677B88Ac964B47495538052A80',
    web: 'https://thecosmoart.com/',
    opensea: 'https://opensea.io/collection/cosmoart',
  },

  /*{
    name: 'CosmoMasks Limited Pack', price:  0.0, left: 110,
    address: '0x5256187d635300d82f0E66D2f41e5926ba880377',
    web: null,
    opensea: 'https://opensea.io/collection/cosmomasks-limited-pack',
  },
  {
    name: 'MaskForMusk', price: 0.0, left: 110,
    address: '0x04FC6f48eBb05006d451D88f6199AcA59c4CD6a6',
    web: null,
    opensea: 'https://opensea.io/collection/maskformusk',
  },*/
]

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

function NftCollectionsTableSortable() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: tableData,
    direction: null,
  })
  const { column, data, direction } = state

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            textAlign='left'
            sorted={column === 'name' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
          >{'Name'}</Table.HeaderCell>
          <Table.HeaderCell
            textAlign='right'
            sorted={column === 'price' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
          >{'Price'}</Table.HeaderCell>
          <Table.HeaderCell
            textAlign='right'
            sorted={column === 'left' ? direction : null}
            onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'left' })}
          >{'Left'}</Table.HeaderCell>
          <Table.HeaderCell
            textAlign='right'
          >{'Actions'}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((props: any) => {
          const { name, price, left, opensea, } = props;

          return (
            <Table.Row key={name}>
              <Table.Cell textAlign='left'>{name}</Table.Cell>
              <Table.Cell textAlign='right'>{price} ETH</Table.Cell>
              <Table.Cell textAlign='right'>{left}</Table.Cell>
              <Table.Cell textAlign='right'>
                <Button content={'Buy'} size='mini' color='teal' /> | <a {...getExternalLinkProps()} href={opensea}>OpenSea.io</a>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}


const PageNftCollections: React.FC = () => {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { i18n, t } = useTranslation();


  return (
    <Page title={`${t('NFT collections')} - ${t('projectTitle')}`}>
      <div className={getAdaptiveClassName("nft__header", isMobile)}>
        <Container>
          <NftHeader />
        </Container>
      </div>

      <div>
        <br />
        <NftCollectionsTableSortable />
        <br />
      </div>
    </Page>
  );
};

export default hot(module)(PageNftCollections);

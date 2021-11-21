import React, { useState, useEffect, useCallback, } from "react";
import { useTranslation } from 'react-i18next';
//import { useSelector } from 'react-redux';
import Tree from 'react-d3-tree';
import { Image, Icon, Divider, Popup, Label, Grid } from 'semantic-ui-react';
import { getAdaptiveClassName, mobileBreakpoint } from "../../helpers/Media";
import { useMediaPredicate } from "react-media-hook";
import Number from '../../components/Number';
//import * as S from '../../store/selectors';
//import { api } from '../../store/configureStore';
import './RefTree.css';


const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      //setTranslate({ x: width / 2, y: height / 2 });
      setTranslate({ x: width / 2, y: -60 });
    }
  }, []);
  return [translate, containerRef];
};


const straightPathFunc = (linkDatum, orientation) => {
  const { source, target } = linkDatum;
  return orientation === 'horizontal'
    ? `M${source.y},${source.x}L${target.y},${target.x}`
    : `M${source.x},${source.y}L${target.x},${target.y}`;
};


function processTreeData(treeData, isMobile, isTablet) {
  if (!treeData.children)
    return treeData;
  if (isMobile) {
    const data = JSON.parse(JSON.stringify(treeData));
    data.children[0].children = [];
    data.children[1].children = [];
    return data;
  }
  if (isTablet) {
    const data = JSON.parse(JSON.stringify(treeData));
    data.children[0].children[0].children = [];
    data.children[0].children[1].children = [];
    data.children[1].children[0].children = [];
    data.children[1].children[1].children = [];
    return data;
  }
  return treeData;
}


function RefTree({ onNodeClick, treeData }) {
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();
  //const userGuid = useSelector((state) => S.profile.getGuid(state));
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 120, y: 120 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: -nodeSize.x / 2, y: -nodeSize.y / 2 };


  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }) => {
    if (!nodeDatum.attributes || nodeDatum.attributes.root)
      return (null);

    if (nodeDatum.attributes.freePlace) {
      return (
        <g>
          <foreignObject {...foreignObjectProps}>
            <div
              //onClick={() => onNodeClick(nodeDatum.attributes.guid)}
              style={{
                cursor: 'pointer', borderRadius: '6px',
                border: "1px solid black", borderWidth: '1px', //borderColor: 'rgba(232,237,250,1)',
                backgroundColor: 'rgba(255,255,255,1)',
                //textAlign: 'center',
                padding: '12px',
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '-.2px',
                height: '120px',
                width: '120px',
              }}>
              <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: "center",
                color: 'black'
              }}>
                <br />
                <Icon name='user plus' size='large' color='grey' />
                <Divider hidden style={{ margin: '0.4rem 0' }} />
                <Divider hidden style={{ margin: '0.4rem 0' }} />
                <span style={{ fontWeight: 700 }}>{t('Free place')}</span>
              </div>
            </div>
          </foreignObject>
        </g>
      );
    }

    const label = nodeDatum.attributes.email && nodeDatum.attributes.email.substring(0, 2).toUpperCase();
    return (
      <g>
        <foreignObject {...foreignObjectProps}>
          <Popup
            basic
            position='right center'
            content={
              <div
                style={{
                  fontSize: '12px',
                }}
              >
                <Grid textAlign='left' columns={2}>
                  <Grid.Row style={{}}>
                    <Grid.Column>{nodeDatum.attributes.email}</Grid.Column>
                    <Grid.Column textAlign='right'>
                      {
                        nodeDatum.attributes.directReferral && <Label color='blue' horizontal size='mini'>{t('Direct referral')}</Label>
                      }
                      {
                        nodeDatum.attributes.spilloverReferral && <Label color='red' horizontal size='mini'>{t('Spillover referral')}</Label>
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider style={{ margin: '0.4rem 0' }} />
                <Grid textAlign='left' columns={2}>
                  <Grid.Row style={{ marginBottom: '-1rem', }}>
                    <Grid.Column>{t('Level')}</Grid.Column>
                    <Grid.Column textAlign='right'>{nodeDatum.attributes.level}</Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ marginTop: '-1rem', marginBottom: '-1rem', }}>
                    <Grid.Column>{t('Staked')}</Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Number value={nodeDatum.attributes.stakedUsd} prefix={'$'} decimalScale={0} fixedDecimalScale={true} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ marginTop: '-1rem', }}>
                    <Grid.Column>NFT</Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Number value={nodeDatum.attributes.nfts} decimalScale={0} fixedDecimalScale={true} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            }
            trigger={
              <div
                onClick={() => onNodeClick(nodeDatum.attributes.guid)}
                style={{
                  cursor: 'pointer', borderRadius: '6px',
                  border: "1px solid black", borderWidth: '1px', //borderColor: 'rgba(232,237,250,1)',
                  backgroundColor: 'rgba(255,255,255,1)',
                  //textAlign: 'center',
                  padding: '12px',
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '-.2px',
                  height: '120px',
                  width: '120px',
                }}>
                <div style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  textAlign: "center",
                  color: 'black'
                }}>
                  {nodeDatum.attributes.directReferral &&
                    <Icon.Group size='large'>
                      <Image label={label} inline />
                      <Icon circular inverted color='blue' name='users' corner='top right' />
                    </Icon.Group>
                  }
                  {nodeDatum.attributes.spilloverReferral &&
                    <Icon.Group size='large'>
                      <Image label={label} inline />
                      <Icon circular inverted color='red' name='level up alternate' corner='top right' />
                    </Icon.Group>
                  }
                  {!nodeDatum.attributes.directReferral && !nodeDatum.attributes.spilloverReferral &&
                    <Icon.Group size='large'>
                      <Image label={label} inline />
                    </Icon.Group>
                  }
                  <Divider hidden style={{ margin: '0.4rem 0' }} />
                  ID {nodeDatum.attributes.guid}
                  <Divider style={{ margin: '0.4rem 0' }} />
                  <span style={{ fontWeight: 700 }}>{nodeDatum.attributes.level}</span>
                </div>
              </div>}
          />
        </foreignObject>
      </g>
    );
  };


  return (
    <div className='referralTreeContainer'>
      <div className='referralTreeWrapper' ref={containerRef} style={{ height: isMobile ? '170px' : '450px' }}>
        <Tree
          data={processTreeData(treeData, isMobile)}
          //rootNodeClassName='node__root'
          //branchNodeClassName='node__branch'
          //leafNodeClassName='node__leaf'

          pathClassFunc={() => 'referral-tree-link'}
          pathFunc='step'
          orientation='vertical'
          collapsible={false}
          zoomable={false}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
          }
          //nodeSize={{ x: 170, y: 170 }}
          enableLegacyTransitions={true}
          transitionDuration={500}
          translate={translate}
          //separation={{ siblings: 2, nonSiblings: 2 }}
          separation={{ siblings: 1, nonSiblings: 1 }}
        />
      </div>
    </div>
  );
}


export default RefTree;



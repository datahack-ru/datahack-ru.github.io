import React from 'react';
import { hot } from 'react-hot-loader';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { useMediaPredicate } from 'react-media-hook';
import { NavLink } from 'react-router-dom';
import { mobileBreakpoint } from '../../helpers/Media';




const FarmingMenu: React.FC<any> = (props) => {
  const { style } = props;
  const isMobile = useMediaPredicate(mobileBreakpoint);
  const { t } = useTranslation();

  return (
    <div style={{ ...style, }}>
      <Menu secondary fluid widths='5' /*stackable*/ >
        <Menu.Item
          name={isMobile ? '' : t('My statistics')}
          icon='chart bar'
          as={NavLink} exact to={'/nft'}
        />
        <Menu.Item
          name={isMobile ? '' : 'Collections'}
          icon='database'
          as={NavLink} exact to={'/nft/collections'}
        />
        <Menu.Item
          name={isMobile ? '' : t('Referral tree')}
          icon='sitemap'
          as={NavLink} exact to={'/nft/tree'}
        />
      </Menu>
    </div>
  );
};


export default hot(module)(FarmingMenu);

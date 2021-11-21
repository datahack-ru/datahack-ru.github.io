import * as React from 'react';
import { hot } from 'react-hot-loader';
import { withTranslation } from 'react-i18next';
import { Container } from 'semantic-ui-react';
import Page from '../components/Page';
import FormSignIn from '../components/FormSignIn';



class PageSignIn extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Page
        title={t('Sign In') + ' - CosmoSwap'}
      >
        <Container textAlign='center' style={{ padding: '5em 0em' }} >
          <FormSignIn />
        </Container>
      </Page >
    );
  }
}

export default hot(module)(withTranslation()(PageSignIn));

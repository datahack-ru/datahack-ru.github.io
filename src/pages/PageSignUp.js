import * as React from 'react';
import { hot } from 'react-hot-loader';
import { withTranslation } from 'react-i18next';
import { Container } from 'semantic-ui-react';
import Page from '../components/Page';
import FormSignUp from '../components/FormSignUp';



class PageSignUp extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Page
        title={t('Sign Up') + ' - CosmoSwap'}
      >
        <Container textAlign='center' style={{ padding: '5em 0em' }} >
          <FormSignUp />
        </Container>
      </Page >
    );
  }
}

export default hot(module)(withTranslation()(PageSignUp));

import React from 'react';
import { hot } from 'react-hot-loader';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as S from '../store/selectors';
import * as A from '../store/actions';



class FormSignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '', password: '',
      hidden: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }

  handleChange(e, { name, value }) {
    value = value.trim();
    this.setState({ [name]: value, });
  }

  handleSubmit() {
    this.props.signIn(this.state);
  }

  showPassword(e) {
    e.preventDefault();
    this.setState((prevState) => ({ hidden: !prevState.hidden }));
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/my');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/my');
    }
  }

  render() {
    const { handleChange, handleSubmit, showPassword } = this;
    const { email, password, hidden } = this.state;
    const { t } = this.props;

    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            {/*<Image src='/favicon-96x96.png' />*/} Sign In
          </Header>
          <Segment textAlign='left' basic>
            <Form size='large' onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  required
                  type='email' id='email' name='email'
                  label={t('Email')} placeholder='my@email.com'
                  fluid icon='user' iconPosition='left'
                  value={email}
                  onChange={handleChange}
                />

                <Form.Input
                  required
                  type={hidden ? 'password' : 'text'} id='password' name='password'
                  label={t('Password')} placeholder='Password'
                  fluid icon='lock' iconPosition='left'
                  action={{
                    icon: hidden ? 'eye slash' : 'eye',
                    onClick: showPassword,
                  }}
                  minLength={8}
                  value={password}
                  onChange={handleChange}
                />

                <Button type='submit' fluid size='large'>{t('Sign In')}</Button>
              </Segment>
            </Form>
            <Message>
              <b>{t('Don’t have a CosmoSwap account')}? <Link to={'/signup'}>{t('Sign Up')}</Link></b>
            </Message>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => dispatch(A.profile.signIn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withTranslation()(
      hot(module)(FormSignIn)
    )
  )
);

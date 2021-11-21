import React from 'react';
import { hot } from 'react-hot-loader';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as S from '../store/selectors';
import * as A from '../store/actions';



class FormSignUp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '', password: '',
      parent: props.parent, agree: false,
      hidden: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }

  handleChange(e, { name, value }) {
    if (name === 'agree') {
      this.setState((prevState) => ({ agree: !prevState.agree }));
    } else {
      value = value.trim();
      this.setState({ [name]: value, });
    }
  }

  handleSubmit(e) {
    if (this.state.agree)
      this.props.signUp(this.state);
    else
      alert(this.props.t('You do not agree with the CosmoSwap Terms of Use and Privacy Policy'));
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
    const { email, password, parent, agree, hidden } = this.state;
    const { t } = this.props;

    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            {/*<Image src='/favicon-96x96.png' />*/} Sing Up
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
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  minLength={8}
                  value={password}
                  onChange={handleChange}
                  title={t('Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters')}
                />

                <Form.Input
                  type='number' min='0' id='parent' name='parent'
                  label={t('Referral ID (Optional)')} placeholder='12345'
                  fluid icon='sitemap' iconPosition='left'
                  value={parent}
                  onChange={handleChange}
                />

                <Form.Checkbox
                  required
                  id='agree' name='agree'
                  label={t('I am over 18 years old, and I agree to CosmoSwap Terms of Use and Privacy Policy')}
                  checked={agree}
                  onChange={handleChange}
                />

                <Button type='submit' fluid size='large'>{t('Create account')}</Button>
              </Segment>
            </Form>
            <Message>
              <b>{t('Already have a CosmoSwap account')}? <Link to={'/signin'}>{t('Sign In')}</Link></b>
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
    parent: S.profile.getParent(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (data) => dispatch(A.profile.signUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withTranslation()(
      hot(module)(FormSignUp)
    )
  )
);

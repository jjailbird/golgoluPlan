import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import Title from 'react-title-component';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';

const pageTitle = '로그인';

const styles = {
  form: {
    margin: '30px auto 0',
  },
  textField: {
    display: 'block',
    width: '100%',
  },
  label: {
    lineHeight: '50px',
    fontWeight: '600',
  },
  button: {
    height: '50px',
    width: '200px',
    marginTop: '50px',
    marginBottom: '15px',
  },
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      errorMessage: '',
      errorOpen: false,
    };
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  onSubmit(data) {
    let message = '';
    Meteor.loginWithPassword(data.username, data.password, error => {
      if (error) {
        message = error.reason;
        this.setState({
          errorMessage: message,
          errorOpen: true,
        });
      } else {
        browserHistory.push('/home');
        // this.context.router.push('/');
      }
    });
    return;
  }
  onTextChange() {
    this.setState({ errorOpen: false });
  }
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <Divider />
        <Formsy.Form
          style={styles.form}
          onValid={this.enableSubmitButton}
          onSubmit={this.onSubmit}
        >
          <FormsyText
            name="username"
            style={styles.textField}
            floatingLabelText="User's Access ID or Email"
            onChange={this.onTextChange}
            required
          />
          <FormsyText
            name="password"
            ref="password"
            style={styles.textField}
            floatingLabelText="Password"
            type="password"
            required
            onChange={this.onTextChange}
          />
          {this.state.errorOpen ?
            <h5 style={{ color: 'red' }}>{this.state.errorMessage}</h5>
            : ''
          }
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="Log In"
            secondary
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  dispatch: React.PropTypes.func,
};

SignIn.contextTypes = {
  router: React.PropTypes.object,
};

export default connect()(SignIn);

import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

import Title from 'react-title-component';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';

const pageTitle = '회원가입';

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

Formsy.addValidationRule('isUserID',
  (values, value) => (
    /^[a-z0-9-_]+$/.test(value)
    && (value !== undefined && value.length >= 5 && value.length <= 20)
  )
);
Formsy.addValidationRule('isPassword',
  (values, value) => (
     /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(value)
    && (value !== undefined && value.length >= 6 && value.length <= 16)
  )
);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      dialogOpen: false,
      dialogError: false,
      dialogMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  onSubmit(data) {
    let message = '';
    Accounts.createUser(data, (error) => {
      if (error) {
        message = error.reason;
      } else {
        message = '회원가입이 완료 되었습니다.';
      }
      this.setState({
        dialogMessage: message,
        dialogOpen: true,
      });
    });
    return;
  }
  onSubmitKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
  }
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  disableSubmitButton() {
    this.setState({ canSubmit: false });
  }
  handleClose() {
    this.setState({ dialogOpen: false });
    // if (this.state.)this.context.router.push('/');
  }
  render() {
    const actions = <FlatButton label="확인" primary onTouchTap={this.handleClose} />;
    return (
      <div className="root">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <h2>회원가입</h2>
        <Divider />
        <Formsy.Form
          style={styles.form}
          onValid={this.enableSubmitButton}
          onSubmit={this.onSubmit}
        >
          <FormsyText
            name="username"
            style={styles.textField}
            floatingLabelText="User's Access ID"
            required
            validations="isUserID"
            validationError="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
          />
          <FormsyText
            name="email"
            style={styles.textField}
            floatingLabelText="Email Address"
            validations="isEmail"
            validationError="올바른 이메일 형식이 아닙니다."
            required
          />
          <FormsyText
            name="password"
            style={styles.textField}
            floatingLabelText="Password"
            type="password"
            // validations="isPassword"
            // validationError="6~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
            required
          />
          <FormsyText
            name="password_confirm"
            style={styles.textField}
            floatingLabelText="Confirm Password"
            type="password"
            validations="equalsField:password"
            validationError="패스워드가 일치하지 않습니다."
          />
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="Sign Up"
            secondary
            disabled={!this.state.canSubmit}
            // onKeyPress={this.onSubmitKeyPress}
          />
        </Formsy.Form>
        <Dialog
          title="회원가입"
          actions={actions}
          open={this.state.dialogOpen}
        >
          {this.state.dialogMessage}
        </Dialog>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(SignUp);

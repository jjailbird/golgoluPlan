import { Accounts } from 'meteor/accounts-base';

import React from 'react';
import Title from 'react-title-component';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

import { Link } from 'react-router';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';

const pageTitle = 'HOME LOGIN';

class HomeRegister extends React.PureComponent {
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
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  onSubmit(data) {
    let message = '';
    const accountData = data;
    // accountData.username = data.email.split('@')[0];
    // console.log('data', accountData);
    Accounts.createUser(accountData, (error) => {
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
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  disableSubmitButton() {
    this.setState({ canSubmit: false });
  }
  handleDialogClose() {
    this.setState({ dialogOpen: false });
    // if (this.state.)this.context.router.push('/');
  }
  render() {
    const dialogActions = <FlatButton label="확인" primary onTouchTap={this.handleDialogClose} />;
    const inputWidth = '250px';
    const inputHeight = '40px';

    return (
      <div
        className="full-area"
        style={{
          backgroundImage: 'url("/img/home.login.bak.mini.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <table className="full-area center">
          <tbody>
            <tr>
              <td>
                <h1
                  style={{ color: '#fff' }}
                >
                  골고루<span style={{ fontWeight: 'normal', marginBottom: '5px' }}>플랜</span>
                </h1>
                <h6 style={{ color: '#fff', top: '-20px' }}>
                  Eat well live healthy
                </h6>
                <Formsy.Form
                  style={{ textAlign: 'center' }}
                  onValid={this.enableSubmitButton}
                  onSubmit={this.onSubmit}
                >
                  <div>
                    <FormsyText
                      name="username"
                      className="input-user"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        width: inputWidth,
                        height: inputHeight,
                        marginBottom: '14px',
                      }}
                      hintText="User Name"
                      hintStyle={{
                        paddingLeft: '50px',
                        color: '#fff',
                        fontWeight: 'normal',
                        top: '10px',
                      }}
                      inputStyle={{
                        padding: '0px 0px 0px 50px',
                        color: '#fff',
                        fontWeight: 'normal',
                      }}
                      underlineShow={false}
                      onChange={this.onTextChange}
                      required
                    />
                  </div>
                  <div>
                    <FormsyText
                      name="email"
                      className="input-email"
                      validations="isEmail"
                      validationError="올바른 이메일 형식이 아닙니다."
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        width: inputWidth,
                        height: inputHeight,
                        marginBottom: '14px',
                      }}
                      hintText="Email Address"
                      hintStyle={{
                        paddingLeft: '50px',
                        color: '#fff',
                        fontWeight: 'normal',
                        top: '10px',
                      }}
                      inputStyle={{
                        padding: '0px 0px 0px 50px',
                        color: '#fff',
                        fontWeight: 'normal',
                      }}
                      underlineShow={false}
                      onChange={this.onTextChange}
                      required
                    />
                  </div>
                  <div>
                    <FormsyText
                      name="password"
                      className="input-password"
                      type="password"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        width: inputWidth,
                        height: inputHeight,
                        marginBottom: '14px',
                      }}
                      hintText="Password"
                      hintStyle={{
                        paddingLeft: '50px',
                        color: '#fff',
                        fontWeight: 'normal',
                        top: '10px',
                      }}
                      inputStyle={{
                        padding: '0px 0px 0px 50px',
                        color: '#fff',
                        fontWeight: 'normal',
                      }}
                      underlineShow={false}
                      onChange={this.onTextChange}
                      required
                    />
                  </div>
                  <div>
                    <FormsyText
                      name="password_confirm"
                      className="input-password"
                      type="password"
                      validations="equalsField:password"
                      validationError="패스워드가 일치하지 않습니다."
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        width: inputWidth,
                        height: inputHeight,
                        marginBottom: '14px',
                      }}
                      hintText="Confirm Password"
                      hintStyle={{
                        paddingLeft: '50px',
                        color: '#fff',
                        fontWeight: 'normal',
                        top: '10px',
                      }}
                      inputStyle={{
                        padding: '0px 0px 0px 50px',
                        color: '#fff',
                        fontWeight: 'normal',
                      }}
                      underlineShow={false}
                      onChange={this.onTextChange}
                      required
                    />
                  </div>
                  <RaisedButton
                    style={{
                      display: 'block',
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    backgroundColor="#fbc305"
                    disabledBackgroundColor="#fbc305"
                    buttonStyle={{
                      width: inputWidth,
                      height: inputHeight,
                      borderRadius: '3px',
                      textAlign: 'center',
                    }}
                    labelStyle={{
                      fontSize: '16px',
                    }}
                    type="submit"
                    label="회원등록"
                    labelColor="#fff"
                    disabled={!this.state.canSubmit}
                  />
                </Formsy.Form>
                <div
                  style={{
                    padding: '18px',
                  }}
                >
                  <Link className="link-normal" to="/homelogin">로그인</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Dialog
          title="회원가입"
          actions={dialogActions}
          open={this.state.dialogOpen}
        >
          {this.state.dialogMessage}
        </Dialog>
      </div>
    );
  }
}

HomeRegister.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(HomeRegister);

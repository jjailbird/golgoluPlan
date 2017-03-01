import { Meteor } from 'meteor/meteor';

import React from 'react';
import Title from 'react-title-component';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';
import { signin, signout } from '../../redux/actions/authenticate.js';

const pageTitle = 'HOME LOGIN';

class HomeLogin extends React.PureComponent {
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
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  handleDialogClose() {
    this.setState({ errorOpen: false });
    // if (this.state.)this.context.router.push('/');
  }
  onSubmit(data) {
    let message = '';
    Meteor.loginWithPassword(data.email, data.password, error => {
      if (error) {
        message = error.reason;
        this.setState({
          errorMessage: message,
          errorOpen: true,
        });
      } else {
        const { dispatch } = this.props;
        dispatch(signin(Meteor.user()));

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
    const dialogActions = <FlatButton label="확인" primary onTouchTap={this.handleDialogClose} />;
    const inputWidth = '250px';
    const inputHeight = '40px';

    return (
      <div
        className="full-area"
        style={{
          backgroundImage: 'url("/img/home.login.background.mini.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <table className="full-area center">
          <tbody>
            <tr>
              <td>
                <img alt="logo" width="100" src="/img/home.login.logo.png" />
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
                      name="email"
                      type="email"
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
                    label="로그인"
                    labelColor="#fff"
                    disabled={!this.state.canSubmit}
                  />
                </Formsy.Form>
                <div
                  style={{
                    padding: '18px',
                  }}
                >
                  <Link className="link-normal" to="/homeregister">회원등록</Link>
                </div>
                <RaisedButton
                  className="button-facebook"
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    marginBottom: '14px',
                  }}
                  backgroundColor="#3f499b"
                  disabledBackgroundColor="#3f499b"
                  buttonStyle={{
                    width: inputWidth,
                    height: inputHeight,
                    borderRadius: '3px',
                    textAlign: 'center',
                  }}
                  labelStyle={{
                    fontSize: '16px',
                  }}
                  type="button"
                  label="facebook 로그인"
                  labelColor="#fff"
                />
                <RaisedButton
                  className="button-naver"
                  style={{
                    display: 'block',
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    marginBottom: '14px',
                  }}
                  backgroundColor="#3dc900"
                  disabledBackgroundColor="#3dc900"
                  buttonStyle={{
                    width: inputWidth,
                    height: inputHeight,
                    borderRadius: '3px',
                    textAlign: 'center',
                  }}
                  labelStyle={{
                    fontSize: '16px',
                  }}
                  type="button"
                  label="NAVER 로그인"
                  labelColor="#fff"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Dialog
          title="로그인 오류"
          actions={dialogActions}
          open={this.state.errorOpen}
        >
          {this.state.errorMessage}
        </Dialog>
      </div>
    );
  }
}

HomeLogin.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(HomeLogin);

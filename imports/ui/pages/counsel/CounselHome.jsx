import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { pink900, green500 } from 'material-ui/styles/colors';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';

import { browserHistory } from 'react-router';

const pageTitle = '골고루플랜';

class CounselHome extends React.PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
    // console.log('componentWillMount', this.props.user);
  }
  render() {
    return (
      <div className="root counsel-step-content bg-gray">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <h3 className="description">
          STEP01~03까지 진행하시면 전문가에게 현재 식습관 분석과 자세한 영양 상담을 받으실 수 있습니다.
        </h3>
        <Divider />

        <Paper className="counsel-step-button-container" zDepth={0}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h1 className="step-title">
                    <span style={{ fontWeight: 'normal' }}>STEP</span> 01
                  </h1>
                  <div>
                    <FontIcon
                      className="icon-scale inline-block-vertical-middle"
                      style={{ fontSize: '40px' }}
                      color={green500}
                    />
                    <span
                      className="inline-block-vertical-middle"
                      style={{ marginLeft: '20px' }}
                    >
                      신체정보 입력하기
                    </span>
                  </div>
                </td>
                <td>
                  <IconButton
                    className="step-button"
                    style={{ width: '50px', height: '50px', padding: '0px' }}
                    iconStyle={{ fontSize: '50px' }}
                    onTouchTap={() => { browserHistory.push('/counsel/step/01'); }}
                  >
                    <FontIcon
                      className="icon-arrow-right-circle-background"
                      color={pink900}
                    />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>

        <Paper className="counsel-step-button-container" zDepth={0}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h1 className="step-title">
                    <span style={{ fontWeight: 'normal' }}>STEP</span> 02
                  </h1>
                  <div>
                    <FontIcon
                      className="icon-notes inline-block-vertical-middle"
                      style={{ fontSize: '40px' }}
                      color={green500}
                    />
                    <span
                      className="inline-block-vertical-middle"
                      style={{ marginLeft: '20px' }}
                    >
                      식생활진단 테스트
                    </span>
                  </div>
                </td>
                <td>
                  <IconButton
                    className="step-button"
                    style={{ width: '50px', height: '50px', padding: '0px' }}
                    iconStyle={{ fontSize: '50px' }}
                  >
                    <FontIcon
                      className="icon-arrow-right-circle-background"
                      color={pink900}
                    />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>

        <Paper className="counsel-step-button-container" zDepth={0}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h1 className="step-title">
                    <span style={{ fontWeight: 'normal' }}>STEP</span> 03
                  </h1>
                  <div>
                    <FontIcon
                      className="icon-tableware inline-block-vertical-middle"
                      style={{ fontSize: '40px' }}
                      color={green500}
                    />
                    <span
                      className="inline-block-vertical-middle"
                      style={{ marginLeft: '20px' }}
                    >
                      24시간 식사 기록
                    </span>
                  </div>
                </td>
                <td>
                  <IconButton
                    className="step-button"
                    style={{ width: '50px', height: '50px', padding: '0px' }}
                    iconStyle={{ fontSize: '50px' }}
                  >
                    <FontIcon
                      className="icon-arrow-right-circle-background"
                      color={pink900}
                    />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </div>
    );
  }
}

CounselHome.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default connect()(CounselHome);

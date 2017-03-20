import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserEhData } from '../../../api/collections/UserEhData.js';

import React from 'react';
import Title from 'react-title-component';
import StepBar from './components/StepBar.jsx';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { green500 } from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import IconArrowRight from 'material-ui/svg-icons/action/trending-flat';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';

import ehData from './data/eatingHabitQuestions';

const ehGroups = ehData.groups;

const pageTitle = '24시간 식사기록';
class MrdHome extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.state = {
      subscription: {
        userEhdata: Meteor.subscribe('userehdata.private'),
      },
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  componentDidMount() {
    // console.log('componentDidMount');
  }
  componentWillUnmount() {
    this.state.subscription.userEhdata.stop();
  }
  familyEhData(familyId) {
    return UserEhData.findOne({ familyId });
  }
  render() {
    return (
      <div className="root counsel-step-content bg-gray">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <StepBar stepIndex={2} />
        <Paper
          className="counsel-step-button-container"
          style={{ border: '3px solid #4ab046' }}
          zDepth={0}
        >
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top' }}>
                  <img
                    src="/img/counselor.png"
                    alt="counselor"
                    style={{ width: '40px' }}
                  />
                </td>
                <td
                  style={{
                    textAlign: 'left', paddingLeft: '20px', verticalAlign: 'top',
                  }}
                >
                  <h5 style={{ margin: '0px', fontWeight: 'normal' }}>24시간 식사체크</h5>
                  <h4 style={{ margin: '0px' }}>전문 영양사의 컨설팅 받기</h4>
                  <h6 style={{ margin: '0px', fontWeight: 'normal', color: '#999' }}>
                    이 서비스는 전문영양사에게 식전, 식후 사진을 제출하여 식생활에 대한
                    <br />
                    정확하고 전문적인 컨설팅을 받을 수 있는 서비스입니다.
                  </h6>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <IconButton
                    className="step-button"
                    style={{ width: '40px', height: '40px', padding: '0px' }}
                    iconStyle={{ fontSize: '40px' }}
                    onTouchTap={() => {
                      browserHistory.push(`/counsel/mrd/input/${this.familyId}`);
                    }}
                  >
                    <FontIcon
                      className="icon-arrow-right-circle-background"
                      color={green500}
                    />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
        <Paper
          className="counsel-step-button-container"
          style={{ border: '3px solid #4ab046' }}
          zDepth={0}
        >
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top' }}>
                  <img
                    src="/img/report.png"
                    alt="counselor"
                    style={{ width: '40px' }}
                  />
                </td>
                <td
                  style={{
                    textAlign: 'left', paddingLeft: '20px', verticalAlign: 'top',
                  }}
                >
                  <h5 style={{ margin: '0px', fontWeight: 'normal' }}>24시간 식사체크</h5>
                  <h4 style={{ margin: '0px' }}>간편입력으로 리포트 받기</h4>
                  <h6 style={{ margin: '0px', fontWeight: 'normal', color: '#999' }}>
                    이 서비스는 간편 검색 혹은 음식 사진을 통하여 식사기록을 제출하여
                    <br />
                    식생활에 대한 리포트를 빠르게 받을 수 있는 서비스입니다.
                  </h6>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <IconButton
                    className="step-button"
                    style={{ width: '40px', height: '40px', padding: '0px' }}
                    iconStyle={{ fontSize: '40px' }}
                    onTouchTap={() => { browserHistory.push(''); }}
                  >
                    <FontIcon
                      className="icon-arrow-right-circle-background"
                      color={green500}
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

MrdHome.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  question: React.PropTypes.object,
  answer: React.PropTypes.number,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
    question: state.ehdQuestion.selectedQuestion,
    answer: state.ehdQuestion.selectedAnswer,
  };
}

// export default connect(mapStateToProps)(MrdHome);
export default connect(mapStateToProps)(MrdHome);


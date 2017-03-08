import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserEhData } from '../../../api/collections/UserEhData.js';

import React from 'react';
import Title from 'react-title-component';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import { green500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import IconArrowNext from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconArrowPrev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import confirm from '../../../utils/confirm/confirm.js';

// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';

import ehData from './data/eatingHabitQuestions';

const ehGroups = ehData.groups;

// const ehDataUserAnswers = new Array(ehQuestionCount);
// const ehDataUserPoints = new Array(ehQuestionCount);

const pageTitle = '식생활 진단 테스트 결과';
class EhdReportPage extends trackerReact(React.Component) {
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
    // ehDataUserAnswers.fill(0);
    // ehDataUserPoints.fill(0);

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
    console.log('ehGroups', ehGroups);

    const stepIndex = 1;
    const familyEhData = this.familyEhData(this.familyId);
    const familyEhDataPoints = familyEhData ? familyEhData.ehDataUserPoints : null;
    console.log('ehDataUserPoints', familyEhDataPoints);

    return (
      <div className="root counsel-step-content content-center bg-gray">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              STEP01
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              STEP02
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              STEP03
            </StepButton>
          </Step>
        </Stepper>

        <Paper
          className="counsel-step-button-container"
          style={{ border: '3px solid #4ab046' }}
          zDepth={0}
        >
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>
                  <img src="/img/counselor.png" alt="counselor" />
                </td>
                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>
                  지금처럼 건강한 체중을 계속 유지하기 위해 골고루, 제때에, 알맞게 먹는
                  식습관을 갖도록 합니다.
                  <br />
                  신체활동을 활발하게 하는 것도 잊지 마세요!
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>

        {ehGroups.map((group, idx) => {
          const groupCount = group.numbers.length;
          /*
          const groupPoints = familyEhDataPoints ?
            group.numbers.reduce((no) => familyEhDataPoints[no - 1]) :
            0;
          */

          // let groupUserPoints = 0;

          const groupPoints = familyEhDataPoints ?
            group.numbers.map((no) => familyEhDataPoints[no - 1]) : [0];
          // console.log('groupPoints', groupPoints);
          const groupPointsTotal = groupPoints.reduce((a, b) => a + b);
          const groupPointsAverage = groupPointsTotal / groupCount;

          return (
            <div key={idx}>
              <h3>{group.name}</h3>
              <div>{group.numbers}</div>
              <div>{groupPoints}</div>
              <div>{groupPointsTotal}</div>
              <div>{groupPointsAverage.toFixed(1)}</div>
            </div>
          );
        })}

      </div>
    );
  }
}

EhdReportPage.propTypes = {
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

// export default connect(mapStateToProps)(EhdReportPage);
export default connect(mapStateToProps)(EhdReportPage);


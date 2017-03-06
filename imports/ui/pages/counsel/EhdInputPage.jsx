import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';

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
// import Pagination from 'material-ui-pagination';
// import Pagination from '../../components/Pagination.jsx';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
import { setQuestionSelect, setAnswerSelect } from '../../../redux/actions/ehdQuestionSelect.js';

import AnswerCheckButtonGroup from './components/ehd/AnswerCheckButtonGroup.jsx';
import ehData from './data/eatingHabitQuestions';

const ehGroups = ehData.groups;
const ehQuestions = ehData.questions;
const ehQuestionCount = ehQuestions.groupAll.length;

const ehDataUserAnswers = new Array(ehQuestionCount);
const ehDataUserPoints = new Array(ehQuestionCount);
ehDataUserAnswers.fill(0);
ehDataUserPoints.fill(0);

const pageTitle = '식생활 진단 테스트';
class EhdInputPage extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
      },
    };
    this.onQuestionChange = this.onQuestionChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
    dispatch(setQuestionSelect(ehQuestions.groupAll[0]));
  }
  componentDidMount() {
    // console.log('componentDidMount');
  }
  componentWillUnmount() {
    this.state.subscription.userFamilies.stop();
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  onQuestionChange(value) {
    const { dispatch } = this.props;
    dispatch(setQuestionSelect(ehQuestions.groupAll[value - 1]));
    dispatch(setAnswerSelect(ehDataUserAnswers[value - 1]));
  }
  onAnswerChange(value) {
    const { dispatch, question } = this.props;
    dispatch(setAnswerSelect(value));
    ehDataUserAnswers[question.no - 1] = value;
  }
  render() {
    const stepIndex = 1;
    const { question } = this.props;
    let questionNo = 1;
    let questionNumber = '';
    let questionString = '';
    if (question) {
      questionNo = question.no;
      questionNumber = `Q${question.no}`;
      questionString = question.question;
    }
    // console.log('question', question);
    // console.log('ehDataUserAnswers', ehDataUserAnswers);
    return (
      <div className="root content-center">
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
          <table className="ehdQuestions">
            <tbody>
              <tr>
                <td>
                  <h1
                    style={{ color: green500 }}
                  >
                    {questionNumber}
                    <span style={{ fontSize: '14px' }}>
                      / {ehQuestionCount}
                    </span>
                  </h1>
                </td>
                <td>{questionString}</td>
              </tr>
            </tbody>
          </table>
        </Paper>
        <div><h6>{ehDataUserAnswers[questionNo - 1]}</h6></div>
        <AnswerCheckButtonGroup
          onChange={no => { this.onAnswerChange(no); }}
        />
        <div className="ehd-question-navi">
          {questionNo > 1 ?
            <RaisedButton
              className="ehd-question-navi-button"
              label="이전문항"
              labelPosition="after"
              icon={<IconArrowPrev />}
              onTouchTap={() => { this.onQuestionChange(questionNo - 1); }}
              primary
              style={{ float: 'left' }}
            />
          : null}
          {questionNo < ehQuestionCount ?
            <RaisedButton
              className="ehd-question-navi-button"
              label="다음문항"
              labelPosition="before"
              icon={<IconArrowNext />}
              onTouchTap={() => { this.onQuestionChange(questionNo + 1); }}
              primary
              style={{ float: 'right' }}
            />
          : null}
        </div>
        {/*
          <Pagination
            className="ehd-paging"
            total={9}
            current={this.state.questionNo}
            display={9}
            onChange={no => this.onQuestionChange(no)}
          />
        */}
      </div>
    );
  }
}

EhdInputPage.propTypes = {
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

// export default connect(mapStateToProps)(EhdInputPage);
export default connect(mapStateToProps)(EhdInputPage);


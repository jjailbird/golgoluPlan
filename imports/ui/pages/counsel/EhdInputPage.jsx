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

// import Pagination from 'material-ui-pagination';
import Pagination from '../../components/Pagination.jsx';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';

import AnswerCheckButtonGroup from './components/ehd/AnswerCheckButtonGroup.jsx';
import ehData from './data/eatingHabitQuestions';

const ehGroups = ehData.groups;
const ehQuestions = ehData.questions;

const testEhData = [];

const pageTitle = '식생활 진단 테스트';
class EhdInputPage extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.state = {
      question_no: 1,
      question_group: 1,
      question: ehQuestions.group01[0].question,
      question_numbering: 'Q1',
      answer_number: -1,
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
      },
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  componentWillMount() {
    // console.log('componentWillMount: load ehd_questions');
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  componentDidMount() {
    // console.log('componentDidMount');
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.state.subscription.userFamilies.stop();
  }
  // onBmiPubDateChange(e, idx, value) {
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  onPageChange(value) {
    this.setState({
      question_no: value,
      question_numbering: `Q${value}`,
      question: ehQuestions.group01[value - 1].question,
      answer_number: -1,
    });
  }
  render() {
    const stepIndex = 1;
    // const family = this.userFamily(this.familyId);
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
                  <h1 style={{ color: green500 }}>{this.state.question_numbering}</h1>
                </td>
                <td>{this.state.question}</td>
              </tr>
            </tbody>
          </table>
        </Paper>
        <AnswerCheckButtonGroup selectIndex={this.state.answer_number} />
        <Pagination
          className="ehd-paging"
          total={9}
          current={this.state.question_no}
          display={9}
          onChange={no => this.onPageChange(no)}
        />
      </div>
    );
  }
}

EhdInputPage.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}

// export default connect(mapStateToProps)(EhdInputPage);
export default connect(mapStateToProps)(EhdInputPage);


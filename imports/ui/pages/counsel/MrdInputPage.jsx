import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';

import React from 'react';
import Title from 'react-title-component';
import { green500 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import StepBar from './components/StepBar.jsx';
import MealRecordPanel from './components/MealRecordPanel.jsx';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';


const pageTitle = '24시간 식사기록(영양사)';
class EhdInputPage extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.userId = this.props.user ? this.props.user._id : null;
    // console.log('this.props.user', this.props.user);
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
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
    this.state.subscription.userFamilies.stop();
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  render() {
    return (
      <div className="root counsel-step-content content-center bg-gray">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <StepBar stepIndex={2} />
        <table>
          <tbody>
            <tr>
              <td>
                <img
                  src="/img/counselor.png"
                  alt="counselor"
                  style={{ verticalAlign: 'middle', width: '50px' }}
                />
              </td>
              <td>
                <h4 className="description content-left">
                  24시간동안 먹은 식사의 식전사진과 식후사진을 기록해주세요.<br />
                  전문 영양사가 기록된 사진을 통하여 영양상담과 처방을 드립니다.
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
        <MealRecordPanel title="아침" key="breakFast" />
        <MealRecordPanel title="간식" key="snack_1" />
        <MealRecordPanel title="점심" key="lunch" />
        <MealRecordPanel title="간식" key="snack_2" />
        <MealRecordPanel title="저녁" key="dinner" />
        <MealRecordPanel title="간식" key="snack_3" />
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


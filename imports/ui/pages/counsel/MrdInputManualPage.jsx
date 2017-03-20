import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';

import React from 'react';
import Title from 'react-title-component';
import StepBar from './components/StepBar.jsx';
import MealRecordManualPanel from './components/MealRecordManualPanel.jsx';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
import { browserHistory } from 'react-router';

const pageTitle = '24시간 식사기록(간편입력)';
class MrdInputManualPage extends trackerReact(React.Component) {
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
    const mealRecords = [
      { title: '아침', mealType: 'breakFast' },
      { title: '간식', mealType: 'snack_1' },
      { title: '점심', mealType: 'lunch' },
      { title: '간식', mealType: 'snack_2' },
      { title: '저녁', mealType: 'dinner' },
      { title: '간식', mealType: 'snack_3' },
    ];
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
                  간편 검색 혹은 음식 사진을 통하여 식사기록을 제출하여<br />
                  식생활에 대한 리포트를 빠르게 받을 수 있는 서비스입니다.
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
        {mealRecords.map((meal, idx) => (
          <MealRecordManualPanel
            key={idx}
            title={meal.title}
            mealType={meal.mealType}
            userId={this.userId}
            familyId={this.familyId}
          />
        ))}
      </div>
    );
  }
}

MrdInputManualPage.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}

// export default connect(mapStateToProps)(MrdInputManualPage);
export default connect(mapStateToProps)(MrdInputManualPage);


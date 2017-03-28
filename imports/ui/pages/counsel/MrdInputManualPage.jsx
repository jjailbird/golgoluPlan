import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';
import { FoodOpenData } from '../../../api/collections/FoodOpenData.js';
import { MediaFiles } from '../../../api/collections/MediaFiles.js';

import React from 'react';
import Title from 'react-title-component';
import StepBar from './components/StepBar.jsx';
import MealRecordManualPanel from './components/MealRecordManualPanel.jsx';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
import Dialog from 'material-ui/Dialog';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import FoodNameAuto from '../../components/FoodNameAuto.jsx';
import FoodList from '../../components/FoodList.jsx';

const pageTitle = '24시간 식사기록(간편입력)';
class MrdInputManualPage extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.userId = this.props.user ? this.props.user._id : null;
    // console.log('this.props.user', this.props.user);
    this.state = {
      openFoodDialog: false,
      foodOpenData: [],
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
        foodOpenData: Meteor.subscribe('food_open_data.all'),
        mediaFiles: Meteor.subscribe('MediaFiles.all'),
      },
    };

    this.openFoodDialog = this.openFoodDialog.bind(this);
    // this.foodOpenDataByName = this.foodOpenDataByName.bind(this);
    this.onSearchFoodName = this.onSearchFoodName.bind(this);
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
    this.state.subscription.foodOpenData.stop();
    this.state.subscription.mediaFiles.stop();
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  openFoodDialog() {
    this.setState({
      openFoodDialog: true,
    });
  }
  onSearchFoodName() {
    const searchText = document.getElementById('searchText').value;
    // searchText = searchText.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'); // query.search;
    const find = (searchText === '') ? {} : { DESC_KOR: { $regex: `${searchText}` } };
    const foodList = FoodOpenData.find(find, {
      // limit: parseInt(query.limit),
      // skip: parseInt(query.skip),
      sort: { NUM: 1 },
    }).fetch();
    this.setState({
      foodOpenData: foodList,
    });
  }
  handleClose = () => {
    this.setState({ openFoodDialog: false });
  };
  onTextClear() {
    this.setState({ searchText: '' });
    // this.refs.searchText2.value = '';
    // document.getElementById('searchText').value = '';
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
    const actions = [
      <FlatButton
        label="취소"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="검색"
        primary
        keyboardFocused
        onTouchTap={this.onSearchFoodName}
      />,
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
            onAddButtonClick={this.openFoodDialog}
          />
        ))}
        <Dialog
          title="Search Foods"
          id="foodSearchDialog"
          ref="foodSearchDialog"
          modal={false}
          open={this.state.openFoodDialog}
          onRequestClose={() => { this.setState({ openFoodDialog: false }); }}
          titleStyle={{ padding: '10px 24px 10px' }}
          contentStyle={{ width: '96%' }}
          actions={actions}
        >
          <div style={{ textAlign: 'center' }}>
            <FoodNameAuto
              ref="searchText"
              id="searchText"
              floatingLabelText="음식 이름"
            />
            <Chip
              style={{ display: 'inline' }}
              onTouchTap={this.onSearchFoodName}
            >
              <Avatar icon={<SearchIcon />} />
              {this.state.foodOpenData.length.toLocaleString()}
            </Chip>
            <FoodList fooddata={this.state.foodOpenData} />
          </div>
        </Dialog>
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


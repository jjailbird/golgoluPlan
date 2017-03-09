import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';
import { MediaFiles } from '../../../api/collections/MediaFiles.js';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
import { browserHistory } from 'react-router';

import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';
import Paper from 'material-ui/Paper';

import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAdd from 'material-ui/svg-icons/content/add';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { pink900, green500 } from 'material-ui/styles/colors';

import { getBmiPoint, getBmiDescription } from './functions/bmiFunctions.js';

const pageTitle = '골고루플랜';

class CounselHome extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
        mediaFiles: Meteor.subscribe('MediaFiles.private'),
      },
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
    // console.log('componentWillMount', this.props.user);
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.state.subscription.userFamilies.stop();
    this.state.subscription.mediaFiles.stop();
  }
  userFamilies(userId) {
    return UserFamily.find({ userId }).fetch();
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  mediaFile(familyId) {
    return MediaFiles.findOne({ 'meta.familyId': familyId });
  }
  render() {
    const { user } = this.props;
    let families = [];
    let listTitle = '';
    if (user) {
      families = this.userFamilies(user._id);
      listTitle = `${user.username}님 ${families.length}명의 자녀가 등록되었습니다.`;
      console.log('families', families);
    }

    return (
      <div className="root counsel-step-content content-left">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <Paper className="counsel-step-button-container center" zDepth={0}>
          <div className="center">
            <Avatar
              className="profile-avata"
              size={70}
              src="/img/person.blank.svg"
            />
          </div>
        </Paper>
        <Divider />

        <Paper className="counsel-step-button-container" zDepth={0}>
          <h3 style={{ fontWeight: 'normal' }}>{listTitle}</h3>
          {families.map((family, idx) => {
            const avatarUrl = MediaFiles.findOne({ 'meta.familyId': family._id }) ?
              MediaFiles.findOne({ 'meta.familyId': family._id }).link() :
              '/img/person.blank.svg';
            const gotoUrl = `/counsel/steps/${family._id}`;
            const lastBmi = family.bmiData[family.bmiData.length - 1];
            const bmiPoint = lastBmi ? getBmiPoint(lastBmi.weight, lastBmi.height) : 0;
            const bmiDesc = lastBmi ? getBmiDescription(bmiPoint) : '';
            // const bmiPoint = getBmiPoint()
            return (
              <div
                key={idx}
                className="center grid"
                style={{ width: 100 }}
              >
                <Avatar
                  key={`avatar_${families._id}`}
                  className="profile-avata"
                  size={70}
                  src={avatarUrl}
                  style={{ cursor: 'pointer' }}
                  onTouchTap={() => { browserHistory.push(gotoUrl); }}
                />
                <h4 style={{ margin: 0 }}>{family.name}</h4>
                <div
                  className="bmi-desc-badge"
                  style={{ padding: '5px' }}
                >
                  {bmiDesc}
                </div>
              </div>
            );
          })}
          <div className="center grid">
            <FloatingActionButton
              onTouchTap={() => { browserHistory.push('/counsel/bmi/input'); }}
            >
              <IconAdd />
            </FloatingActionButton>
          </div>
        </Paper>
      </div>
    );
  }
}

CounselHome.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}

export default connect(mapStateToProps)(CounselHome);

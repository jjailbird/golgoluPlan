import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../../api/collections/UserFamily.js';
import { MediaFiles } from '../../../../api/collections/MediaFiles.js';
import { connect } from 'react-redux';
import moment from 'moment';

import React from 'react';
import Paper from 'material-ui/Paper';

import FamilyProfile from './FamilyProfile.jsx';

class FamilyList extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
        mediaFiles: Meteor.subscribe('MediaFiles.private'),
      },
    };
  }
  componentWillUnmount() {
    this.state.subscription.userFamilies.stop();
    this.state.subscription.mediaFiles.stop();
  }
  userFamilies(userId) {
    return UserFamily.find({ userId }).fetch();
  }
  mediaFile(familyId) {
    return MediaFiles.findOne({ 'meta.familyId': familyId });
  }
  render() {
    const { user } = this.props;
    const userFamilies = user ?
      this.userFamilies(this.props.user._id) :
      null;

    let response = <div>null</div>;
    if (userFamilies) {
      // console.log('userFamilies', userFamilies);
      response = (
        <Paper zDepth={0}>
          {userFamilies.map((family, idx) => {
            const profile = {};
              // console.log('family', family);
            profile.name = family.name;
            profile.sex = (family.sex === 'male') ? '남자' : '여자';
            profile.sexIconClass = `icon-${family.sex}`;
            profile.birthDate = moment(family.birthDate).format('YYYY-MM-DD');
            profile.age = Math.round(moment().diff(profile.birthDate, 'years', true));
            profile.bmiData = family.bmiData;
            const mediaFile = this.mediaFile(family._id);
            if (mediaFile) {
              profile.image = MediaFiles.findOne({ 'meta.familyId': family._id }).link();
            } else {
              profile.image = '/img/person.blank.png';
            }
            return (
              <FamilyProfile key={idx} profile={profile} />
            );
          })}
        </Paper>
      );
    }
    return response;
  }
}
function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}
export default connect(mapStateToProps)(FamilyList);

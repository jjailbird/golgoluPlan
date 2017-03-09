import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';
import { MediaFiles } from '../../../api/collections/MediaFiles.js';
import { UserEhData } from '../../../api/collections/UserEhData.js';

import moment from 'moment';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';

import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { pink900, green500 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

import StepDisplay from './components/StepDisplay.jsx';
import StepDisplayDone from './components/StepDisplayDone.jsx';

const pageTitle = '골고루플랜';

class CounselSteps extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.bmiPubDate = this.props.params.pubDate;
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
        mediaFiles: Meteor.subscribe('MediaFiles.private'),
        userEhdata: Meteor.subscribe('userehdata.private'),
      },
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.state.subscription.userFamilies.stop();
    this.state.subscription.mediaFiles.stop();
    this.state.subscription.userEhdata.stop();
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  mediaFile(familyId) {
    return MediaFiles.findOne({ 'meta.familyId': familyId });
  }
  familyEhData(familyId) {
    return UserEhData.findOne({ familyId });
  }
  render() {
    const profile = {
      name: '',
      sex: '',
      age: 0,
      bmiPubDate: '',
      weight: 0,
      height: 0,
      image: '/img/person.blank.png',
    };
    const family = this.userFamily(this.familyId);
    const familyEhdata = this.familyEhData(this.familyId);
    // const media = this.mediaFile(this.familyId);
    if (family) {
      profile.name = family.name;
      profile.sex = family.sex;
      profile.age = Math.round(moment().diff(family.birthDate, 'years', true));
      const media = this.mediaFile(this.familyId);
      if (media) {
        profile.image = MediaFiles.findOne({ 'meta.familyId': this.familyId }).link();
      }
      if (family.bmiData) {
        const popBmi = this.bmiPubDate ?
          family.bmiData.find((bmi) => bmi.publishedAt === this.bmiPubDate) :
          family.bmiData[family.bmiData.length - 1];
        profile.bmiPubDate = popBmi.publishedAt;
        profile.weight = popBmi.weight;
        profile.height = popBmi.height;
      }
    }

    return (
      <div className="root counsel-step-content content-left bg-gray">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <h3 className="description">
          STEP01~03까지 진행하시면 전문가에게 현재 식습관 분석과 자세한 영양 상담을 받으실 수 있습니다.
        </h3>
        <Divider />
        {family ?
          <StepDisplayDone
            step="01"
            linkUrl={`/counsel/bmi/report/${family._id}/${profile.bmiPubDate}`}
            profile={profile}
          />
          :
          <StepDisplay
            step="01"
            description="신체정보 입력하기"
            icon="icon-scale"
            linkUrl="/counsel/step/01"
          />
        }
        {familyEhdata ?
          <StepDisplayDone
            step="02"
            description="식생활 진단 테스트"
            icon="icon-notes"
            linkUrl={`/counsel/ehd/report/${this.familyId}`}
          />
          :
          <StepDisplay
            step="02"
            description="식생활 진단 테스트"
            icon="icon-notes"
            linkUrl={`/counsel/step/02/${this.familyId}`}
          />
        }
        <StepDisplay
          step="03"
          description="24시간 식사 기록"
          icon="icon-tableware"
          linkUrl={`/counsel/step/03/${this.familyId}`}
        />
      </div>
    );
  }
}

CounselSteps.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}
export default connect(mapStateToProps)(CounselSteps);

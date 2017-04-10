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
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import IconClock from 'material-ui/svg-icons/av/av-timer';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { pink900, amber500, green500 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

import BmiReportBox from './components/BmiReportBox.jsx';
import EhdReportBox from './components/EhdReportBox.jsx';
import MrdReportBox from './components/MrdReportBox.jsx';
import ehData from './data/eatingHabitQuestions';

const ehGroups = ehData.groups;
const pageTitle = '식습관 분석결과';

class CounselAnalysis extends trackerReact(React.Component) {
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
    const familyEhDataPoints = familyEhdata ? familyEhdata.ehDataUserPoints : null;
    let groupAverageTotal = 0;
    let ehAverage = 0;
    let ehAveragePercent = 0;
    const pointMax = 5;
    if (familyEhDataPoints) {
      for (let i = 0; i < ehGroups.length; i++) {
        const groupCount = ehGroups[i].numbers.length;
        const groupPoints = ehGroups[i].numbers.map((no) => familyEhDataPoints[no - 1]);
        const groupPointsTotal = groupPoints.reduce((a, b) => a + b);
        const groupPointsAverage = groupPointsTotal / groupCount;
        groupAverageTotal += groupPointsAverage;
        // const pointPercent = (groupPointsAverage * 100) / pointMax;
      }
      ehAverage = groupAverageTotal / ehGroups.length;
      ehAveragePercent = (ehAverage * 100) / pointMax;
    }

    if (family) {
      profile.name = family.name;
      // profile.sex = family.sex;
      profile.sex = (family.sex === 'male') ? '남자' : '여자';
      profile.sexIconClass = `icon-${family.sex}`;
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
        <h4 className="description">
          <b>{profile.name}</b>님의 식습관 분석 결과입니다.<br />
          이제부터 영양사님과 함께 건강한 삶을 맞춤상담 골고루플랜을 시작하세요~
        </h4>
        <table className="family-profile center">
          <tbody>
            <tr>
              <td>
                <Avatar className="profile-avata" size={70} src={profile.image} />
              </td>
              <td>
                <h4 style={{ margin: '0px 0px 10px 0px' }}>
                  {profile.name} /
                  <FontIcon
                    className={profile.sexIconClass}
                    style={{ fontSize: '20px' }}
                    color={green500}
                  />
                  {profile.sex} / {`${profile.age} 세`}
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
        <Divider />
        {family ?
          <BmiReportBox
            step="01"
            linkUrl={`/counsel/bmi/report/${family._id}/${profile.bmiPubDate}`}
            profile={profile}
          />
          :
          <div></div>
        }
        {familyEhdata ?
          <EhdReportBox
            averagePercent={ehAveragePercent}
          />
          :
          <div></div>
        }
        <MrdReportBox
          familyId={this.familyId}
        />
        <Paper zDepth={0}>
          <RaisedButton
            label="2주간의 골고루플랜 시작하기"
            labelPosition="after"
            icon={<IconClock />}
            onTouchTap={() => { browserHistory.push(`/counsel/steps/${this.familyId}`); }}
            backgroundColor={pink900}
            labelColor="#FFF"
            fullWidth
          />
        </Paper>
      </div>
    );
  }
}

CounselAnalysis.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}
export default connect(mapStateToProps)(CounselAnalysis);

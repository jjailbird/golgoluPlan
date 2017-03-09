import { Meteor } from 'meteor/meteor';
import trackerReact from 'meteor/ultimatejs:tracker-react';
import { UserFamily } from '../../../api/collections/UserFamily.js';
import { MediaFiles } from '../../../api/collections/MediaFiles.js';

import React from 'react';
import Title from 'react-title-component';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import IconArrowRight from 'material-ui/svg-icons/action/trending-flat';
import { green500 } from 'material-ui/styles/colors';

import moment from 'moment';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
import { browserHistory } from 'react-router';

import BmiReport from './components/BmiReport.jsx';

// import FamilyProfile from './components/FamilyProfile.jsx';

const pageTitle = '성장리포트';
class BmiReportPage extends trackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.familyId = this.props.params.familyId;
    this.bmiPubDate = this.props.params.pubDate;
    this.state = {
      subscription: {
        userFamilies: Meteor.subscribe('userfamilies.private'),
        mediaFiles: Meteor.subscribe('MediaFiles.private'),
      },
      bmiPubDate: this.bmiPubDate,
      bmiWeight: null,
      bmiHeight: null,
    };
    this.onBmiPubDateChange = this.onBmiPubDateChange.bind(this);
  }
  componentWillMount() {
    // console.log('componentWillMount');

    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  componentDidMount() {
    // console.log('componentDidMount');
  }
  componentWillUnmount() {
    // console.log('componentWillUnmount');
    this.state.subscription.userFamilies.stop();
    this.state.subscription.mediaFiles.stop();
  }
  // onBmiPubDateChange(e, idx, value) {
  onBmiPubDateChange(e) {
    const option = e.target.options[e.target.selectedIndex];
    this.setState({
      bmiPubDate: option.value,
      bmiHeight: option.dataset.height,
      bmiWeight: option.dataset.weight,
    });
  }
  userFamily(familyId) {
    return UserFamily.findOne({ _id: familyId });
  }
  mediaFile(familyId) {
    return MediaFiles.findOne({ 'meta.familyId': familyId });
  }
  render() {
    const stepIndex = 0;
    const family = this.userFamily(this.familyId);
    const mediaFile = this.mediaFile(this.familyId);
    this.bmiPubDate = this.state.bmiPubDate;
    // console.log('render family', family);
    const profile = {
      name: 'name',
      birthDate: 'YYYY-MM-DD',
      age: 0,
      sex: 'Unknown',
      sexIconClass: 'unkonwn',
      image: '/img/person.blank.svg',
      bmiData: [],
      bmiSelect: { height: 0, weight: 0 },
    };

    let popBmi = { height: 0, weight: 0, publishedAt: this.publishedAt };
    if (family) {
      // console.log('family', family);
      profile.name = family.name;
      profile.sex = (family.sex === 'male') ? '남자' : '여자';
      profile.sexIconClass = `icon-${family.sex}`;
      profile.birthDate = moment(family.birthDate).format('YYYY-MM-DD');
      profile.age = Math.round(moment().diff(profile.birthDate, 'years', true));
      profile.bmiData = family.bmiData;

      if (mediaFile) {
        profile.image = MediaFiles.findOne({ 'meta.familyId': this.familyId }).link();
      }
      popBmi = this.state.bmiHeight ?
              { height: this.state.bmiHeight, weight: this.state.bmiWeight } :
              family.bmiData.find((bmi) => bmi.publishedAt === this.bmiPubDate);
      if (!popBmi) {
        popBmi = family.bmiData[family.bmiData.length - 1];
        this.bmiPubDate = popBmi.publishedAt;
      }
    }

    return (
      <div className="root counsel-step-content content-center">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <Stepper linear={false} activeStep={stepIndex}>
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
        <Paper zDepth={0}>
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
                  <select
                    className="select-underline-mini label-register"
                    name="selectBmiPubDate"
                    value={this.bmiPubDate}
                    onChange={this.onBmiPubDateChange}
                  >
                    {profile.bmiData.map((bmi, idx) => (
                      <option
                        key={idx}
                        value={bmi.publishedAt}
                        data-height={bmi.height}
                        data-weight={bmi.weight}
                      >
                        기록일자 {bmi.publishedAt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <FloatingActionButton className="btn-input-bmi">
                    <IconAdd />
                  </FloatingActionButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Paper>
        <BmiReport
          name={profile.name}
          sex={profile.sex}
          weight={popBmi.weight}
          height={popBmi.height}
          publishedAt={popBmi.publishedAt}
          birthDate={profile.birthDate}
        />

        <Paper zDepth={0}>
          <RaisedButton
            label="STEP02 다음단계"
            labelPosition="before"
            icon={<IconArrowRight />}
            onTouchTap={() => { browserHistory.push(`/counsel/steps/${this.familyId}`); }}
            primary
            fullWidth
          />
        </Paper>

      </div>
    );
  }
}

BmiReportPage.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}

// export default connect(mapStateToProps)(BmiReportPage);
export default connect(mapStateToProps)(BmiReportPage);


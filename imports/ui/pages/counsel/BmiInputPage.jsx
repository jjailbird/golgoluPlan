import { Meteor } from 'meteor/meteor';
import React from 'react';
import Title from 'react-title-component';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import { grey300, green500 } from 'material-ui/styles/colors';

import Formsy from 'formsy-react';
// import FormsyText from 'formsy-material-ui/lib/FormsyText';
import { FormsyText, FormsyDate, FormsyRadio, FormsyRadioGroup }
  from 'formsy-material-ui/lib';
import areIntlLocalesSupported from 'intl-locales-supported';
import moment from 'moment';

import { connect } from 'react-redux';
import { setPageTitle } from '../../../redux/actions/setPageTitle.js';
// import { UserFamily } from '../../../api/collections/UserFamily.js';
import { MediaFiles } from '../../../api/collections/MediaFiles.js';
import { browserHistory } from 'react-router';

const pageTitle = '신체정보입력';

let DateTimeFormat;
/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['ko-KR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  import IntlPolyfill from 'intl';
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  import 'intl/locale-data/jsonp/ko-KR';
}

class BmiInputPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      errorMessage: '',
      errorOpen: false,
      inProgress: false,
      imagePreviewUrl: '/img/person.blank.svg',
    };
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  onSubmit(data) {
    const indexDate = moment().format('YYYY-MM-DD');
    const userData = {};
    userData.userId = this.props.user._id;
    userData.name = data.name;
    userData.sex = data.sex;
    userData.birthDate = data.birthDate;
    userData.bmiData = [{
      publishedAt: indexDate,
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
    }];
    userData.publishedAt = indexDate;

    Meteor.call('userfamily.insertNew', userData, (err, res) => {
      if (err) {
        console.log('err!', err);
      } else {
        console.log('result!', res);
        if (this.inputFile.value) {
          const fileInfo = {};
          fileInfo.inputFile = this.inputFile;
          fileInfo.userId = this.props.user._id;
          fileInfo.familyId = res.id;
          fileInfo.caption = data.name;
          fileInfo.category = 'family_profile';
          fileInfo.indexDate = indexDate;
          this.uploadIt(fileInfo);
        } else {
          browserHistory.push(`/counsel/bmi/report/${res.id}/${indexDate}`);
        }
      }
    });
  }
  onTextChange() {
    this.setState({ errorOpen: false });
  }
  onImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    const fileExtension = file && file.name.split('.').pop();

    // console.log(file);
    let confirm = false;
    let errMessage = '';

    if (!file) {
      confirm = false;
      errMessage = '선택한 파일이 없습니다.';
    } else {
      confirm = /png|jpg|jpeg/i.test(fileExtension);
      errMessage = '허용된 이미지 파일 타입이 아닙니다.';
    }

    if (confirm) {
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.inputFile.value = '';
      this.setState({
        imagePreviewUrl: '/img/image.blank.svg',
      });
      alert(errMessage);
    }
  }
  openFileDialog() {
    document.getElementById('inputFile').click();
    // this.refs.fileinput.clck();
  }
  uploadIt(fileInfo) {
    if (fileInfo.inputFile && fileInfo.inputFile.files[0]) {
      const file = fileInfo.inputFile.files[0];
      if (file) {
        const uploadInstance = MediaFiles.insert({
          file,
          meta: {
            // locator: this.props.fileLocator,
            userId: fileInfo.userId, // Optional, used to check on server for file tampering
            familyId: fileInfo.familyId,
            caption: fileInfo.caption,
            category: fileInfo.category,
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          transport: 'http',
          allowWebWorkers: true, // If you see issues with uploads, change this to false
        }, false);

        this.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true, // Show the progress bar now
        });

        uploadInstance.on('start', () => {
          // console.log('Starting');
        });

        uploadInstance.on('end', (error, fileObj) => {
          // console.log('On end File Object: ', fileObj);
          browserHistory.push(`/counsel/bmi/report/${fileInfo.familyId}/${fileInfo.indexDate}`);
        });

        uploadInstance.on('uploaded', (error, fileObj) => {
          // console.log('uploaded!');
          this.inputFile.value = '';
          // this.inputFileCaption.setState({ value: '' });
          // this.inputFileDesc.setState({ value: '' });
          // const imgPreviewer = document.getElementById('imgPreviewer');
          // imgPreviewer.src = '/img/image.blank.svg';
          this.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });
        });

        uploadInstance.on('error', (error, fileObj) => {
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', (progress, fileObj) => {
          this.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  render() {
    const stepIndex = 0;
    return (
      <div className="root">
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
        <Badge
          badgeContent={
            <IconButton
              onTouchTap={this.openFileDialog}
            >
              <FontIcon
                className="icon-camera-1"
                style={{ fontSize: '26px' }}
              />
            </IconButton>
          }
          badgeStyle={{ fontSize: 20, right: 16, top: 80 }}
        >
          <Avatar size={100} src={this.state.imagePreviewUrl} />
        </Badge>
        <input
          type="file"
          id="inputFile"
          // ref="fileinput"
          ref={(input) => this.inputFile = input}
          disabled={this.state.inProgress}
          // onChange={this.uploadIt}
          onChange={this.onImageChange}
          style={{ display: 'none' }}
        />
        {this.state.inProgress ?
          <LinearProgress mode="determinate" value={this.state.progress} />
          :
          null
        }
        <Paper className="counsel-step-button-container" zDepth={0}>
          <Formsy.Form
            style={{ textAlign: 'center' }}
            onValid={this.enableSubmitButton}
            onSubmit={this.onSubmit}
          >
            <FormsyText
              name="name"
              ref={(input) => this.inputName = input}
              floatingLabelText="이름"
              onChange={this.onTextChange}
              required
            />
            <FormsyRadioGroup
              // RadioButtonGroup
              name="sex"
              ref={(input) => this.inputSex = input}
              style={{ marginTop: '34px' }}
              required
              validationError="This is a required field."
            >
              <FormsyRadio
                // RadioButton
                value="male"
                label="남자"
                checkedIcon={
                  <FontIcon
                    className="icon-male"
                    style={{ fontSize: '20px' }}
                    color={green500}
                  />
                }
                uncheckedIcon={
                  <FontIcon
                    className="icon-male"
                    style={{ fontSize: '20px' }}
                    color={grey300}
                  />
                }
                style={{ display: 'inline-block', width: '100px' }}
              />
              <FormsyRadio
                // RadioButton
                value="female"
                label="여자"
                checkedIcon={
                  <FontIcon
                    className="icon-female"
                    style={{ fontSize: '20px' }}
                    color={green500}
                  />
                }
                uncheckedIcon={
                  <FontIcon
                    className="icon-female"
                    style={{ fontSize: '20px' }}
                    color={grey300}
                  />
                }
                style={{ display: 'inline-block', width: '100px' }}
              />
            </FormsyRadioGroup>
            <FormsyDate
              // DatePicker
              name="birthDate"
              ref={(input) => this.inputBirthDate = input}
              floatingLabelText="생년월일"
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="취소"
              locale="ko-KR"
            />
            <div>
              <FormsyText
                name="height"
                ref={(input) => this.inputHeight = input}
                className="text-unit-cm"
                inputStyle={{ textAlign: 'right', paddingRight: '30px' }}
                floatingLabelText="신장"
                hintText="예) 110.2"
                onChange={this.onTextChange}
                required
                validations="isNumeric"
                validationError="숫자만 입력 가능합니다."
              />
            </div>
            <div>
              <FormsyText
                name="weight"
                ref={(input) => this.inputWeight = input}
                className="text-unit-kg"
                inputStyle={{ textAlign: 'right', paddingRight: '30px' }}
                floatingLabelText="몸무게"
                hintText="예) 20.5"
                onChange={this.onTextChange}
                required
                validations="isNumeric"
                validationError="숫자만 입력 가능합니다."
              />
            </div>
            <div>
              <RaisedButton
                style={{ marginTop: '40px', width: '270px' }}
                // labelStyle={styles.label}
                type="submit"
                label="등록"
                secondary
                icon={<FontIcon className="icon-note-n-pencil-2 inline-block-vertical-middle" />}
                disabled={!this.state.canSubmit}
              />
            </div>
          </Formsy.Form>
        </Paper>
      </div>
    );
  }
}

BmiInputPage.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authenticate.user,
  };
}

export default connect(mapStateToProps)(BmiInputPage);

/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import trackerReact from 'meteor/ultimatejs:tracker-react';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconInput from 'material-ui/svg-icons/action/input';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import FormsySelect from 'formsy-material-ui/lib/FormsySelect';

import randomString from '../../utils/randomString.js';
import ToggleDisplay from 'react-toggle-display';
import { MediaFiles } from '../../api/collections/MediaFiles.js';

// const pid = shortid.generate();

class FileUploadImgBox extends trackerReact(Component) {
// class FileUploadImgBox extends Component {
  constructor(props) {
    super(props);
    this.compId = randomString(7);
    this.imageId = `imageViewer${this.compId}`;
    this.inputFileId = `inputFile${this.compId}`;

    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false,
      subscription: {
        files: Meteor.subscribe('MediaFiles.all'),
      },
      lightboxIsOpen: false,
      currentImage: 0,
      fileName: '',
      imagePreviewUrl: '/img/image.blank.svg',
    };
    this.openFileDialog = this.openFileDialog.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }
  componentWillMount() {
    const { category, mealType, mealTime, userId, familyId } = this.props;
    this.fileInfo = {
      category, mealType, mealTime, userId, familyId,
    };
  }
  componentWillUnmount() {
    this.state.subscription.files.stop();
  }
  openFileDialog() {
    document.getElementById(this.inputFileId).click();
  }
  onImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const fileInput = e.target;
    const file = fileInput.files[0];
    const fileExtension = file && file.name.split('.').pop();

    // console.log(file);
    let confirm = false;
    let errMessage = '';

    if (!file) {
      confirm = false;
      errMessage = '선택한 파일이 없습니다.';
    } else if (this.props.fileType === 'video') {
      confirm = /mp4/i.test(fileExtension);
      errMessage = '허용된 동영상 파일 타입이 아닙니다.';
    } else {
      confirm = /png|jpg|jpeg/i.test(fileExtension);
      errMessage = '허용된 이미지 파일 타입이 아닙니다.';
    }

    if (confirm) {
      if (this.props.fileType === 'video') {
        this.setState({
          fileName: file.name ? file.name.replace(`.${fileExtension}`, '') : '',
          imagePreviewUrl: '/img/video.blank.svg',
        });
      } else {
        reader.onloadend = () => {
          this.setState({
            fileName: file.name ? file.name.replace(`.${fileExtension}`, '') : '',
            imagePreviewUrl: reader.result,
          });
          if (this.fileInfo) {
            // console.log('this.fileInfo', this.fileInfo);
            this.uploadIt(this.fileInfo, fileInput);
          } else {
            alert('파일정보가 없습니다. 관리자에게 문의하십시오.');
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.inputFile.value = '';
      this.setState({
        fileName: '',
        imagePreviewUrl: '/img/image.blank.svg',
      });
      alert(errMessage);
    }
  }
  uploadIt(fileInfo, fileInput) {
    if (fileInput && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file) {
        const uploadInstance = MediaFiles.insert({
          file,
          meta: this.fileInfo,
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
        });

        uploadInstance.on('uploaded', (error, fileObj) => {
          this.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
          });

          if (this.props.onUploaded) {
            this.props.onUploaded(fileObj);
          }
        });

        uploadInstance.on('error', (error, fileObj) => {
          console.log(`Error during upload: ${error}`);
        });

        uploadInstance.on('progress', (progress, fileObj) => {
          // console.log(`Upload Percentage: ${progress}`);
          // Update our progress bar
          this.setState({
            progress,
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }
  render() {
    if (this.state.subscription.files.ready()) {
      let imagePreviewUrl = MediaFiles.findOne({ meta: this.fileInfo }) ?
        MediaFiles.findOne({ meta: this.fileInfo }).link() :
        null;
      if (!imagePreviewUrl) {
        imagePreviewUrl = this.state.imagePreviewUrl;
      }
      return (
        <div>
          <div
            style={{
              position: 'relative', display: 'inline-block', verticalAlign: 'top' }}
          >
            <img
              id={this.imageId}
              // src={this.state.imagePreviewUrl}
              src={imagePreviewUrl}
              alt="Select"
              // width="200px"
              // height="130px"
              style={{
                maxWidth: '150px', backgroundColor: '#EFEFEF',
                cursor: 'pointer',
              }}
              onTouchTap={this.openFileDialog}
            />
            <input
              type="file"
              id={this.inputFileId}
              ref={(input) => this.inputFile = input}
              disabled={this.state.inProgress}
              onChange={this.onImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <ToggleDisplay show={this.state.inProgress}>
            <LinearProgress mode="determinate" value={this.state.progress} />
            <span>{this.state.progress}%</span>
          </ToggleDisplay>
        </div>
      );
    }
    return (<div>not ready</div>);
  }
}

FileUploadImgBox.propTypes = {
  fileType: React.PropTypes.string,
  category: React.PropTypes.string,
  mealType: React.PropTypes.string,
  mealTime: React.PropTypes.string,
  userId: React.PropTypes.string,
  familyId: React.PropTypes.string,
};

export default FileUploadImgBox;

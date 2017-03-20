import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { Accordion, AccordionItem } from 'react-sanfona';
import FileUploadImageBox from '../../../components/FileUploadImageBox.jsx';

import { Meteor } from 'meteor/meteor';
import { MediaFiles } from '../../../../api/collections/MediaFiles.js';

export default class MealRecordPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      inProgress: false,
      image1PreviewUrl: '/img/image.blank.svg',
      image2PreviewUrl: '/img/image.blank.svg',
      subscription: {
        mealFiles: Meteor.subscribe('MediaFiles.private.mealRecords'),
      },
    };
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.uploadIt = this.uploadIt.bind(this);
  }
  componentWillUnmount() {
    this.state.subscription.mealFiles.stop();
  }
  onImageChange(e) {
    e.preventDefault();
    e.stopPropagation();

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
          fileName: file.name ? file.name.replace(`.${fileExtension}`, '') : '',
          image1PreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.inputFile.value = '';
      this.setState({
        fileName: '',
        imagePreviewUrl: '/img/image.blank.svg',
      });
      alert(errMessage);
    }
  }
  uploadIt(fileInfo) {
    // console.log('e', e.currentTarget.files);

    // e.preventDefault();
    // if (e.currentTarget.files && e.currentTarget.files[0]) {
    // const inputFile = this.inputFile;
    if (fileInfo.inputFile && fileInfo.inputFile.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      // const file = e.currentTarget.files[0];
      const file = fileInfo.inputFile.files[0];
      if (file) {
        const uploadInstance = MediaFiles.insert({
          file,
          meta: {
            // locator: this.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
            caption: fileInfo.fileCap,
            description: fileInfo.fileDesc,
            type: fileInfo.fileType ? fileInfo.fileType : null,
            catId: fileInfo.fileCat ? fileInfo.fileCat : null,
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

        // These are the event functions, don't need most of them
        // ,it shows where we are in the process
        uploadInstance.on('start', () => {
          // console.log('Starting');
        });

        uploadInstance.on('end', (error, fileObj) => {
          // console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', (error, fileObj) => {
          // console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          // this.refs.fileinput.value = '';
          this.inputFile.value = '';
          this.inputFileCaption.setState({ value: '' });
          this.inputFileDesc.setState({ value: '' });
          const imgPreviewer = document.getElementById('imgPreviewer');
          imgPreviewer.src = '/img/image.blank.svg';
          /*
          this.setState({
            imagePreviewUrl: '/img/image.blank.svg',
          });
          */
          // Reset our state for the next file
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
  openFileDialog(e) {
    e.stopPropagation();

    console.log('e.target', e.target.id);
    const inputFile = document.getElementById('inputFile');
    inputFile.click();
    // document.getElementById('inputFile').click();
    // this.refs.fileinput.clck();
  }
  togglePanel() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    const { title, mealType, userId, familyId } = this.props;
    return (
      <Paper
        className="counsel-step-button-container"
        style={{ border: '2px solid #999', padding: '10px' }}
        zDepth={0}
      >
        <Accordion>
          <AccordionItem
            title={
              <div>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'left', cursor: 'pointer' }}>
                        <h4 style={{ margin: '0px' }}>{title}</h4>
                      </td>
                      <td style={{ width: '50%', textAlign: 'right', cursor: 'pointer' }}>
                        <FontIcon
                          className="icon-camera-1"
                          style={{ fontSize: '26px' }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
            slug={1} key={1}
          >
            <div>
              <Divider />
              <table style={{ width: '100%', marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '50%' }}>
                      <div style={{ width: '100%', backgroundColor: '#EFEFEF' }}>
                        <FileUploadImageBox
                          category="mealRecord"
                          mealType={mealType}
                          mealTime="before"
                          userId={userId}
                          familyId={familyId}
                        />
                      </div>
                      <h4 style={{ margin: '0px' }}>식전</h4>
                    </td>
                    <td style={{ width: '50%' }}>
                      <div style={{ width: '100%', backgroundColor: '#EFEFEF' }}>
                        <FileUploadImageBox
                          category="mealRecord"
                          mealType={mealType}
                          mealTime="after"
                          userId={userId}
                          familyId={familyId}
                        />
                      </div>
                      <h4 style={{ margin: '0px' }}>식후</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
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
            </div>
          </AccordionItem>
        </Accordion>
      </Paper>
    );
  }
}

MealRecordPanel.propTypes = {
  title: React.PropTypes.string,
  mealType: React.PropTypes.oneOf([
    'breakFast', 'lunch', 'dinner', 'snack', 'snack_1', 'snack_2', 'snack_3']
  ),
  userId: React.PropTypes.string,
  familyId: React.PropTypes.string,
};

import { Meteor } from 'meteor/meteor';
import { ReactiveMethod } from 'meteor/simple:reactive-method';
// import trackerReact from 'meteor/ultimatejs:tracker-react';
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import { MediaFiles } from '../../api/collections/MediaFiles.js';
import getFileLink from '../../utils/getFileLink';

import Clarifai from 'clarifai';

const app = new Clarifai.App(
  'lgaUDOFyiKatqRa-4C9UgWtFb4GvmOIYDqnCxkYF',
  'nuKOoshKMcpslH_tX_5fLCyl0DjXYVDjwIZPMEaU'
);

const ROOT_URL = Meteor.absoluteUrl();

export default class ImageDetect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '/img/image.blank.svg',
    };
  }
  componentWillMount() {
    // console.log('ROOT_URL', ROOT_URL);
    // vision.init({ auth: 'AIzaSyCXno6KLmet-U9QDvsY730kJBsUNVibS3I' });
  }
  render() {
    const imageTitle = '이미지 디텍션';
    let imgLink = '/img/image.blank.svg';
    const { fileId, fileObj } = this.props;
    if (fileObj) {
      // console.log('fileObj', fileObj);
      imgLink = getFileLink(ROOT_URL, fileObj);// this.getFileLink(fileId);
      const imgPath = fileObj.path;
      console.log('imgLink', imgPath);

      app.models.predict(Clarifai.GENERAL_MODEL, imgLink).then(
        (response) => {
          console.log('response', response);
        },
        (err) => {
          console.log('response', err);
        }
      );
      // Meteor.call('vision.predict', imgPath);
      // console.log('detectLabel: ', ReactiveMethod.call('vision.detectLabels', fileObj));
    }

    return (
      <Paper
        style={{ display: 'inline-block', verticalAlign: 'top', height: '100%' }}
        zDepth={1}
        children={
          <div>
            <Subheader>{imageTitle}</Subheader>
            <img
              id="imgPreviewer"
              src={imgLink}
              alt="Select"
              width="200px"
              height="130px"
              style={{ width: '200px', height: '130px', backgroundColor: '#EFEFEF' }}
            />
          </div>
        }
      />
    );
  }
}

ImageDetect.propTypes = {
  fileId: React.PropTypes.string,
  fileObj: React.PropTypes.object,
};

import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import FileUpload from '../components/FileUpload.jsx';
import FileList from '../components/FileList.jsx';
import ImageDetect from '../components/ImageDetect.jsx';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';

const pageTitle = '이미지 업로드';

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileId: null,
      fileObj: null,
    };
    this.onUploaded = this.onUploaded.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  onUploaded(file) {
    // console.log('uploaded!:', file);
    this.setState({
      fileId: file._id,
      fileObj: file,
    });
  }
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <h2>UPLOAD</h2>
        <Divider />
        <FileUpload fileType="image" onUploaded={this.onUploaded} />
        <ImageDetect fileId={this.state.fileId} fileObj={this.state.fileObj} />
        <FileList fileType="image" fileId={this.state.fileId} />
      </div>
    );
  }
}

UploadPage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(UploadPage);

import React from 'react';
import Divider from 'material-ui/Divider';
import Title from 'react-title-component';

import { connect } from 'react-redux';
import { setPageTitle } from '../../redux/actions/setPageTitle.js';

const pageTitle = 'HOME';

class HomePage extends React.PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(setPageTitle(pageTitle));
  }
  render() {
    return (
      <div className="root">
        <Title render={(previousTitle) => `${pageTitle} - ${previousTitle}`} />
        <h2>Home</h2>
        <Divider />
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(HomePage);

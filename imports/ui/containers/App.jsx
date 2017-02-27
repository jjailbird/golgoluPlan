// import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, purple900, deepOrange50 } from 'material-ui/styles/colors';

import Title from 'react-title-component';
import Navbar from '../components/Navbar.jsx';

// const CONNECTION_ISSUE_TIMEOUT = 1000;
const muiThemeGreen = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: purple900,
    primary3Color: deepOrange50,
    accent1Color: green500,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
  }
  getChildContext() {
    return {
      muiTheme: muiThemeGreen,
      // location: this.props.location,
    };
  }
  componentDidMount() {
    /*
    setTimeout(() => {
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
    */
  }
  render() {
    // const { showConnectionIssue } = this.state;
    /*
    const {
      children,
    } = this.props;
    const clonedChildren = children && React.cloneElement(children, {
      user: this.props.user,
    });
    */
    return (
      <MuiThemeProvider muiTheme={muiThemeGreen}>
        <div id="container">
          <Title render="Golgoru Plan" />
          <Navbar location={this.props.location} />
          <div className="detail">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element,
  connected: React.PropTypes.bool,
  // user: React.PropTypes.object,
  location: React.PropTypes.object,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object, // .isRequired,
  // location: React.PropTypes.object,
};

export default App;

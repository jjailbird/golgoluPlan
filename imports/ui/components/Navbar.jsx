import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';

import MediaQuery from 'react-responsive';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';

import { connect } from 'react-redux';
import { signin, signout } from '../../redux/actions/authenticate.js';

const styles = {
  tabs: {
    width: '450px',
  },
  tab: {
    height: '64px',
    color: 'white',
  },
  toolbar: {
    height: '64px',
    backgroundColor: 'transparent',
    padding: '0px',
  },
};

const naviItems = [
  { title: 'HOME', route: '/home' },
  {
    title: '골고루플랜',
    route: '/counsel/home',
    children: [
      { title: '', route: '/counsel/step/01' },
    ],
  },
  { title: 'UPLOAD', route: '/upload' },
];

const naviTabs = [];
const naviMenuItems = [];
for (let i = 0; i < naviItems.length; i++) {
  naviTabs.push(
    <Tab key={i} value={naviItems[i].route} label={naviItems[i].title} style={styles.tab} />);
  naviMenuItems.push(
    <MenuItem key={i} value={naviItems[i].route} primaryText={naviItems[i].title} />
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      dialogOpen: false,
    };
    this.onAppMenuTouch = this.onAppMenuTouch.bind(this);
    this.onMenuChange = this.onMenuChange.bind(this);
    this.onTabsChange = this.onTabsChange.bind(this);
    // this.getNaviTitle = this.getNaviTitle.bind(this);
  }
  onAppMenuTouch() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  onMenuChange(object, value) {
    if (value === '/signout') {
      this.setState({ dialogOpen: true, dialogMessage: '로그아웃하시겠습니까?' });
    } else {
      browserHistory.push(value);
      this.setState({ menuOpen: false });
    }
  }
  onTabsChange(value) {
    browserHistory.push(value);
  }
  /*
  getNaviTitle(route) {
    const result = naviItems.find((item) => item.route === route);
    let title = '골고루플랜';
    if (result) {
      title = result.title;
    }
    return title;
  }
  */
  confirmLogout(on) {
    if (on) {
      Meteor.logout();
      const { dispatch } = this.props;
      dispatch(signout());
      browserHistory.push('/');
    }
    this.setState({ dialogOpen: false });
  }
  render() {
    const naviTitle = this.props.title ? this.props.title : '';
    const authLoginGroup = (
      <ToolbarGroup>
        <FlatButton
          label="로그인"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px 14px 14px', minWidth: '47px' }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onClick={() => { browserHistory.push('/signin'); }}
        />
        <ToolbarSeparator
          style={{
            top: '26px', backgroundColor: '#ccc', height: '10px',
            marginLeft: '0px', marginRight: '3px', width: '2px',
          }}
        />
        <FlatButton
          label="회원가입"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px', minWidth: '47px',
          }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onClick={() => { browserHistory.push('/signup'); }}
        />
      </ToolbarGroup>
    );
    const authLogoutGroup = (
      <ToolbarGroup>
        <FlatButton
          label={this.props.user ? this.props.user.username : 'username'}
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px 14px 14px', minWidth: '47px' }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
        />
        <ToolbarSeparator
          style={{
            top: '26px', backgroundColor: '#ccc', height: '10px',
            marginLeft: '0px', marginRight: '3px', width: '2px',
          }}
        />
        <FlatButton
          label="로그아웃"
          style={{ height: 'auto', color: '#ccc',
            margin: '14px 0px', minWidth: '47px',
          }}
          labelStyle={{ fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}
          onTouchTap={() => { this.setState({ dialogOpen: true, dialogMessage: '로그아웃하시겠습니까?' }); }}
        />
      </ToolbarGroup>
    );
    const authLoginMenu = (
      <MenuItem key="menuLogin" value="/signin" primaryText="로그인" />
    );
    const authLogoutMenu = (
      <MenuItem key="menuLogout" value="/signout" primaryText="로그아웃" />
    );
    const dialogActions = [
      <FlatButton
        label="예"
        primary
        onTouchTap={() => { this.confirmLogout(true); }}
      />,
      <FlatButton
        label="아니오"
        onTouchTap={() => { this.confirmLogout(false); }}
      />,
    ];
    return (
      (naviTitle !== 'HOME LOGIN' && naviTitle !== 'HOME REGISTER') ?
        <div>
          <MediaQuery orientation="landscape">
            <AppBar
              className="app-bar sticky top"
              title={naviTitle}
              titleStyle={{ cursor: 'pointer' }}
              showMenuIconButton={false}
              // onTitleTouchTap={() => { browserHistory.push('/'); }}
            >
              <Toolbar style={styles.toolbar}>
                <ToolbarGroup>
                  <Tabs
                    style={styles.tabs}
                    value={this.props.location.pathname}
                    onChange={this.onTabsChange}
                  >
                    {naviTabs}
                  </Tabs>
                </ToolbarGroup>
                {this.props.user ? authLogoutGroup : authLoginGroup}
              </Toolbar>
            </AppBar>
          </MediaQuery>
          <MediaQuery orientation="portrait">
            <AppBar
              className="app-bar mobile sticky top"
              title={naviTitle}
              titleStyle={{ cursor: 'pointer' }}
              iconElementLeft={
                <IconButton onTouchTap={() => { browserHistory.goBack(); }}>
                  <ArrowBackIcon />
                </IconButton>
              }
              iconElementRight={
                <IconButton onTouchTap={this.onAppMenuTouch}><MenuIcon /></IconButton>
              }
              // onTitleTouchTap={() => { browserHistory.push('/'); }}
            />
            <Drawer
              width={200}
              open={this.state.menuOpen}
              onRequestChange={(menuOpen) => this.setState({ menuOpen })}
              docked={false}
              openSecondary
            >
              <Menu
                selectedMenuItemStyle={{ backgroundColor: 'black' }}
                value={this.props.location.pathname}
                onChange={this.onMenuChange}
              >
                {naviMenuItems}
                {this.props.user ? authLogoutMenu : authLoginMenu}
              </Menu>
            </Drawer>
          </MediaQuery>
          <Dialog
            title="로그아웃?"
            actions={dialogActions}
            open={this.state.dialogOpen}
          >
            {this.state.dialogMessage}
          </Dialog>
        </div>
      :
        <div></div>
    );
  }
}

Navbar.propTypes = {
  user: React.PropTypes.object,
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  title: React.PropTypes.string,
};

/*
Navbar.contextTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};
*/

function mapStateToProps(state) {
  return {
    title: state.changePage.title,
    user: state.authenticate.user,
  };
}

export default connect(mapStateToProps)(Navbar);

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from './ui/containers/AppContainer.jsx';

import HomeLogin from './ui/pages/HomeLogin.jsx';
import HomeRegister from './ui/pages/HomeRegister.jsx';
import HomePage from './ui/pages/HomePage.jsx';
import CounselHome from './ui/pages/counsel/CounselHome.jsx';
import CounselSteps from './ui/pages/counsel/CounselSteps.jsx';
import BmiInputPage from './ui/pages/counsel/BmiInputPage.jsx';
import BmiReportPage from './ui/pages/counsel/BmiReportPage.jsx';
import EhdInputPage from './ui/pages/counsel/EhdInputPage.jsx';

import UploadPage from './ui/pages/UploadPage.jsx';
import SignIn from './ui/pages/SignIn.jsx';
import SignUp from './ui/pages/SignUp.jsx';

import { Provider } from 'react-redux';
import stores from './redux/store/stores.js';

import FamilyList from './ui/pages/counsel/components/FamilyList.jsx';
/*
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />
      <Route path="home" component={HomePage} />
      <Route path="counsel/start" component={CounselHome} />
      <Route path="counsel/step/01" component={CounselStep01Page} />
      <Route path="upload" component={UploadPage} />
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
    </Route>
  </Router>
);
*/
const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/homelogin',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

export const renderRoutes = () => (
  <Provider store={stores}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={CounselHome} onEnter={requireAuth} />
        <Route path="home" component={HomePage} onEnter={requireAuth} />
        <Route path="homelogin" component={HomeLogin} />
        <Route path="homeregister" component={HomeRegister} />
        <Route path="counsel/home" component={CounselHome} onEnter={requireAuth} />
        <Route path="counsel/steps(/:familyId)(/:pubDate)" component={CounselSteps} onEnter={requireAuth} />
        <Route path="counsel/step/01" component={BmiInputPage} onEnter={requireAuth} />
        <Route path="counsel/step/02" component={EhdInputPage} onEnter={requireAuth} />
        <Route path="counsel/bmi/input" component={BmiInputPage} onEnter={requireAuth} />
        <Route path="counsel/bmi/report(/:familyId)(/:pubDate)" component={BmiReportPage} onEnter={requireAuth} />
        <Route path="upload" component={UploadPage} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="familylist" component={FamilyList} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
);

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
export const renderRoutes = () => (
  <Provider store={stores}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeLogin} />
        <Route path="home" component={HomePage} />
        <Route path="homelogin" component={HomeLogin} />
        <Route path="homeregister" component={HomeRegister} />
        <Route path="counsel/home" component={CounselHome} />
        <Route path="counsel/steps(/:familyId)(/:pubDate)" component={CounselSteps} />
        <Route path="counsel/step/01" component={BmiInputPage} />
        <Route path="counsel/step/02" component={EhdInputPage} />
        <Route path="counsel/bmi/report(/:familyId)(/:pubDate)" component={BmiReportPage} />
        <Route path="upload" component={UploadPage} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="familylist" component={FamilyList} />
      </Route>
    </Router>
  </Provider>
);

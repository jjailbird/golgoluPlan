import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import App from './App.jsx';

export default createContainer(() => ({
  // user: Meteor.user(),
  connected: Meteor.status().connected,
}), App);

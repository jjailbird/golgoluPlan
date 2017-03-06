import { Meteor } from 'meteor/meteor';
import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers/reducers';
import DevTools from '../../ui/components/DevTools';

const logger = createLogger();

const enhancers = [
  applyMiddleware(ReduxThunk, logger),
  DevTools.instrument(),
];

const stores = createStore(reducers, {}, compose(...enhancers));
// const stores = createStore(reducers);

Meteor.autorun(() => {
  const meteorUser = Meteor.user();
  if (meteorUser) {
    stores.dispatch({ type: 'SIGNIN', user: meteorUser });
  } else {
    stores.dispatch({ type: 'SIGNOUT' });
  }
});

export default stores;

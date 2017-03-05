import { combineReducers } from 'redux';
import changePage from './changePage';
import authenticate from './authenticate';
import ehdQuestion from './ehdQuestion';
// import ehdAnswer from './ehdAnswer';

const reducers = combineReducers({
  changePage, authenticate, ehdQuestion,
});

export default reducers;

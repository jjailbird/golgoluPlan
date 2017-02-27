import { combineReducers } from 'redux';
import changePage from './changePage';
import authenticate from './authenticate';
import ehdAnswer from './ehdAnswer';


const reducers = combineReducers({
  changePage, authenticate, ehdAnswer,
});

export default reducers;

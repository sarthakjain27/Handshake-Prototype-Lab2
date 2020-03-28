import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import jobReducer from './jobReducer';
import profileReducer from './profileReducer';
import eventReducer from './eventReducer';
import searchReducer from './searchReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  login:loginReducer,
  signup:signupReducer,
  job:jobReducer,
  profile:profileReducer,
  event:eventReducer,
  search:searchReducer,
  message:messageReducer
});
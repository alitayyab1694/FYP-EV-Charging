import { combineReducers } from 'redux';
import appReducer from './appReducer';
import login from './Auth/login';
import register from './Auth/register';
import user from './Auth/user';
import model from './Model';
import ThemeOptions from './ThemeOptions';
import trigger from './Trigger';
const createReducer = combineReducers({
  user,
  appReducer,
  model,
  login,
  trigger,
  register,
  ThemeOptions
});

export default createReducer;

import { combineReducers } from 'redux';
import appReducer from './appReducer';
import login from './Auth/login';
import register from './Auth/register';
import user from './Auth/user';
import modelReducer from './modelReducer';
import ThemeOptions from './ThemeOptions';
const createReducer = combineReducers({
  user,
  appReducer,
  modelReducer,
  login,
  register,
  ThemeOptions
});

export default createReducer;

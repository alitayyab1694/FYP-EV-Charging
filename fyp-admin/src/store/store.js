import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import appReducer from './reducer/appReducerSlice';
import themeOptionsReducer from './reducer/themeOptionsSlice';
import authLoginReducer from './reducer/authLoginSlice';
import authRegisterReducer from './reducer/authRegisterSlice';
import userReducer from './reducer/userSlice';
import modalReducer from './reducer/modalSlice';

const reducers = combineReducers({
  user: userReducer,
  appReducer: appReducer,
  modelReducer: modalReducer,
  login: authLoginReducer,
  register: authRegisterReducer,
  ThemeOptions: themeOptionsReducer
});

const store = configureStore({
  reducer: reducers
});

export default store;

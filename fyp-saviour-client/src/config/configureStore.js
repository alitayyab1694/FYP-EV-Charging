import createReducer from 'reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  createReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

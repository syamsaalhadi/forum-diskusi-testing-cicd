import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import isPreloadReducer from './isPreload/reducer';
import loadingBarReducer from './loadingBar/reducer';

const rootReducer = combineReducers({
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  users: usersReducer,
  authUser: authUserReducer,
  leaderboards: leaderboardsReducer,
  isPreload: isPreloadReducer,
  loadingBar: loadingBarReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

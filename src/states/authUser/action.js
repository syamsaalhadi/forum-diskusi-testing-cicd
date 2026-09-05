import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {},
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
  };
}

function asyncPreloadAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      if (api.getAccessToken()) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch {
      dispatch(unsetAuthUserActionCreator());
      api.removeAccessToken();
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncPreloadAuthUser,
};

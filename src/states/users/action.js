import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  SET_USERS: 'SET_USERS',
};

function setUsersActionCreator(users) {
  return {
    type: ActionType.SET_USERS,
    payload: { users },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncPopulateUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      dispatch(setUsersActionCreator(users));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType, setUsersActionCreator, asyncRegisterUser, asyncPopulateUsers,
};

import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS',
};

function setLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboardsActionCreator(leaderboards));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { ActionType, setLeaderboardsActionCreator, asyncPopulateLeaderboards };

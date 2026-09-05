import { ActionType } from './action';

const initialState = [];

function leaderboardsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return state;
  }
}

export default leaderboardsReducer;

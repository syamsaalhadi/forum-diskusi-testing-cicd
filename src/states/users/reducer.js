import { ActionType } from './action';

const initialState = [];

function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_USERS:
      return action.payload.users;
    default:
      return state;
  }
}

export default usersReducer;

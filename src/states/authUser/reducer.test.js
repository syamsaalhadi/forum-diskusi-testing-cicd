import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state (null) when given an unknown action', () => {
    const nextState = authUserReducer(null, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should return the authUser from payload when given SET_AUTH_USER action', () => {
    const authUser = { id: 'user-1', name: 'John Doe' };
    const action = { type: ActionType.SET_AUTH_USER, payload: { authUser } };

    const nextState = authUserReducer(null, action);

    expect(nextState).toEqual(authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-1', name: 'John Doe' };
    const action = { type: ActionType.UNSET_AUTH_USER };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});

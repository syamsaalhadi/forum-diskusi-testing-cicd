import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer', () => {
  it('should return the initial state ([]) when given an unknown action', () => {
    const nextState = usersReducer([], { type: 'UNKNOWN' });

    expect(nextState).toEqual([]);
  });

  it('should return the users from payload when given SET_USERS action', () => {
    const users = [{ id: 'user-1', name: 'John Doe' }, { id: 'user-2', name: 'Jane Doe' }];
    const action = { type: ActionType.SET_USERS, payload: { users } };

    const nextState = usersReducer([], action);

    expect(nextState).toEqual(users);
  });

  it('should replace the previous users state entirely when given SET_USERS action', () => {
    const initialState = [{ id: 'user-old', name: 'Old User' }];
    const users = [{ id: 'user-1', name: 'John Doe' }];
    const action = { type: ActionType.SET_USERS, payload: { users } };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(users);
    expect(nextState).not.toContainEqual({ id: 'user-old', name: 'Old User' });
  });
});

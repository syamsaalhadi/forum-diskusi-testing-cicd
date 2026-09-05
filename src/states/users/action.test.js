import api from '../../utils/api';
import {
  ActionType,
  asyncRegisterUser,
  asyncPopulateUsers,
} from './action';

jest.mock('../../utils/api');

describe('asyncRegisterUser thunk', () => {
  it('should call the register endpoint with the given name, email, and password', async () => {
    api.register.mockResolvedValue({ id: 'user-1', name: 'John Doe' });
    const dispatch = jest.fn();

    await asyncRegisterUser({ name: 'John Doe', email: 'john@example.com', password: 'secret123' })(dispatch);

    expect(api.register).toHaveBeenCalledWith({
      name: 'John Doe', email: 'john@example.com', password: 'secret123',
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });
});

describe('asyncPopulateUsers thunk', () => {
  it('should dispatch SET_USERS with the fetched users when the API call succeeds', async () => {
    const users = [{ id: 'user-1', name: 'John Doe' }];
    api.getAllUsers.mockResolvedValue(users);
    const dispatch = jest.fn();

    await asyncPopulateUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_USERS,
      payload: { users },
    });
  });
});

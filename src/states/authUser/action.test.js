import api from '../../utils/api';
import {
  ActionType,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
} from './action';

jest.mock('../../utils/api');

describe('asyncSetAuthUser thunk', () => {
  it('should log in, store the token, fetch the profile, and dispatch SET_AUTH_USER when credentials are valid', async () => {
    const authUser = { id: 'user-1', name: 'John Doe', email: 'john@example.com' };
    api.login.mockResolvedValue('fake-token');
    api.getOwnProfile.mockResolvedValue(authUser);
    const dispatch = jest.fn();

    await asyncSetAuthUser({ email: 'john@example.com', password: 'secret123' })(dispatch);

    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'secret123' });
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser },
    });
  });

  it('should reject and dispatch hideLoading without setting the auth user when login fails', async () => {
    api.login.mockRejectedValue(new Error('email or password is wrong'));
    const dispatch = jest.fn();

    await expect(
      asyncSetAuthUser({ email: 'john@example.com', password: 'wrong' })(dispatch),
    ).rejects.toThrow('email or password is wrong');

    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: ActionType.SET_AUTH_USER }),
    );
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch UNSET_AUTH_USER and remove the stored access token', () => {
    const dispatch = jest.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.UNSET_AUTH_USER,
      payload: {},
    });
    expect(api.removeAccessToken).toHaveBeenCalled();
  });
});

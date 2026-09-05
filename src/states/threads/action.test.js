import api from '../../utils/api';
import {
  ActionType,
  asyncPopulateThreads,
  asyncAddThread,
  asyncToggleThreadVote,
  setThreadsActionCreator,
} from './action';

jest.mock('../../utils/api');

describe('asyncPopulateThreads thunk', () => {
  it('should dispatch showLoading, SET_THREADS, and hideLoading when the API call succeeds', async () => {
    const threads = [{ id: 'thread-1', title: 'Thread 1' }];
    api.getAllThreads.mockResolvedValue(threads);

    const dispatch = jest.fn();
    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADING' });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_THREADS,
      payload: { threads },
    });
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });

  it('should still dispatch hideLoading when the API call fails', async () => {
    api.getAllThreads.mockRejectedValue(new Error('Network error'));
    const dispatch = jest.fn();

    await expect(asyncPopulateThreads()(dispatch)).rejects.toThrow('Network error');

    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });
});

describe('asyncAddThread thunk', () => {
  it('should dispatch ADD_THREAD with the created thread and return it when the API call succeeds', async () => {
    const newThread = {
      id: 'thread-1', title: 'New Thread', body: 'Body', category: 'general',
    };
    api.createThread.mockResolvedValue(newThread);
    const dispatch = jest.fn();

    const result = await asyncAddThread({ title: 'New Thread', body: 'Body', category: 'general' })(dispatch);

    expect(api.createThread).toHaveBeenCalledWith({ title: 'New Thread', body: 'Body', category: 'general' });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    });
    expect(result).toEqual(newThread);
  });
});

describe('asyncToggleThreadVote thunk', () => {
  it('should optimistically apply the vote and call the up-vote endpoint when voteType is up', async () => {
    const getState = jest.fn(() => ({
      authUser: { id: 'user-1' },
      threads: [{
        id: 'thread-1', upVotesBy: [], downVotesBy: [],
      }],
    }));
    api.upVoteThread.mockResolvedValue();
    const dispatch = jest.fn();

    await asyncToggleThreadVote({ threadId: 'thread-1', voteType: 'up' })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.APPLY_THREAD_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 'up' },
    });
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should throw an error and not call the API when there is no authenticated user', async () => {
    const getState = jest.fn(() => ({ authUser: null, threads: [] }));
    const dispatch = jest.fn();

    await expect(
      asyncToggleThreadVote({ threadId: 'thread-1', voteType: 'up' })(dispatch, getState),
    ).rejects.toThrow('Anda harus masuk untuk memberikan vote.');

    expect(api.upVoteThread).not.toHaveBeenCalled();
  });

  it('should roll back to the previous threads state when the API call fails', async () => {
    const previousThreads = [{
      id: 'thread-1', upVotesBy: [], downVotesBy: [],
    }];
    const getState = jest.fn(() => ({
      authUser: { id: 'user-1' },
      threads: previousThreads,
    }));
    api.upVoteThread.mockRejectedValue(new Error('Failed to vote'));
    const dispatch = jest.fn();

    await expect(
      asyncToggleThreadVote({ threadId: 'thread-1', voteType: 'up' })(dispatch, getState),
    ).rejects.toThrow('Failed to vote');

    expect(dispatch).toHaveBeenCalledWith(setThreadsActionCreator(previousThreads));
  });
});

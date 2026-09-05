import api from '../../utils/api';
import {
  ActionType,
  asyncPopulateThreadDetail,
  asyncAddComment,
} from './action';

jest.mock('../../utils/api');

describe('asyncPopulateThreadDetail thunk', () => {
  it('should clear the previous detail then dispatch SET_THREAD_DETAIL with the fetched detail', async () => {
    const threadDetail = { id: 'thread-1', title: 'Thread 1', comments: [] };
    api.getThreadDetail.mockResolvedValue(threadDetail);
    const dispatch = jest.fn();

    await asyncPopulateThreadDetail('thread-1')(dispatch);

    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith({ type: ActionType.CLEAR_THREAD_DETAIL, payload: {} });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_THREAD_DETAIL,
      payload: { threadDetail },
    });
  });
});

describe('asyncAddComment thunk', () => {
  it('should dispatch ADD_COMMENT with the created comment when the API call succeeds', async () => {
    const comment = { id: 'comment-1', content: 'Nice thread!' };
    api.createComment.mockResolvedValue(comment);
    const dispatch = jest.fn();

    await asyncAddComment({ threadId: 'thread-1', content: 'Nice thread!' })(dispatch);

    expect(api.createComment).toHaveBeenCalledWith({ threadId: 'thread-1', content: 'Nice thread!' });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_COMMENT,
      payload: { comment },
    });
  });

  it('should propagate the error and still dispatch hideLoading when the API call fails', async () => {
    api.createComment.mockRejectedValue(new Error('Failed to add comment'));
    const dispatch = jest.fn();

    await expect(
      asyncAddComment({ threadId: 'thread-1', content: 'Nice thread!' })(dispatch),
    ).rejects.toThrow('Failed to add comment');

    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADING' });
  });
});

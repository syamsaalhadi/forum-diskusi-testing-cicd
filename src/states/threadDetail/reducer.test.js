import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer', () => {
  it('should return the initial state (null) when given an unknown action', () => {
    const nextState = threadDetailReducer(null, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should return the threadDetail from payload when given SET_THREAD_DETAIL action', () => {
    const threadDetail = { id: 'thread-1', title: 'Thread 1', comments: [] };
    const action = { type: ActionType.SET_THREAD_DETAIL, payload: { threadDetail } };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const initialState = { id: 'thread-1', title: 'Thread 1', comments: [] };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should put the new comment at the beginning of the comments array when given ADD_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      comments: [{ id: 'comment-1', content: 'Old comment' }],
    };
    const newComment = { id: 'comment-2', content: 'New comment' };
    const action = { type: ActionType.ADD_COMMENT, payload: { comment: newComment } };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should not throw and should return state unchanged when ADD_COMMENT is dispatched while state is null', () => {
    const action = { type: ActionType.ADD_COMMENT, payload: { comment: { id: 'comment-1' } } };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toBeNull();
  });

  it('should apply the vote to the thread itself when given APPLY_THREAD_DETAIL_VOTE action', () => {
    const initialState = { id: 'thread-1', upVotesBy: [], downVotesBy: [] };
    const action = {
      type: ActionType.APPLY_THREAD_DETAIL_VOTE,
      payload: { userId: 'user-1', voteType: 'up' },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toEqual(['user-1']);
  });

  it('should apply the vote to the correct comment when given APPLY_COMMENT_VOTE action', () => {
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1', upVotesBy: [], downVotesBy: [],
        },
        {
          id: 'comment-2', upVotesBy: [], downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.APPLY_COMMENT_VOTE,
      payload: { commentId: 'comment-2', userId: 'user-1', voteType: 'down' },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].downVotesBy).toEqual([]);
    expect(nextState.comments[1].downVotesBy).toEqual(['user-1']);
  });
});

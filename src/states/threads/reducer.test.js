import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  it('should return the initial state ([]) when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([]);
  });

  it('should return the threads from payload when given SET_THREADS action', () => {
    const initialState = [];
    const threads = [
      { id: 'thread-1', title: 'Thread 1' },
      { id: 'thread-2', title: 'Thread 2' },
    ];
    const action = { type: ActionType.SET_THREADS, payload: { threads } };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(threads);
  });

  it('should put the new thread at the beginning of the array when given ADD_THREAD action', () => {
    const initialState = [{ id: 'thread-1', title: 'Old Thread' }];
    const newThread = { id: 'thread-2', title: 'New Thread' };
    const action = { type: ActionType.ADD_THREAD, payload: { thread: newThread } };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should add the userId to upVotesBy and remove it from downVotesBy when given APPLY_THREAD_VOTE with voteType up', () => {
    const initialState = [
      {
        id: 'thread-1', upVotesBy: [], downVotesBy: ['user-1'],
      },
    ];
    const action = {
      type: ActionType.APPLY_THREAD_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 'up' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual(['user-1']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should only affect the targeted thread when given APPLY_THREAD_VOTE action', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] },
      { id: 'thread-2', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.APPLY_THREAD_VOTE,
      payload: { threadId: 'thread-2', userId: 'user-1', voteType: 'down' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toEqual([]);
    expect(nextState[1].downVotesBy).toEqual(['user-1']);
  });

  it('should be able to neutralize a vote (remove userId from both arrays)', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.APPLY_THREAD_VOTE,
      payload: { threadId: 'thread-1', userId: 'user-1', voteType: 'neutral' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });
});

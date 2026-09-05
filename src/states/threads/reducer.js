import { ActionType } from './action';

const initialState = [];

function applyVote(thread, userId, voteType) {
  const upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up') upVotesBy.push(userId);
  if (voteType === 'down') downVotesBy.push(userId);

  return { ...thread, upVotesBy, downVotesBy };
}

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...state];
    case ActionType.APPLY_THREAD_VOTE:
      return state.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return applyVote(thread, action.payload.userId, action.payload.voteType);
      });
    default:
      return state;
  }
}

export default threadsReducer;

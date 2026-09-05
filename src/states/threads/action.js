import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  APPLY_THREAD_VOTE: 'APPLY_THREAD_VOTE',
};

function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function applyThreadVoteActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.APPLY_THREAD_VOTE,
    payload: { threadId, userId, voteType },
  };
}

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(setThreadsActionCreator(threads));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return thread;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadVote({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      throw new Error('Anda harus masuk untuk memberikan vote.');
    }

    const previousThreads = threads;
    dispatch(applyThreadVoteActionCreator({ threadId, userId: authUser.id, voteType }));

    try {
      if (voteType === 'up') await api.upVoteThread(threadId);
      else if (voteType === 'down') await api.downVoteThread(threadId);
      else await api.neutralizeThreadVote(threadId);
    } catch (error) {
      dispatch(setThreadsActionCreator(previousThreads));
      throw error;
    }
  };
}

export {
  ActionType,
  setThreadsActionCreator,
  addThreadActionCreator,
  applyThreadVoteActionCreator,
  asyncPopulateThreads,
  asyncAddThread,
  asyncToggleThreadVote,
};

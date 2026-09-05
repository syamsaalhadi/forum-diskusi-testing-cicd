import api from '../../utils/api';
import { showLoading, hideLoading } from '../loadingBar/action';

const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  APPLY_THREAD_DETAIL_VOTE: 'APPLY_THREAD_DETAIL_VOTE',
  APPLY_COMMENT_VOTE: 'APPLY_COMMENT_VOTE',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
};

function setThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.SET_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function applyThreadDetailVoteActionCreator({ userId, voteType }) {
  return {
    type: ActionType.APPLY_THREAD_DETAIL_VOTE,
    payload: { userId, voteType },
  };
}

function applyCommentVoteActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.APPLY_COMMENT_VOTE,
    payload: { commentId, userId, voteType },
  };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL, payload: {} };
}

function asyncPopulateThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetailActionCreator(threadDetail));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleThreadDetailVote({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) throw new Error('Anda harus masuk untuk memberikan vote.');

    const previousDetail = threadDetail;
    dispatch(applyThreadDetailVoteActionCreator({ userId: authUser.id, voteType }));

    try {
      if (voteType === 'up') await api.upVoteThread(threadId);
      else if (voteType === 'down') await api.downVoteThread(threadId);
      else await api.neutralizeThreadVote(threadId);
    } catch (error) {
      dispatch(setThreadDetailActionCreator(previousDetail));
      throw error;
    }
  };
}

function asyncToggleCommentVote({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) throw new Error('Anda harus masuk untuk memberikan vote.');

    const previousDetail = threadDetail;
    dispatch(applyCommentVoteActionCreator({ commentId, userId: authUser.id, voteType }));

    try {
      if (voteType === 'up') await api.upVoteComment(threadId, commentId);
      else if (voteType === 'down') await api.downVoteComment(threadId, commentId);
      else await api.neutralizeCommentVote(threadId, commentId);
    } catch (error) {
      dispatch(setThreadDetailActionCreator(previousDetail));
      throw error;
    }
  };
}

export {
  ActionType,
  setThreadDetailActionCreator,
  addCommentActionCreator,
  applyThreadDetailVoteActionCreator,
  applyCommentVoteActionCreator,
  clearThreadDetailActionCreator,
  asyncPopulateThreadDetail,
  asyncAddComment,
  asyncToggleThreadDetailVote,
  asyncToggleCommentVote,
};

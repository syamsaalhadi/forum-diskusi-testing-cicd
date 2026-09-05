import { ActionType } from './action';

const initialState = null;

function applyVote(entity, userId, voteType) {
  const upVotesBy = entity.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = entity.downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up') upVotesBy.push(userId);
  if (voteType === 'down') downVotesBy.push(userId);

  return { ...entity, upVotesBy, downVotesBy };
}

function threadDetailReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return initialState;
    case ActionType.ADD_COMMENT:
      if (!state) return state;
      return { ...state, comments: [action.payload.comment, ...state.comments] };
    case ActionType.APPLY_THREAD_DETAIL_VOTE:
      if (!state) return state;
      return applyVote(state, action.payload.userId, action.payload.voteType);
    case ActionType.APPLY_COMMENT_VOTE:
      if (!state) return state;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment;
          return applyVote(comment, action.payload.userId, action.payload.voteType);
        }),
      };
    default:
      return state;
  }
}

export default threadDetailReducer;

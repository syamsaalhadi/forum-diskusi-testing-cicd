import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { asyncToggleCommentVote } from '../states/threadDetail/action';
import { postedAt } from '../utils';

function CommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, threadId,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  function handleVote(voteType) {
    const alreadyVoted = voteType === 'up' ? upVotesBy.includes(authUser?.id) : downVotesBy.includes(authUser?.id);
    dispatch(asyncToggleCommentVote({
      threadId,
      commentId: id,
      voteType: alreadyVoted ? 'neutral' : voteType,
    })).catch((error) => toast.error(error.message));
  }

  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-none">
      <Avatar image={owner.avatar} name={owner.name} />
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">{owner.name}</span>
          <span className="text-xs text-slate-400">{postedAt(createdAt)}</span>
        </div>
        <p className="mb-2 text-sm leading-relaxed text-slate-600">{content}</p>
        <VoteButtons
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          userId={authUser?.id}
          onUpVote={() => handleVote('up')}
          onDownVote={() => handleVote('down')}
        />
      </div>
    </div>
  );
}

export default CommentItem;

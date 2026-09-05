import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from './Avatar';
import VoteButtons from './VoteButtons';
import { asyncToggleThreadVote } from '../states/threads/action';
import { postedAt, truncateHtml } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  ownerName,
  ownerAvatar,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  function handleVote(voteType) {
    const alreadyVoted = voteType === 'up' ? upVotesBy.includes(authUser?.id) : downVotesBy.includes(authUser?.id);
    dispatch(asyncToggleThreadVote({ threadId: id, voteType: alreadyVoted ? 'neutral' : voteType }))
      .catch((error) => toast.error(error.message));
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
          #
          {category}
        </span>
        <span className="text-xs text-slate-400">{postedAt(createdAt)}</span>
      </div>

      <Link to={`/threads/${id}`}>
        <h2 className="mb-1.5 text-lg font-bold text-slate-900 hover:text-brand-600">{title}</h2>
        <p className="mb-4 text-sm leading-relaxed text-slate-500">{truncateHtml(body)}</p>
      </Link>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <Avatar image={ownerAvatar} name={ownerName} size="w-7 h-7" />
          <span className="text-xs font-medium text-slate-500">{ownerName}</span>
        </div>
        <div className="flex items-center gap-4">
          <VoteButtons
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            userId={authUser?.id}
            onUpVote={() => handleVote('up')}
            onDownVote={() => handleVote('down')}
          />
          <Link to={`/threads/${id}`} className="text-xs font-semibold text-slate-500 hover:text-brand-600">
            💬
            {' '}
            {totalComments}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;

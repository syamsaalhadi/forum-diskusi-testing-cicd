function VoteButtons({
  upVotesBy, downVotesBy, userId, onUpVote, onDownVote, size = 'text-sm',
}) {
  const hasUpVoted = userId ? upVotesBy.includes(userId) : false;
  const hasDownVoted = userId ? downVotesBy.includes(userId) : false;

  return (
    <div className={`flex items-center gap-3 ${size}`}>
      <button
        type="button"
        onClick={onUpVote}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition ${
          hasUpVoted ? 'bg-rose-100 text-rose-600' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <span>&uarr;</span>
        {upVotesBy.length}
      </button>
      <button
        type="button"
        onClick={onDownVote}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition ${
          hasDownVoted ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <span>&darr;</span>
        {downVotesBy.length}
      </button>
    </div>
  );
}

export default VoteButtons;

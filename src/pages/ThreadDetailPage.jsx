import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../components/Avatar';
import VoteButtons from '../components/VoteButtons';
import CommentsList from '../components/CommentsList';
import { asyncPopulateThreadDetail, asyncToggleThreadDetailVote } from '../states/threadDetail/action';
import { showFormattedDate } from '../utils';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const isLoading = useSelector((state) => state.loadingBar > 0);

  useEffect(() => {
    dispatch(asyncPopulateThreadDetail(id));
  }, [dispatch, id]);

  function handleVote(voteType) {
    const alreadyVoted = voteType === 'up'
      ? threadDetail.upVotesBy.includes(authUser?.id)
      : threadDetail.downVotesBy.includes(authUser?.id);
    dispatch(asyncToggleThreadDetailVote({
      threadId: id,
      voteType: alreadyVoted ? 'neutral' : voteType,
    })).catch((error) => toast.error(error.message));
  }

  if (!threadDetail) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        {!isLoading && (
          <p className="text-center text-slate-400">
            Thread tidak ditemukan.
            {' '}
            <Link to="/" className="font-semibold text-brand-600">Kembali</Link>
          </p>
        )}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="mb-4 inline-block text-sm font-medium text-slate-500 hover:text-brand-600">&larr; Kembali ke daftar thread</Link>

      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <span className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
          #
          {threadDetail.category}
        </span>
        <h1 className="mb-3 text-2xl font-extrabold text-slate-900">{threadDetail.title}</h1>

        <div className="mb-4 flex items-center gap-2">
          <Avatar image={threadDetail.owner.avatar} name={threadDetail.owner.name} />
          <div>
            <p className="text-sm font-semibold text-slate-800">{threadDetail.owner.name}</p>
            <p className="text-xs text-slate-400">{showFormattedDate(threadDetail.createdAt)}</p>
          </div>
        </div>

        <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{threadDetail.body}</p>

        <VoteButtons
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          userId={authUser?.id}
          onUpVote={() => handleVote('up')}
          onDownVote={() => handleVote('down')}
          size="text-base"
        />
      </article>

      <CommentsList threadId={id} comments={threadDetail.comments} />
    </main>
  );
}

export default ThreadDetailPage;

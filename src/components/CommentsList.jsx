import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem';
import Button from './Button';
import { asyncAddComment } from '../states/threadDetail/action';

function CommentsList({ threadId, comments }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await dispatch(asyncAddComment({ threadId, content }));
      setContent('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-6">
      <h3 className="mb-3 text-base font-bold text-slate-800">
        Komentar (
        {comments.length}
        )
      </h3>

      {authUser ? (
        <form onSubmit={onSubmit} className="mb-4 flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Tulis komentar kamu..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          />
          <Button type="submit" disabled={submitting} className="self-end">
            {submitting ? 'Mengirim...' : 'Kirim Komentar'}
          </Button>
        </form>
      ) : (
        <p className="mb-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
          <Link to="/login" className="font-semibold text-brand-600">Masuk</Link>
          {' '}
          untuk memberikan komentar.
        </p>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white px-5">
        {comments.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} threadId={threadId} {...comment} />
          ))
        )}
      </div>
    </section>
  );
}

export default CommentsList;

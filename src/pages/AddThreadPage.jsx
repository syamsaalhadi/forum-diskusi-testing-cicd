import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const thread = await dispatch(asyncAddThread({ title, body, category }));
      navigate(`/threads/${thread.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-slate-900">Buat Thread Baru</h1>
      <p className="mb-6 text-sm text-slate-500">Bagikan topik diskusi yang menarik untuk komunitas.</p>

      {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <Input id="title" label="Judul" value={title} onChange={onTitleChange} placeholder="Judul thread" required />
        <Input id="category" label="Kategori" value={category} onChange={onCategoryChange} placeholder="mis. teknologi, umum, tanya-jawab" />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="body" className="text-sm font-medium text-slate-700">Isi Thread</label>
          <textarea
            id="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={8}
            required
            placeholder="Tuliskan isi diskusi kamu di sini..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          />
        </div>
        <Button type="submit" disabled={submitting} className="self-end">
          {submitting ? 'Mempublikasikan...' : 'Publikasikan Thread'}
        </Button>
      </form>
    </main>
  );
}

export default AddThreadPage;

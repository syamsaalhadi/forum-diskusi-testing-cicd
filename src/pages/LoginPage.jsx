import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import useInput from '../hooks/useInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-extrabold text-slate-900">Selamat Datang</h1>
        <p className="mb-6 text-sm text-slate-500">Masuk untuk mulai berdiskusi.</p>

        {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="nama@email.com"
            required
          />
          <Input
            id="password"
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="••••••••"
            required
          />
          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Belum punya akun?
          {' '}
          <Link to="/register" className="font-semibold text-brand-600">Daftar</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import useInput from '../hooks/useInput';
import { asyncRegisterUser } from '../states/users/action';
import { asyncSetAuthUser } from '../states/authUser/action';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
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
        <h1 className="mb-1 text-2xl font-extrabold text-slate-900">Buat Akun</h1>
        <p className="mb-6 text-sm text-slate-500">Gabung dan mulai diskusi bersama komunitas.</p>

        {error && <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input id="name" label="Nama" value={name} onChange={onNameChange} placeholder="Nama lengkap" required />
          <Input id="email" label="Email" type="email" value={email} onChange={onEmailChange} placeholder="nama@email.com" required />
          <Input id="password" label="Kata Sandi" type="password" value={password} onChange={onPasswordChange} placeholder="Minimal 6 karakter" required minLength={6} />
          <Input id="confirmPassword" label="Konfirmasi Kata Sandi" type="password" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="Ulangi kata sandi" required minLength={6} />
          <Button type="submit" disabled={submitting} className="mt-2 w-full">
            {submitting ? 'Memproses...' : 'Daftar'}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Sudah punya akun?
          {' '}
          <Link to="/login" className="font-semibold text-brand-600">Masuk</Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;

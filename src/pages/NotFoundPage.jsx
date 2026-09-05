import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-2 text-xl font-bold text-slate-800">Halaman tidak ditemukan</h1>
      <p className="mt-1 text-sm text-slate-500">Halaman yang kamu cari tidak tersedia.</p>
      <Link to="/" className="mt-5"><Button>Kembali ke Beranda</Button></Link>
    </main>
  );
}

export default NotFoundPage;

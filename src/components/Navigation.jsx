import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import Avatar from './Avatar';
import Button from './Button';

function Navigation() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  const linkClass = ({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-brand-600' : 'text-slate-500 hover:text-slate-800'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">D</span>
          Forum Diskusi
        </NavLink>

        <div className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>Threads</NavLink>
          <NavLink to="/leaderboards" className={linkClass}>Leaderboard</NavLink>

          {authUser ? (
            <div className="flex items-center gap-3">
              <NavLink to="/new" className={linkClass}>
                <Button variant="primary" className="!px-3 !py-2">+ Thread</Button>
              </NavLink>
              <Avatar image={authUser.avatar} name={authUser.name} size="w-8 h-8" />
              <Button type="button" variant="ghost" onClick={onLogout}>Keluar</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-600 transition hover:bg-brand-50">Masuk</NavLink>
              <NavLink to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600">Daftar</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navigation;

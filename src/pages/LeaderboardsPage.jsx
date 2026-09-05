import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-slate-900">Leaderboard</h1>
      <p className="mb-6 text-sm text-slate-500">Pengguna paling aktif di forum diskusi.</p>

      {leaderboards.length === 0 ? (
        <p className="text-center text-slate-400">Belum ada data leaderboard.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {leaderboards.map((entry, index) => (
            <LeaderboardItem
              key={entry.user.id}
              rank={index + 1}
              user={entry.user}
              score={entry.score}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default LeaderboardsPage;

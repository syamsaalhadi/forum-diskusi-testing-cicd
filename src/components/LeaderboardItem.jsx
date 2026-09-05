import Avatar from './Avatar';

function LeaderboardItem({ rank, user, score }) {
  const medal = ['🥇', '🥈', '🥉'][rank - 1];

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="w-6 text-center text-sm font-bold text-slate-400">{medal || rank}</span>
        <Avatar image={user.avatar} name={user.name} />
        <div>
          <p className="text-sm font-semibold text-slate-800">{user.name}</p>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
      </div>
      <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-600">{score}</span>
    </div>
  );
}

export default LeaderboardItem;

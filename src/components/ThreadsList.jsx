import ThreadItem from './ThreadItem';

function ThreadsList({ threads, users }) {
  if (threads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
        Belum ada thread pada kategori ini.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            ownerName={owner?.name || 'Pengguna'}
            ownerAvatar={owner?.avatar}
          />
        );
      })}
    </div>
  );
}

export default ThreadsList;

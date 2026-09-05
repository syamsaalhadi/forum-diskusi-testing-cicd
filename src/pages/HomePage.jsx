import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const [activeCategory, setActiveCategory] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = threads
      .map((thread) => thread.category)
      .filter(Boolean);
    return [...new Set(uniqueCategories)];
  }, [threads]);

  const filteredThreads = useMemo(() => {
    if (!activeCategory) return threads;
    return threads.filter((thread) => thread.category === activeCategory);
  }, [threads, activeCategory]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Diskusi Terbaru</h1>
        <p className="text-sm text-slate-500">Ikuti dan mulai diskusi dengan komunitas.</p>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <ThreadsList threads={filteredThreads} users={users} />
    </main>
  );
}

export default HomePage;

function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  if (categories.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelectCategory('')}
        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
          activeCategory === '' ? 'bg-brand-500 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-300'
        }`}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            activeCategory === category ? 'bg-brand-500 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-300'
          }`}
        >
          #
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;

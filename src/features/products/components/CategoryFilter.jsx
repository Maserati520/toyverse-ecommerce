import { useCategories } from '../hooks';

const CategoryFilter = ({ value, onChange }) => {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading)
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-20 shrink-0 rounded-full bg-white/70 animate-pulse" />
        ))}
      </div>
    );

  return (
    <nav aria-label="Filter by category">
      <ul className="flex gap-2 overflow-x-auto pb-1 list-none">
        {/* "All" pill */}
        <li>
          <button
            type="button"
            onClick={() => onChange('')}
            aria-pressed={value === ''}
            className={`h-8 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors duration-200 cursor-pointer
              ${value === ''
                ? 'bg-cyan-800 text-white'
                : 'bg-white text-cyan-800 border-2 border-[#C9E4E7] hover:bg-[#C9E4E7]'
              }`}
          >
            All
          </button>
        </li>
        {categories.map(({ slug, name }) => (
          <li key={slug}>
            <button
              type="button"
              onClick={() => onChange(slug)}
              aria-pressed={value === slug}
              className={`h-8 shrink-0 rounded-full px-4 text-xs font-semibold capitalize transition-colors duration-200 cursor-pointer whitespace-nowrap
                ${value === slug
                  ? 'bg-cyan-800 text-white'
                  : 'bg-white text-cyan-800 border-2 border-[#C9E4E7] hover:bg-[#C9E4E7]'
                }`}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryFilter;

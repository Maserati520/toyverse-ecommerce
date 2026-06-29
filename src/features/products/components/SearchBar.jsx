import { useState, useEffect } from 'react';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-cyan-600 shrink-0">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
  </svg>
);

const SearchBar = ({ value, onChange }) => {
  const [draft, setDraft] = useState(value);

  // Sync if parent resets the value (e.g. on category change)
  useEffect(() => { setDraft(value); }, [value]);

  // Debounce: notify parent 400ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => onChange(draft), 400);
    return () => clearTimeout(timer);
  }, [draft, onChange]);

  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Search toys…"
        aria-label="Search products"
        className="w-full h-10 rounded-2xl border-2 border-[#C9E4E7] bg-white pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#ACECF7] transition-colors duration-200"
      />
    </div>
  );
};

export default SearchBar;

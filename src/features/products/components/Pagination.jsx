import { LIMIT } from '../api';

const Pagination = ({ page, total, onChange }) => {
  const totalPages = Math.ceil(total / LIMIT);
  if (totalPages <= 1) return null;

  // Show at most 5 page numbers centred around current page
  const delta = 2;
  const start = Math.max(1, page - delta);
  const end = Math.min(totalPages, page + delta);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const btn = 'h-9 min-w-[2.25rem] rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600';
  const active = 'bg-cyan-800 text-white';
  const idle = 'bg-white border-2 border-[#C9E4E7] text-cyan-800 hover:bg-[#C9E4E7]';
  const disabled = 'bg-white border-2 border-[#C9E4E7] text-gray-300 cursor-not-allowed';

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-10 flex-wrap">
      {/* Prev */}
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${btn} px-3 ${page === 1 ? disabled : idle}`}
      >
        ‹
      </button>

      {/* First page + ellipsis */}
      {start > 1 && (
        <>
          <button type="button" onClick={() => onChange(1)} className={`${btn} px-3 ${idle}`}>1</button>
          {start > 2 && <span className="text-gray-400 px-1 text-sm">…</span>}
        </>
      )}

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
          className={`${btn} px-3 ${p === page ? active : idle}`}
        >
          {p}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-gray-400 px-1 text-sm">…</span>}
          <button type="button" onClick={() => onChange(totalPages)} className={`${btn} px-3 ${idle}`}>{totalPages}</button>
        </>
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${btn} px-3 ${page === totalPages ? disabled : idle}`}
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;

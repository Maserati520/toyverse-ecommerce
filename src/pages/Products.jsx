import { useState } from 'react';
import { useProductsFiltered } from '../features/products/hooks';
import ProductCard from '../features/products/components/ProductCard';
import SearchBar from '../features/products/components/SearchBar';
import CategoryFilter from '../features/products/components/CategoryFilter';
import Pagination from '../features/products/components/Pagination';

/* ── Skeleton card ── */
const SkeletonCard = () => (
  <div className="flex flex-col rounded-2xl bg-white overflow-hidden shadow-md animate-pulse">
    <div className="h-52 bg-[#C9E4E7]/60" />
    <div className="flex flex-col gap-3 p-4">
      <div className="h-3 w-1/3 rounded-full bg-gray-200" />
      <div className="h-4 w-full rounded-full bg-gray-100" />
      <div className="h-4 w-4/5 rounded-full bg-gray-100" />
      <div className="h-7 w-1/3 rounded-xl bg-[#ACECF7]/50 mt-1" />
      <div className="mt-2 flex flex-col gap-2">
        <div className="h-10 rounded-2xl bg-[#C9E4E7]/50" />
        <div className="h-10 rounded-2xl bg-[#ACECF7]/40" />
      </div>
    </div>
  </div>
);

/* ── Page header ── */
const PageHeader = () => (
  <header className="mb-8 text-center">
    <div className="flex items-center justify-center gap-2 mb-3 select-none" aria-hidden="true">
      <span className="text-2xl">⭐</span>
      <span className="text-3xl">🧸</span>
      <span className="text-2xl">⭐</span>
    </div>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-900 tracking-tight">
      Explore ToyVerse
    </h1>
    <p className="mt-2 text-sm sm:text-base text-cyan-800 font-medium">
      Discover amazing toys for every little adventurer
    </p>
    <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-[#ACECF7]" />
  </header>
);

/* ── Products page ── */
const Products = () => {
  // UI state — lives here, never in TanStack Query
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useProductsFiltered({ page, category, search });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;

  // Reset to page 1 whenever filter/search changes
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleCategory = (val) => { setCategory(val); setSearch(''); setPage(1); };
  const handlePage = (val) => { setPage(val); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader />

      {/* ── Controls bar ── */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <SearchBar value={search} onChange={handleSearch} />
          {/* Result count */}
          {!isLoading && (
            <p className="text-xs text-cyan-800 font-medium shrink-0">
              {total} {total === 1 ? 'product' : 'products'} found
            </p>
          )}
        </div>
        <CategoryFilter value={category} onChange={handleCategory} />
      </div>

      {/* ── States ── */}
      {isError && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <span className="text-6xl" role="img" aria-label="warning">⚠️</span>
          <h2 className="text-xl font-bold text-red-600">Oops! Something went wrong</h2>
          <p className="max-w-sm text-sm text-gray-500">{error.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-10 rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200 cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading: show skeletons; isFetching dims the existing grid instead */}
      {isLoading ? (
        <section aria-label="Loading products" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </section>
      ) : !isError && products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-6xl" role="img" aria-label="empty box">📦</span>
          <h2 className="text-xl font-bold text-cyan-900">No toys found</h2>
          <p className="text-sm text-gray-500">
            {search ? `No results for "${search}". Try a different search.` : 'Check back soon for new arrivals!'}
          </p>
          {(search || category) && (
            <button
              type="button"
              onClick={() => { handleSearch(''); handleCategory(''); }}
              className="mt-1 h-10 rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        /* Dim grid while paginating / re-fetching */
        <section
          aria-label="Product listing"
          aria-busy={isFetching}
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-opacity duration-200 ${isFetching ? 'opacity-60' : 'opacity-100'}`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <Pagination page={page} total={total} onChange={handlePage} />
    </main>
  );
};

export default Products;

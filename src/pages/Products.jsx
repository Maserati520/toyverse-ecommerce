import { useProducts } from '../features/products/hooks';
import ProductCard from '../features/products/components/ProductCard';

/* ── Skeleton card shown while loading ── */
const SkeletonCard = () => (
  <div className="flex flex-col rounded-3xl bg-white border border-[#C9E4E7] overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-square bg-[#C9E4E7]/50" />
    <div className="flex flex-col gap-3 p-4">
      <div className="h-3 w-1/3 rounded-full bg-[#C9E4E7]" />
      <div className="h-4 w-full rounded-full bg-gray-100" />
      <div className="h-4 w-4/5 rounded-full bg-gray-100" />
      <div className="h-6 w-1/4 rounded-full bg-[#ACECF7]/60 mt-1" />
      <div className="mt-1 flex flex-col gap-2">
        <div className="h-10 rounded-xl bg-[#C9E4E7]/40" />
        <div className="h-10 rounded-xl bg-[#ACECF7]/40" />
      </div>
    </div>
  </div>
);

/* ── Page header ── */
const PageHeader = () => (
  <header className="mb-8 text-center">
    <p className="text-4xl mb-2" role="img" aria-label="toy rocket">🚀</p>
    <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-900 tracking-tight">
      Explore ToyVerse
    </h1>
    <p className="mt-2 text-sm text-cyan-700">
      Discover amazing toys for every adventurer
    </p>
  </header>
);

const Products = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading)
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHeader />
        <section aria-label="Loading products" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </section>
      </main>
    );

  if (isError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-5xl" role="img" aria-label="warning">⚠️</p>
        <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
        <p className="max-w-sm text-sm text-gray-500">{error.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-2 rounded-xl bg-[#ACECF7] px-6 py-2.5 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors"
        >
          Try Again
        </button>
      </main>
    );

  if (!products?.length)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-5xl" role="img" aria-label="empty box">📦</p>
        <h2 className="text-xl font-bold text-cyan-900">No toys found</h2>
        <p className="text-sm text-gray-500">Check back later for new arrivals!</p>
      </main>
    );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader />
      <section
        aria-label="Product listing"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Products;

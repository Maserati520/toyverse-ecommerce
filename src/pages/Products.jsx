import { useProducts } from '../features/products/hooks';
import ProductCard from '../features/products/components/ProductCard';

/* ── Skeleton: mirrors the real card structure exactly ── */
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
  <header className="mb-10 text-center">
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

/* ── Grid wrapper shared by loading + success states ── */
const ProductGrid = ({ children, label }) => (
  <section
    aria-label={label}
    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    {children}
  </section>
);

const Products = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading)
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <PageHeader />
        <ProductGrid label="Loading products">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ProductGrid>
      </main>
    );

  if (isError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="warning sign">⚠️</span>
        <h2 className="text-xl font-bold text-red-600">Oops! Something went wrong</h2>
        <p className="max-w-sm text-sm text-gray-500">{error.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-2 h-10 rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200 cursor-pointer"
        >
          Try Again
        </button>
      </main>
    );

  if (!products?.length)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="empty box">📦</span>
        <h2 className="text-xl font-bold text-cyan-900">No toys found yet!</h2>
        <p className="text-sm text-gray-500">Check back soon for exciting new arrivals.</p>
      </main>
    );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <PageHeader />
      <ProductGrid label="Product listing">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </main>
  );
};

export default Products;

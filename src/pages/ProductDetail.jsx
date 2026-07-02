import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../features/products/hooks';
import { useAddToCart } from '../features/cart/hooks';

/* ── Star rating display ── */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
      <span className="ml-1 text-sm font-semibold text-cyan-900">{rating}</span>
    </span>
  );
};

/* ── Stock indicator ── */
const StockBadge = ({ stock }) => {
  if (stock === 0)
    return <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Out of Stock</span>;
  if (stock <= 10)
    return <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Only {stock} left!</span>;
  return <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">In Stock ({stock})</span>;
};

/* ── Skeleton loader ── */
const Skeleton = () => (
  <main className="mx-auto max-w-5xl px-4 py-10 animate-pulse">
    <div className="h-5 w-32 rounded-full bg-[#C9E4E7] mb-8" />
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-2/5 h-80 rounded-2xl bg-[#C9E4E7]/60" />
      <div className="flex flex-col flex-1 gap-4">
        <div className="h-4 w-1/4 rounded-full bg-gray-200" />
        <div className="h-7 w-3/4 rounded-full bg-gray-300" />
        <div className="h-4 w-full rounded-full bg-gray-200" />
        <div className="h-4 w-5/6 rounded-full bg-gray-200" />
        <div className="h-8 w-1/4 rounded-xl bg-[#ACECF7]/60 mt-2" />
        <div className="h-10 rounded-2xl bg-[#ACECF7]/40 mt-4" />
        <div className="h-10 rounded-2xl bg-[#C9E4E7]/50" />
      </div>
    </div>
  </main>
);

/* ── Cart SVG icon ── */
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
  </svg>
);

/* ── Page ── */
const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const addToCart = useAddToCart();

  if (isLoading) return <Skeleton />;

  if (isError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="warning">⚠️</span>
        <h2 className="text-xl font-bold text-red-600">Could not load product</h2>
        <p className="max-w-sm text-sm text-gray-500">{error.message}</p>
        <Link
          to="/products"
          className="mt-2 h-10 flex items-center rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200"
        >
          Back to Products
        </Link>
      </main>
    );

  if (!product)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="empty box">📦</span>
        <h2 className="text-xl font-bold text-cyan-900">Product not found</h2>
        <Link to="/products" className="text-sm font-semibold text-cyan-700 underline underline-offset-4">
          Back to Products
        </Link>
      </main>
    );

  const { title, description, price, category, brand, rating, stock, images, thumbnail } = product;
  const heroImage = images?.[0] ?? thumbnail;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      {/* Back link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-800 hover:text-cyan-900 transition-colors duration-200 mb-8 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        Back to Products
      </Link>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-md p-6 md:p-10">

        {/* ── Image panel ── */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <div className="rounded-2xl bg-[#C9E4E7]/30 flex items-center justify-center p-6 h-72 md:h-96">
            <img
              src={heroImage}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>
          {/* Thumbnail strip — show extras if available */}
          {images?.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.slice(0, 5).map((src, i) => (
                <div key={i} className="h-16 w-16 shrink-0 rounded-xl bg-[#C9E4E7]/30 flex items-center justify-center p-1.5 border-2 border-transparent hover:border-[#ACECF7] transition-colors cursor-pointer">
                  <img src={src} alt={`${title} view ${i + 1}`} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Info panel ── */}
        <div className="flex flex-col flex-1 gap-3">

          {/* Category + Brand */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#ACECF7] px-3 py-1 text-xs font-semibold text-cyan-900 capitalize">
              {category}
            </span>
            {brand && (
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                {brand}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
            {title}
          </h1>

          {/* Rating */}
          {rating != null && (
            <div className="text-amber-400 text-lg">
              <StarRating rating={rating} />
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          )}

          {/* Price */}
          <div className="mt-2">
            <span className="inline-block rounded-2xl bg-[#ACECF7] px-5 py-2 text-2xl font-extrabold text-cyan-900">
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Stock */}
          {stock != null && (
            <div>
              <StockBadge stock={stock} />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              aria-label={`Add ${title} to cart`}
              disabled={stock === 0 || addToCart.isPending}
              onClick={() => addToCart.mutate({ id: product.id, title, price, thumbnail })}
              className="flex items-center justify-center gap-2 flex-1 h-11 rounded-2xl bg-[#ACECF7] text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <CartIcon />
              {addToCart.isPending ? 'Adding…' : 'Add to Cart'}
            </button>
            <Link
              to="/products"
              className="flex items-center justify-center flex-1 h-11 rounded-2xl border-2 border-[#C9E4E7] bg-white text-sm font-semibold text-cyan-800 hover:bg-[#C9E4E7] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Back to Products
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

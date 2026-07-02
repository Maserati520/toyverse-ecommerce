import { Link } from 'react-router-dom';
import { useAddToCart } from '../../cart/hooks';

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-4 w-4 shrink-0"
  >
    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
  </svg>
);

const AddToCartButton = ({ product }) => {
  const { mutate, isPending } = useAddToCart();
  return (
    <button
      type="button"
      aria-label={`Add ${product.title} to cart`}
      disabled={isPending}
      onClick={() => mutate(product)}
      className="flex items-center justify-center gap-2 w-full h-10 rounded-2xl bg-[#ACECF7] text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CartIcon />
      {isPending ? 'Adding…' : 'Add to Cart'}
    </button>
  );
};

const ProductCard = ({ product }) => {
  const { id, title, price, brand, category, thumbnail } = product;

  return (
    <article className="group flex flex-col rounded-2xl bg-white overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

      {/* ── Image zone ── */}
      <div className="relative h-52 bg-gray-50 overflow-hidden flex items-center justify-center p-3">
        <img
          src={thumbnail}
          alt={`${title} by ${brand}`}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full bg-[#ACECF7] px-3 py-1 text-xs font-semibold text-cyan-900 capitalize tracking-wide shadow-sm">
          {category}
        </span>
      </div>

      {/* ── Content zone ── */}
      <div className="flex flex-col flex-1 gap-2 p-4">

        {/* Brand */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest truncate">
          {brand}
        </p>

        {/* Title */}
        <h2 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
          {title}
        </h2>

        {/* Price badge */}
        <div className="mt-1">
          <span className="inline-block rounded-xl bg-[#ACECF7] px-3 py-1 text-base font-extrabold text-cyan-900">
            ${price.toFixed(2)}
          </span>
        </div>

        {/* ── Buttons ── */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <Link
            to={`/products/${id}`}
            aria-label={`View details for ${title}`}
            className="flex items-center justify-center w-full h-10 rounded-2xl border-2 border-[#C9E4E7] bg-white text-sm font-semibold text-cyan-800 hover:bg-[#C9E4E7] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            View Details
          </Link>
          <AddToCartButton product={{ id, title, price, thumbnail }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

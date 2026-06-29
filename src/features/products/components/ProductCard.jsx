import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, price, brand, category, thumbnail } = product;

  return (
    <article className="group flex flex-col rounded-3xl bg-white overflow-hidden shadow-sm border border-[#C9E4E7] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#C9E4E7]/30 aspect-square">
        <img
          src={thumbnail}
          alt={`${title} — ${brand}`}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category badge */}
        <span
          aria-label={`Category: ${category}`}
          className="absolute top-3 left-3 rounded-full bg-[#ACECF7] px-3 py-1 text-xs font-semibold text-cyan-900 capitalize shadow-sm"
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1 p-4">
        <p className="text-xs font-medium text-cyan-700 uppercase tracking-wider">
          {brand}
        </p>
        <h2 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
          {title}
        </h2>

        <p className="mt-2 text-xl font-extrabold text-cyan-900">
          ${price.toFixed(2)}
        </p>

        {/* Buttons */}
        <div className="mt-3 flex flex-col gap-2">
          <Link
            to={`/products/${id}`}
            aria-label={`View details for ${title}`}
            className="w-full rounded-xl border-2 border-[#C9E4E7] bg-white px-4 py-2.5 text-center text-sm font-semibold text-cyan-800 hover:bg-[#C9E4E7] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            View Details
          </Link>
          <button
            type="button"
            aria-label={`Add ${title} to cart`}
            className="w-full rounded-xl bg-[#ACECF7] px-4 py-2.5 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

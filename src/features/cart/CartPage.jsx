import { Link } from 'react-router-dom';
import { useCart } from './hooks';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const CartPage = () => {
  const { data: items = [], isLoading } = useCart();

  if (isLoading)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10 animate-pulse">
        <div className="h-8 w-40 rounded-full bg-[#C9E4E7] mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
          <div className="w-full lg:w-72 h-64 rounded-2xl bg-white shadow-sm" />
        </div>
      </main>
    );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-900">🛒 Your Cart</h1>
        <Link
          to="/products"
          className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 transition-colors"
        >
          ← Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <span className="text-6xl" role="img" aria-label="empty cart">🛒</span>
          <h2 className="text-xl font-bold text-cyan-900">Your cart is empty</h2>
          <p className="text-sm text-gray-500">Add some toys to get started!</p>
          <Link
            to="/products"
            className="mt-2 h-10 flex items-center rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200"
          >
            Browse Toys
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Item list */}
          <section aria-label="Cart items" className="flex-1">
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </section>

          {/* Summary sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <CartSummary items={items} />
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;

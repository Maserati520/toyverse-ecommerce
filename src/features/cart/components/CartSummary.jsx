import { Link } from 'react-router-dom';
import { useClearCart } from '../hooks';

const CartSummary = ({ items }) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const clear = useClearCart();

  return (
    <aside className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 h-fit">
      <h2 className="text-lg font-extrabold text-cyan-900">Order Summary</h2>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <dt>Items ({itemCount})</dt>
          <dd className="font-semibold text-gray-800">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between text-gray-600">
          <dt>Shipping</dt>
          <dd className="font-semibold text-gray-800">
            {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
          </dd>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-cyan-700">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </p>
        )}
        <div className="border-t border-[#C9E4E7] pt-2 flex justify-between font-extrabold text-cyan-900 text-base">
          <dt>Total</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>

      <Link
        to="/checkout"
        className="flex items-center justify-center h-11 rounded-2xl bg-[#ACECF7] text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        Proceed to Checkout
      </Link>

      <button
        type="button"
        onClick={() => clear.mutate()}
        disabled={clear.isPending}
        className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {clear.isPending ? 'Clearing…' : 'Clear Cart'}
      </button>
    </aside>
  );
};

export default CartSummary;

import { useParams, Link } from 'react-router-dom';
import { useOrder } from './hooks';

const statusColors = {
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError, error } = useOrder(id);

  if (isLoading)
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 animate-pulse">
        <div className="h-8 w-56 rounded-full bg-[#C9E4E7] mb-8" />
        <div className="h-64 rounded-2xl bg-white shadow-sm" />
      </main>
    );

  if (isError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="warning">⚠️</span>
        <h2 className="text-xl font-bold text-red-600">Order not found</h2>
        <p className="text-sm text-gray-500">{error.message}</p>
        <Link to="/orders" className="h-10 flex items-center rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors">
          Back to Orders
        </Link>
      </main>
    );

  const { customer } = order;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      {/* Success banner — shown right after checkout */}
      <div className="mb-8 rounded-2xl bg-green-50 border border-green-200 p-5 flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label="success">🎉</span>
        <div>
          <p className="font-bold text-green-800">Order placed successfully!</p>
          <p className="text-sm text-green-700 mt-0.5">
            Thank you, {customer.firstName}! We'll get your toys packed right away.
          </p>
        </div>
      </div>

      {/* Order header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-cyan-900">Order #{order.id}</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <span className={`rounded-full px-4 py-1.5 text-xs font-semibold ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
          {order.status}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Items */}
        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-sm font-extrabold text-cyan-900 mb-4">Items Ordered</h2>
          <ul className="flex flex-col gap-3">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-[#C9E4E7]/30 flex items-center justify-center p-1.5">
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-400">×{item.quantity} · ${item.price.toFixed(2)} each</p>
                </div>
                <span className="text-sm font-bold text-cyan-900 shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <div className="border-t border-[#C9E4E7] mt-4 pt-4 flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span className="font-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold">{order.shipping === 0 ? <span className="text-green-600">Free</span> : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-extrabold text-cyan-900 text-base pt-1">
              <span>Total</span><span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Shipping address */}
        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-sm font-extrabold text-cyan-900 mb-3">Shipping To</h2>
          <address className="not-italic text-sm text-gray-600 leading-relaxed">
            {customer.firstName} {customer.lastName}<br />
            {customer.address}<br />
            {customer.city}, {customer.zip}<br />
            {customer.country}
          </address>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/orders"
            className="flex-1 flex items-center justify-center h-10 rounded-2xl border-2 border-[#C9E4E7] bg-white text-sm font-semibold text-cyan-800 hover:bg-[#C9E4E7] transition-colors"
          >
            View All Orders
          </Link>
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center h-10 rounded-2xl bg-[#ACECF7] text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailPage;

import { Link } from 'react-router-dom';
import { useOrders } from './hooks';

const statusColors = {
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError, error } = useOrders();

  if (isLoading)
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 animate-pulse">
        <div className="h-8 w-48 rounded-full bg-[#C9E4E7] mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-white shadow-sm mb-4" />
        ))}
      </main>
    );

  if (isError)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="warning">⚠️</span>
        <h2 className="text-xl font-bold text-red-600">Could not load orders</h2>
        <p className="text-sm text-gray-500">{error.message}</p>
      </main>
    );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-cyan-900 mb-8">📦 Order History</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <span className="text-6xl" role="img" aria-label="no orders">🧸</span>
          <h2 className="text-xl font-bold text-cyan-900">No orders yet</h2>
          <p className="text-sm text-gray-500">Your completed orders will appear here.</p>
          <Link
            to="/products"
            className="mt-2 h-10 flex items-center rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 font-medium">
                    {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm font-bold text-gray-800">Order #{order.id}</p>
                  <p className="text-xs text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                  <span className="text-base font-extrabold text-cyan-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default OrdersPage;

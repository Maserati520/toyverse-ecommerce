import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../cart/hooks';
import { usePlaceOrder } from './hooks';

const EMPTY_FORM = {
  firstName: '', lastName: '', email: '',
  address: '', city: '', zip: '', country: '',
};

const Field = ({ label, id, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-xs font-semibold text-cyan-800 uppercase tracking-wide">
      {label}
    </label>
    <input
      id={id}
      className={`h-10 rounded-xl border-2 px-3 text-sm text-gray-700 bg-white focus:outline-none transition-colors duration-200
        ${error ? 'border-red-400 focus:border-red-500' : 'border-[#C9E4E7] focus:border-[#ACECF7]'}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { data: items = [] } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const placeOrder = usePlaceOrder({
    onSuccess: (order) => navigate(`/orders/${order.id}`),
    onError: (err) => setServerError(err.message ?? 'Order failed. Please try again.'),
  });

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    if (!form.country.trim()) e.country = 'Required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setServerError('');
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    placeOrder.mutate(form);
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  if (!items.length)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-6xl" role="img" aria-label="empty cart">🛒</span>
        <h2 className="text-xl font-bold text-cyan-900">Your cart is empty</h2>
        <Link to="/products" className="h-10 flex items-center rounded-2xl bg-[#ACECF7] px-6 text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] transition-colors">
          Browse Toys
        </Link>
      </main>
    );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-cyan-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col gap-6">

          {/* Customer info */}
          <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-cyan-900">Customer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" id="firstName" value={form.firstName} onChange={set('firstName')} error={errors.firstName} autoComplete="given-name" />
              <Field label="Last Name" id="lastName" value={form.lastName} onChange={set('lastName')} error={errors.lastName} autoComplete="family-name" />
            </div>
            <Field label="Email" id="email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
          </section>

          {/* Shipping info */}
          <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-base font-extrabold text-cyan-900">Shipping Address</h2>
            <Field label="Street Address" id="address" value={form.address} onChange={set('address')} error={errors.address} autoComplete="street-address" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Field label="City" id="city" value={form.city} onChange={set('city')} error={errors.city} autoComplete="address-level2" />
              </div>
              <Field label="ZIP / Postal" id="zip" value={form.zip} onChange={set('zip')} error={errors.zip} autoComplete="postal-code" />
              <Field label="Country" id="country" value={form.country} onChange={set('country')} error={errors.country} autoComplete="country-name" />
            </div>
          </section>

          {serverError && (
            <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={placeOrder.isPending}
            className="h-12 rounded-2xl bg-[#ACECF7] text-sm font-semibold text-cyan-900 hover:bg-[#C9E4E7] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            {placeOrder.isPending ? 'Placing Order…' : 'Place Order'}
          </button>
        </form>

        {/* ── Order summary sidebar ── */}
        <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 h-fit">
          <h2 className="text-base font-extrabold text-cyan-900">Order Summary</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-[#C9E4E7]/30 flex items-center justify-center p-1">
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-400">×{item.quantity}</p>
                </div>
                <span className="text-xs font-bold text-cyan-900 shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#C9E4E7] pt-3 flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-extrabold text-cyan-900 text-base pt-1">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;

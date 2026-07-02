import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../features/cart/hooks';

const Navbar = () => {
  const { data: items = [] } = useCart();
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-cyan-900' : 'text-cyan-700 hover:text-cyan-900'}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#C9E4E7] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/products" className="flex items-center gap-2 font-extrabold text-cyan-900 text-lg">
          <span aria-hidden="true">🧸</span> ToyVerse
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink to="/products" className={linkClass}>Shop</NavLink>
          <NavLink to="/orders" className={linkClass}>Orders</NavLink>

          {/* Cart icon with badge */}
          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            className="relative text-cyan-700 hover:text-cyan-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-cyan-800 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

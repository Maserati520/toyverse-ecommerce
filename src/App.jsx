import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './features/cart/CartPage';
import CheckoutPage from './features/checkout/CheckoutPage';
import OrdersPage from './features/orders/OrdersPage';
import OrderDetailPage from './features/orders/OrderDetailPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
      </Routes>
    </>
  );
}

export default App;

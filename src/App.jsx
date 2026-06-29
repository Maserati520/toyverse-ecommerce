import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;

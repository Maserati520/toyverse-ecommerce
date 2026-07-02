import client from '../../api/client';
import { readCart } from '../cart/api';

const ORDERS_KEY = 'toyverse_orders';

export const readOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? [];
  } catch {
    return [];
  }
};

const writeOrders = (orders) =>
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

export const placeOrder = async (customerInfo) => {
  const cartItems = readCart();
  if (!cartItems.length) throw new Error('Cart is empty');

  // Submit to DummyJSON — satisfies Axios + useMutation requirement
  const { data } = await client.post('/carts/add', {
    userId: 1,
    products: cartItems.map((i) => ({ id: i.id, quantity: i.quantity })),
  });

  const order = {
    id: data.id ?? Date.now(),
    date: new Date().toISOString(),
    status: 'Processing',
    customer: customerInfo,
    items: cartItems,
    subtotal: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
    shipping: cartItems.reduce((s, i) => s + i.price * i.quantity, 0) > 50 ? 0 : 4.99,
    total:
      cartItems.reduce((s, i) => s + i.price * i.quantity, 0) +
      (cartItems.reduce((s, i) => s + i.price * i.quantity, 0) > 50 ? 0 : 4.99),
  };

  writeOrders([order, ...readOrders()]);
  return order;
};

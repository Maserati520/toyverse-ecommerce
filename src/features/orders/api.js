import { readOrders } from '../checkout/api';

export const fetchOrders = () => readOrders();

export const fetchOrderById = (id) => {
  const orders = readOrders();
  const order = orders.find((o) => String(o.id) === String(id));
  if (!order) throw new Error(`Order #${id} not found`);
  return order;
};

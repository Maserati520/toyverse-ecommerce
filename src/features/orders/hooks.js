import { useQuery } from '@tanstack/react-query';
import { fetchOrders, fetchOrderById } from './api';

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

export const useOrder = (id) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
  });

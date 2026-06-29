import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from './api';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

import { useQuery } from '@tanstack/react-query';
import { fetchProductsFiltered, fetchProductById, fetchCategories } from './api';

export const useProductsFiltered = ({ page, category, search }) =>
  useQuery({
    queryKey: ['products', { page, category, search }],
    queryFn: () => fetchProductsFiltered({ page, category, search }),
    placeholderData: (prev) => prev, // keeps stale data visible while next page loads
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity, // categories never change at runtime
  });

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from './api';

const CART_KEY = ['cart'];

export const useCart = () =>
  useQuery({
    queryKey: CART_KEY,
    queryFn: fetchCart,
  });

const mutationOptions = (queryClient, onSuccess) => ({
  onSuccess: (data) => {
    queryClient.setQueryData(CART_KEY, data); // instant optimistic update
    onSuccess?.(data);
  },
  onError: () => {
    queryClient.invalidateQueries({ queryKey: CART_KEY }); // re-sync on error
  },
});

export const useAddToCart = (callbacks) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    ...mutationOptions(queryClient, callbacks?.onSuccess),
  });
};

export const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuantity,
    ...mutationOptions(queryClient),
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    ...mutationOptions(queryClient),
  });
};

export const useClearCart = (callbacks) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    ...mutationOptions(queryClient, callbacks?.onSuccess),
  });
};

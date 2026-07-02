import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeOrder } from './api';

export const usePlaceOrder = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: (order) => {
      // Clear cart from query cache and localStorage
      queryClient.setQueryData(['cart'], []);
      localStorage.removeItem('toyverse_cart');
      // Invalidate orders so the list refreshes
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onSuccess?.(order);
    },
    onError,
  });
};

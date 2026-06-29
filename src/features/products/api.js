import client from '../../api/client';

export const fetchProducts = async () => {
  const { data } = await client.get('/products?limit=30');
  return data.products;
};

export const fetchProductById = async (id) => {
  const { data } = await client.get(`/products/${id}`);
  return data;
};

import client from '../../api/client';

const LIMIT = 12;

export const fetchProductById = async (id) => {
  const { data } = await client.get(`/products/${id}`);
  return data;
};

/**
 * Unified fetch: routes to search, category, or base endpoint.
 * Returns { products, total }.
 */
export const fetchProductsFiltered = async ({ page = 1, category = '', search = '' }) => {
  const skip = (page - 1) * LIMIT;

  if (search.trim()) {
    const { data } = await client.get('/products/search', {
      params: { q: search.trim(), limit: LIMIT, skip },
    });
    return { products: data.products, total: data.total };
  }

  if (category) {
    const { data } = await client.get(`/products/category/${category}`, {
      params: { limit: LIMIT, skip },
    });
    return { products: data.products, total: data.total };
  }

  const { data } = await client.get('/products', {
    params: { limit: LIMIT, skip },
  });
  return { products: data.products, total: data.total };
};

export const fetchCategories = async () => {
  const { data } = await client.get('/products/categories');
  return data; // [{ slug, name, url }]
};

export { LIMIT };

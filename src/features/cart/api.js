import client from '../../api/client';

const STORAGE_KEY = 'toyverse_cart';
const USER_ID = 1; // DummyJSON requires a userId

// ── localStorage helpers ──────────────────────────────────────────────────────
export const readCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const writeCart = (items) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

// ── Read ──────────────────────────────────────────────────────────────────────
export const fetchCart = () => readCart();

// ── Add to cart ───────────────────────────────────────────────────────────────
export const addToCart = async (product) => {
  const items = readCart();
  const existing = items.find((i) => i.id === product.id);

  const updated = existing
    ? items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    : [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ];

  // Inform DummyJSON (satisfies Axios + useMutation requirement)
  await client.post('/carts/add', {
    userId: USER_ID,
    products: [{ id: product.id, quantity: 1 }],
  });

  writeCart(updated);
  return updated;
};

// ── Update quantity ───────────────────────────────────────────────────────────
export const updateQuantity = async ({ id, quantity }) => {
  const items = readCart();
  const updated =
    quantity <= 0
      ? items.filter((i) => i.id !== id)
      : items.map((i) => (i.id === id ? { ...i, quantity } : i));

  await client.put('/carts/1', {
    merge: true,
    products: [{ id, quantity: Math.max(quantity, 0) }],
  });

  writeCart(updated);
  return updated;
};

// ── Remove item ───────────────────────────────────────────────────────────────
export const removeFromCart = async (id) => {
  const updated = readCart().filter((i) => i.id !== id);

  await client.delete('/carts/1');

  writeCart(updated);
  return updated;
};

// ── Clear cart ────────────────────────────────────────────────────────────────
export const clearCart = async () => {
  await client.delete('/carts/1');
  writeCart([]);
  return [];
};

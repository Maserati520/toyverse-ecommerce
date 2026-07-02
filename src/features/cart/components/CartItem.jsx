import { useUpdateQuantity, useRemoveFromCart } from '../hooks';

const CartItem = ({ item }) => {
  const update = useUpdateQuantity();
  const remove = useRemoveFromCart();
  const busy = update.isPending || remove.isPending;

  return (
    <li className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
      {/* Thumbnail */}
      <div className="h-20 w-20 shrink-0 rounded-xl bg-[#C9E4E7]/30 flex items-center justify-center p-2">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug">
          {item.title}
        </p>
        <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>

        {/* Quantity controls */}
        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={busy}
            onClick={() => update.mutate({ id: item.id, quantity: item.quantity - 1 })}
            className="h-7 w-7 rounded-full bg-[#C9E4E7] text-cyan-900 font-bold text-base flex items-center justify-center hover:bg-[#ACECF7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold text-gray-800">
            {item.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={busy}
            onClick={() => update.mutate({ id: item.id, quantity: item.quantity + 1 })}
            className="h-7 w-7 rounded-full bg-[#C9E4E7] text-cyan-900 font-bold text-base flex items-center justify-center hover:bg-[#ACECF7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Right side: line total + remove */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-base font-extrabold text-cyan-900">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          disabled={busy}
          onClick={() => remove.mutate(item.id)}
          className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;

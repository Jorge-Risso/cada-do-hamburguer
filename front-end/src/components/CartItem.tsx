import { Minus, Plus, Trash } from "lucide-react";
import { formatterPrice } from "../utils/formatterPrice";

type CartItemProps = {
  title: string;
  quantity: number;
  price: number;
  imgUrl: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartItem = ({
  title,
  quantity,
  price,
  imgUrl,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#d4af69]/10 bg-[#2a211e] p-3">
      <img
        src={imgUrl}
        alt={title}
        className="h-[90px] w-[90px] rounded-xl object-cover sm:h-25 sm:w-25"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-bold uppercase tracking-wide text-[#f4eadf]">
          {title}
        </p>
        <p className="mt-1 font-bold text-[#d0b998]">
          {formatterPrice(price * quantity)}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[#f4eadf]">
          <button
            type="button"
            onClick={onDecrease}
            aria-label="Diminuir quantidade"
            className="rounded-md border border-[#d4af69]/20 bg-[#1b1413] p-1.5 transition hover:border-[#d4af69]/40 hover:text-[#d4af69]"
          >
            <Minus size={14} className="cursor-pointer" />
          </button>
          <p className="min-w-4 text-center text-sm font-medium">{quantity}</p>
          <button
            type="button"
            onClick={onIncrease}
            aria-label="Aumentar quantidade"
            className="rounded-md border border-[#d4af69]/20 bg-[#1b1413] p-1.5 transition hover:border-[#d4af69]/40 hover:text-[#d4af69]"
          >
            <Plus size={14} className="cursor-pointer" />
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label="Remover item"
        onClick={onRemove}
        className="rounded-md p-2 text-[#f26d6d] transition hover:bg-[#f26d6d]/10 hover:text-[#ff8a8a]"
      >
        <Trash size={18} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default CartItem;

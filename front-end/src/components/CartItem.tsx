import { Minus, Plus, Trash } from "lucide-react";

const CartItem = () => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#d4af69]/10 bg-[#2a211e] p-3">
      <img
        src="./duplo-da-casa.png"
        alt="Duplo da Casa"
        className="w-[100px] rounded-xl object-cover"
      />
      <div className="flex-1">
        <p className="font-bold uppercase tracking-wide text-[#f4eadf]">
          Duplo da Casa
        </p>
        <p className="mt-1 font-bold text-[#d0b998]">R$ 29,90</p>
        <div className="mt-2 flex items-center gap-3 text-[#f4eadf]">
          <button
            type="button"
            className="rounded-md border border-[#d4af69]/20 bg-[#1b1413] p-1 transition hover:border-[#d4af69]/40"
          >
            <Minus size={14} className="cursor-pointer" />
          </button>
          <p className="min-w-4 text-center text-sm font-medium">2</p>
          <button
            type="button"
            className="rounded-md border border-[#d4af69]/20 bg-[#1b1413] p-1 transition hover:border-[#d4af69]/40"
          >
            <Plus size={14} className="cursor-pointer" />
          </button>
        </div>
      </div>
      <button
        type="button"
        aria-label="Remover item"
        className="rounded-md p-2 text-[#f26d6d] transition hover:bg-[#f26d6d]/10 hover:text-[#ff8a8a]"
      >
        <Trash size={18} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default CartItem;

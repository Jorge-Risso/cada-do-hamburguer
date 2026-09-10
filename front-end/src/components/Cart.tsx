import { X } from "lucide-react";
import CartItem from "./CartItem";

type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
  closeCart: () => void;
};

const Cart = ({ closeCart }: CartTypeProps) => {
  return (
    <div className="flex h-screen w-[375px] flex-col bg-[#1C1715] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.45)] ring-1 ring-[#d4af69]/20">
      <div className="flex items-center justify-between border-b border-[#d4af69]/15 pb-4">
        <button type="button" onClick={closeCart} aria-label="Fechar carrinho">
          <X className="cursor-pointer text-[#f4eadf] transition hover:text-[#d4af69]" />
        </button>
        <p className="font-bold uppercase tracking-[0.22em] text-[#f4eadf]">
          Meu carrinho
        </p>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#1b1413] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4af69]/70 [&::-webkit-scrollbar-thumb:hover]:bg-[#d4af69]">
        <div className="space-y-4">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>

      <div className="mt-4 border-t border-[#d4af69]/15 pt-4">
        <div className="mb-3 flex items-center justify-between text-sm text-[#d0b998]">
          <span>Subtotal</span>
          <span className="font-semibold text-[#f4eadf]">R$ 59,80</span>
        </div>
        <button className="mt-auto w-full rounded-xl bg-[#D4AF69] p-3 font-bold text-[#1A1413] shadow-lg shadow-[#d4af69]/20 transition hover:bg-[#c79a4b] hover:shadow-[#d4af69]/30">
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;

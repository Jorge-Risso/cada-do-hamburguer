import { X } from "lucide-react";
import CartItem from "./CartItem";
import { useContext } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { formatterPrice } from "../utils/formatterPrice";

type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
  closeCart: () => void;
};

const Cart = ({ closeCart }: CartTypeProps) => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  const updateItemQuantity = async (itemId: number, nextQuantity: number) => {
    if (nextQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/cart-items/update-quantity",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ itemId, quantity: nextQuantity }),
        },
      );

      if (!response.ok) {
        console.error(
          "Erro ao atualizar quantidade do carrinho:",
          response.statusText,
        );
        return;
      }

      const updatedItem = await response.json();

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: updatedItem.quantity }
            : item,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade do carrinho:", error);
    }
  };

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
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              title={item.product.name}
              quantity={item.quantity}
              price={item.product.price}
              imgUrl={item.product.img}
              onIncrease={() => updateItemQuantity(item.id, item.quantity + 1)}
              onDecrease={() => updateItemQuantity(item.id, item.quantity - 1)}
              onRemove={() => updateItemQuantity(item.id, 0)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-[#d4af69]/15 pt-4">
        <div className="mb-3 flex items-center justify-between text-sm text-[#d0b998]">
          <span>Subtotal</span>
          <span className="font-semibold text-[#f4eadf]">
            {formatterPrice(subtotal)}
          </span>
        </div>
        <button className="mt-auto w-full rounded-xl bg-[#D4AF69] p-3 font-bold text-[#1A1413] shadow-lg shadow-[#d4af69]/20 transition hover:bg-[#c79a4b] hover:shadow-[#d4af69]/30">
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cart;

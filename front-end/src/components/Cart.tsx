import { Check, CircleAlert, X } from "lucide-react";
import CartItem from "./CartItem";
import { useContext, useState } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";
import { formatterPrice } from "../utils/formatterPrice";

type CartTypeProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
  closeCart: () => void;
};

const Cart = ({ closeCart }: CartTypeProps) => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderMessageType, setOrderMessageType] = useState<"success" | "error">(
    "success",
  );
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  const updateItemQuantity = async (itemId: number, nextQuantity: number) => {
    try {
      const response = await fetch(
        "http://fetch(`${import.meta.env.VITE_API_URL}:3000/cart-items/update-quantity",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ itemId, quantity: nextQuantity }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setOrderMessage(
          errorData.message || "Não foi possível atualizar o item do carrinho.",
        );
        setOrderMessageType("error");
        return;
      }

      const updatedItem = await response.json();

      if (nextQuantity <= 0) {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        setOrderMessage("Item removido do carrinho.");
        setOrderMessageType("success");
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, quantity: updatedItem.quantity }
              : item,
          ),
        );
        setOrderMessage("Quantidade atualizada com sucesso!");
        setOrderMessageType("success");
      }

      window.setTimeout(() => setOrderMessage(""), 1400);
    } catch (error) {
      console.error("Erro ao atualizar quantidade do carrinho:", error);
      setOrderMessage("Erro ao atualizar o carrinho.");
      setOrderMessageType("error");
      window.setTimeout(() => setOrderMessage(""), 1400);
    }
  };

  async function HandleCreateOrder() {
    if (isSubmittingOrder || cartItems.length === 0) return;

    try {
      setIsSubmittingOrder(true);
      setOrderMessage("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setOrderMessage(data.message || "Não foi possível finalizar o pedido.");
        setOrderMessageType("error");
        return;
      }

      setCartItems([]);
      setOrderMessage("Pedido realizado com sucesso!");
      setOrderMessageType("success");

      window.setTimeout(() => {
        closeCart();
      }, 800);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      setOrderMessage("Erro ao finalizar pedido. Tente novamente.");
      setOrderMessageType("error");
    } finally {
      setIsSubmittingOrder(false);
    }
  }

  return (
    <div className="flex h-screen w-full max-w-[26.25rem] flex-col bg-[#1C1715] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.45)] ring-1 ring-[#d4af69]/20 sm:p-5">
      <div className="flex items-center justify-between border-b border-[#d4af69]/15 pb-4">
        <button type="button" onClick={closeCart} aria-label="Fechar carrinho">
          <X className="cursor-pointer text-[#f4eadf] transition hover:text-[#d4af69]" />
        </button>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f4eadf] sm:text-base">
          Meu carrinho
        </p>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#1b1413] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4af69]/70 [&::-webkit-scrollbar-thumb:hover]:bg-[#d4af69]">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d4af69]/20 bg-[#261f1d] p-6 text-center">
            <p className="mb-2 text-lg font-bold text-[#f4eadf]">
              Seu carrinho está vazio
            </p>
            <p className="mb-4 text-sm text-[#d0b998]">
              Adicione alguns itens para montar seu pedido.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full border border-[#d4af69]/30 bg-[#d4af69]/10 px-4 py-2 text-sm font-bold text-[#f5e7c2] transition hover:border-[#d4af69]/50 hover:bg-[#d4af69]/15"
            >
              Explorar cardápio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                title={item.product.name}
                quantity={item.quantity}
                price={item.product.price}
                imgUrl={item.product.img}
                onIncrease={() =>
                  updateItemQuantity(item.id, item.quantity + 1)
                }
                onDecrease={() =>
                  updateItemQuantity(item.id, item.quantity - 1)
                }
                onRemove={() => updateItemQuantity(item.id, 0)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-[#d4af69]/15 pt-4">
        <div className="mb-3 flex items-center justify-between text-sm text-[#d0b998]">
          <span>Subtotal</span>
          <span className="font-semibold text-[#f4eadf]">
            {formatterPrice(subtotal)}
          </span>
        </div>

        {orderMessage && (
          <p
            aria-live="polite"
            className={`mb-3 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center text-sm font-medium ${
              orderMessageType === "success"
                ? "border-[#a8f0c2]/20 bg-[#a8f0c2]/10 text-[#a8f0c2]"
                : "border-[#ff9d9d]/20 bg-[#ff9d9d]/10 text-[#ffb5b5]"
            }`}
          >
            {orderMessageType === "success" ? (
              <Check size={16} />
            ) : (
              <CircleAlert size={16} />
            )}
            {orderMessage}
          </p>
        )}

        <button
          title="Finalizar Pedido"
          type="button"
          disabled={cartItems.length === 0 || isSubmittingOrder}
          onClick={HandleCreateOrder}
          className="mt-auto w-full rounded-xl bg-[#D4AF69] p-3 font-bold text-[#1A1413] shadow-lg shadow-[#d4af69]/20 transition hover:bg-[#c79a4b] hover:shadow-[#d4af69]/30 disabled:cursor-not-allowed disabled:bg-[#7a2c2c]/40 disabled:text-[#d0b998] disabled:shadow-none"
        >
          {isSubmittingOrder ? "Finalizando..." : "Finalizar Pedido"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

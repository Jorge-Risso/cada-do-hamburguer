import { Check, LoaderCircle, ShoppingCart, X } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { CartItemsContext } from "../contexts/CartItemsContext";

type ProductProps = ProductType & {
  onDelete: (id: number) => void;
};

const Product = ({
  id,
  name,
  description,
  price,
  img,
  onDelete,
}: ProductProps) => {
  const { user } = useContext(UserContext);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success",
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProduct = async (id: number) => {
    if (isDeleting) return;

    try {
      if (!id) {
        return;
      }
      setIsDeleting(true);
      const response = await fetch(
        `http://fetch(`${import.meta.env.VITE_API_URL}:3000/product-delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        console.error("Erro ao deletar produto:", response.statusText);
        setFeedbackType("error");
        setFeedbackMessage("Não foi possível excluir o produto.");
        setShowAddedMessage(true);
        window.setTimeout(() => setShowAddedMessage(false), 1800);
        return;
      }

      setFeedbackType("success");
      setFeedbackMessage("Produto removido com sucesso!");
      setShowAddedMessage(true);
      window.setTimeout(() => setShowAddedMessage(false), 1800);
      onDelete(id);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      setFeedbackType("error");
      setFeedbackMessage("Erro ao excluir o produto.");
      setShowAddedMessage(true);
      window.setTimeout(() => setShowAddedMessage(false), 1800);
    } finally {
      setIsDeleting(false);
    }
  };

  const { setCartItems } = useContext(CartItemsContext);

  const handleAddToCart = async (productId: number) => {
    if (isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setFeedbackType("error");
        setFeedbackMessage(
          errorData.message || "Não foi possível adicionar o item.",
        );
        setShowAddedMessage(true);
        window.setTimeout(() => setShowAddedMessage(false), 1800);
        return;
      }

      const data = await response.json();

      setCartItems((prev) => {
        const itemExists = prev.some((item) => item.productId === productId);

        if (itemExists) {
          return prev.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: Number(item.quantity) + 1,
                  product: data.product ?? item.product,
                }
              : item,
          );
        }

        return [...prev, data];
      });

      setFeedbackType("success");
      setFeedbackMessage("Produto adicionado ao carrinho!");
      setShowAddedMessage(true);
      window.setTimeout(() => setShowAddedMessage(false), 1800);
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      setFeedbackType("error");
      setFeedbackMessage("Erro ao adicionar o produto.");
      setShowAddedMessage(true);
      window.setTimeout(() => setShowAddedMessage(false), 1800);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="product-card">
      <img className="product-image" src={`./${img}`} alt={name} />

      <div className="product-info">
        <div className="product-header">
          <div className="product-text">
            <span className="product-tag">Popular</span>
            <p className="product-name">{name}</p>
            <p className="product-description">{description}</p>
          </div>

          {user?.type == "admin" && (
            <button
              type="button"
              disabled={isDeleting}
              className="cursor-pointer rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-300 transition hover:bg-red-500/20"
              onClick={() => handleDeleteProduct(id)}
            >
              {isDeleting ? "Excluindo..." : "Deletar"}
            </button>
          )}
        </div>

        <div className="product-footer">
          <p className="product-price">R${formatterPrice(price)}</p>
          <button
            type="button"
            disabled={isAddingToCart}
            className="action-button cursor-pointer px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => {
              handleAddToCart(id);
            }}
          >
            {isAddingToCart ? (
              <LoaderCircle className="animate-spin" size={16} />
            ) : (
              <ShoppingCart size={16} />
            )}
            {isAddingToCart ? "Adicionando..." : "Adicionar"}
          </button>
        </div>

        <p
          aria-live="polite"
          className={`flex min-h-5 items-center gap-1.5 text-xs font-bold transition-all duration-300 ${
            feedbackType === "success" ? "text-[#a8f0c2]" : "text-[#ff9d9d]"
          } ${
            showAddedMessage
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1"
          }`}
        >
          {feedbackType === "success" ? <Check size={14} /> : <X size={14} />}
          {feedbackMessage || "Produto adicionado ao carrinho!"}
        </p>
      </div>
    </div>
  );
};

export default Product;

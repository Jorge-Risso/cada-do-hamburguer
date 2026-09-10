import { ShoppingCart } from "lucide-react";
import type { ProductTipe } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

type ProductProps = ProductTipe & {
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

  const handleDeleteProduct = async (id: number) => {
    try {
      if (!id) {
        return;
      }
      const response = await fetch(
        `http://localhost:3000/product-delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        console.error("Erro ao deletar produto:", response.statusText);
        return;
      }

      onDelete(id);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
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
              className="cursor-pointer rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-300 transition hover:bg-red-500/20"
              onClick={() => handleDeleteProduct(id)}
            >
              Deletar
            </button>
          )}
        </div>

        <div className="product-footer">
          <p className="product-price">R${formatterPrice(price)}</p>
          <button type="button" className="action-button px-4 py-2.5 text-sm">
            <ShoppingCart size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

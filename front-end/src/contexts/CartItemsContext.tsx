import { createContext, useContext, useEffect, useState } from "react";
import type { CartItemType, CartItemsContextType } from "../types/CartItem";
import { UserContext } from "./UserContext";

export const CartItemsContext = createContext<CartItemsContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartItemsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getCartItems = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/cart-items`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          setCartItems([]);
          return;
        }

        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        setCartItems([]);
      }
    };

    getCartItems();
  }, [user]);

  return (
    <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
};

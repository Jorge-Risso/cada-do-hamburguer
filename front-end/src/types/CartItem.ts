import type { ProductType } from "./Product";

export type CartItemType = {
  id: number;
  productId: number;
  quantity: number;
  product: ProductType;
};

export type CartItemsContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

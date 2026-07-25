import { ShoppingCart } from "lucide-react";
import type { ProductTipe } from "../types/Product";
import { formatterPrice } from "../utils/formatterPrice";

const Product = ({
  id,
  name,
  description,
  price,
  img,
  category,
}: ProductTipe) => {
  return (
    <div className="">
      <div className="flex gap-2">
        <img
          className="w-[100px] h-[83px] md:w-[200px] md:h-[166px]"
          src={`./${img}`}
          alt="hamburguer"
        />
        <div className="flex flex-col ">
          <p className="md:text-md uppercase font-bold">{name}</p>
          <p className="md:text-sm flex-1 text-[#848484]">{description}</p>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-sm text-[#F2DAAC]">R${formatterPrice(price)}</p>
            <ShoppingCart size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

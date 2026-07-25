import { useState } from "react";
import CardPedido from "../components/CardPedido";

const Pedidos = () => {
  const [category, setCategory] = useState("pendente");

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const elementSelect =
      "cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28 text-sm text-sm md:text-md rounded-md text-[#161410] bg-[#F2DAAC] flex justify-center items-center";

    const elementNoSelect =
      "cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28 text-sm text-sm md:text-md rounded-md text-[#F2DAAC] bg-[#161410] hover:text-[#161410] hover:bg-[#F2DAAC] flex justify-center items-center";
    if (category == categoryName) {
      return elementSelect;
    } else {
      return elementNoSelect;
    }
  };

  return (
    <div className="text-[#161410] md:w-[737px]  mx-auto w-full px-4">
      <div className="flex md:my-3 mt-1 mb-3 gap-2 py-4">
        <div
          onClick={() => handleChangeCategory("pendente")}
          className={getCategoryClass("pendente")}
        >
          Pendentes
        </div>
        <div
          onClick={() => handleChangeCategory("retirado")}
          className={getCategoryClass("retirado")}
        >
          Retirados
        </div>
        <div
          onClick={() => handleChangeCategory("cancelado")}
          className={getCategoryClass("cancelado")}
        >
          Cancelados
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <CardPedido
          id={1}
          name="teste a"
          date="10/07/2026"
          orderTime="10:30"
          deliveryTime="11:30"
          total={123.55}
        />
      </div>
    </div>
  );
};

export default Pedidos;

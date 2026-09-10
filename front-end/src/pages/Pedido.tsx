import { useState } from "react";
import CardPedido from "../components/CardPedido";

const Pedidos = () => {
  const [category, setCategory] = useState("pendente");

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    if (category === categoryName) {
      return "category-chip active cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
    }

    return "category-chip inactive cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
      <section className="mb-6 rounded-[2rem] border border-[#d4af69]/15 bg-[#1b1513]/80 p-5 shadow-[0_22px_50px_rgba(0,0,0,0.25)] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4af69]">
              Painel
            </p>
            <h1 className="mt-2 text-2xl font-black text-white">Pedidos</h1>
          </div>
          <span className="rounded-full border border-[#d4af69]/25 bg-[#7a2c2c]/10 px-3 py-1 text-sm font-bold text-[#d4af69]">
            3 ativos
          </span>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => handleChangeCategory("pendente")}
            className={getCategoryClass("pendente")}
          >
            Pendentes
          </button>
          <button
            onClick={() => handleChangeCategory("retirado")}
            className={getCategoryClass("retirado")}
          >
            Retirados
          </button>
          <button
            onClick={() => handleChangeCategory("cancelado")}
            className={getCategoryClass("cancelado")}
          >
            Cancelados
          </button>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CardPedido
          id={1}
          name="João Silva"
          date="10/07/2026"
          orderTime="10:30"
          deliveryTime="11:30"
          total={123.55}
        />
        <CardPedido
          id={2}
          name="Maria Souza"
          date="10/07/2026"
          orderTime="11:15"
          deliveryTime="12:10"
          total={84.9}
        />
        <CardPedido
          id={3}
          name="Pedro Lima"
          date="10/07/2026"
          orderTime="12:00"
          deliveryTime="12:45"
          total={67.4}
        />
      </div>
    </div>
  );
};

export default Pedidos;

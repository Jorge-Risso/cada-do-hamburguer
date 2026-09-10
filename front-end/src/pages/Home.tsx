import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductTipe } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("hamburguer");
  const [products, setProducts] = useState<ProductTipe[]>([]);

  const categoryMap: Record<string, string> = {
    hamburguer: "hamburguer",
    hamburgers: "hamburguer",
    bebida: "bebida",
    bebidas: "bebida",
    porcao: "porcao",
    porcoes: "porcao",
    porcaoes: "porcao",
    porcaoo: "porcao",
    todos: "todos",
  };

  const normalizeCategory = (value: string) => {
    const cleaned = value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z]/g, "");

    return categoryMap[cleaned] ?? cleaned;
  };

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    if (normalizeCategory(category) === normalizeCategory(categoryName)) {
      return "category-chip active cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
    }

    return "category-chip inactive cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProduct = products.filter((product) => {
    if (normalizeCategory(category) === "todos") return true;
    return normalizeCategory(product.category) === normalizeCategory(category);
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-auto mb-8 w-full max-w-6xl px-4 py-6 md:px-6">
      <section className="hero-banner mb-8 rounded-[2rem] p-5 md:p-8">
        <div className="relative z-10 max-w-xl">
          <span className="hero-badge mb-4">
            <span>🔥</span>
            Especial da casa
          </span>
          <h1 className="mb-3 text-3xl font-black leading-none text-white md:text-5xl">
            Experiência premium em cada mordida.
          </h1>
          <p className="max-w-md text-sm text-[#f5e7c2] md:text-base">
            Carne selecionada, pão artesanal e combinações cuidadosamente
            preparadas para entregar sabor, textura e qualidade excepcionais.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="action-button px-5 py-3 text-sm md:px-6">
              Ver cardápio
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-[#d4af69]/40 hover:text-[#d4af69]">
              Ofertas exclusivas
            </button>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#d4af69]">
            Catálogo
          </p>
          <p className="text-sm text-[#d0b998]">
            {filteredProduct.length} itens disponíveis
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => handleChangeCategory("hamburguer")}
            className={getCategoryClass("hamburguer")}
          >
            Hambúrguer
          </button>
          <button
            onClick={() => handleChangeCategory("bebida")}
            className={getCategoryClass("bebida")}
          >
            Bebidas
          </button>
          <button
            onClick={() => handleChangeCategory("porcao")}
            className={getCategoryClass("porcao")}
          >
            Porções
          </button>
          <button
            onClick={() => handleChangeCategory("todos")}
            className={getCategoryClass("todos")}
          >
            Todos
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-4 md:gap-5">
        {filteredProduct.map((product) => (
          <Product
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            img={product.img}
            category={product.category}
            key={product.id}
            onDelete={(deletedId) => {
              setProducts((currentProducts) =>
                currentProducts.filter(
                  (currentProduct) => currentProduct.id !== deletedId,
                ),
              );
            }}
          />
        ))}

        {filteredProduct.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-[#d9cab6]">
            Nenhum item disponível nesta categoria no momento.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

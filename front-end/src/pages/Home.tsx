import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductTipe } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("hamburguer");
  const [products, setProducts] = useState<ProductTipe[]>([]);

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const elementSelect =
      "cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28text-sm text-sm md:text-md rounded-md text-[#161410] bg-[#F2DAAC] flex justify-center items-center";

    const elementNoSelect =
      "cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28text-sm text-sm md:text-md rounded-md text-[#F2DAAC] bg-[#161410] hover:text-[#161410] hover:bg-[#F2DAAC] flex justify-center items-center";
    if (category == categoryName) {
      return elementSelect;
    } else {
      return elementNoSelect;
    }
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
    return product.category === category;
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="text-white md:w-[737px]  mx-auto mb-2 w-full px-4">
      <div className="flex md:my-3 gap-2 py-4">
        <div
          onClick={() => handleChangeCategory("hamburguer")}
          className={getCategoryClass("hamburguer")}
        >
          Hamburguer
        </div>
        <div
          onClick={() => handleChangeCategory("bebida")}
          className={getCategoryClass("bebida")}
        >
          Bebidas
        </div>
        <div
          onClick={() => handleChangeCategory("porção")}
          className={getCategoryClass("porção")}
        >
          Porções
        </div>
      </div>
      <p className="uppercase font-bold text-[#F2DAAC] mb-2">{category}</p>
      <div className="flex flex-col gap-1 md:gap-3">
        {filteredProduct.map((product) => (
          <Product
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            img={product.img}
            category={product.category}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

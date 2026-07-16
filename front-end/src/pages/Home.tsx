import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-white">
      <div className="flex gap-2">
        <div className="cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28text-sm text-sm md:text-md rounded-md text-[#161410] bg-[#F2DAAC] flex justify-center items-center">
          Hamburguer
        </div>
        <div className="cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28text-sm text-sm md:text-md rounded-md text-[#F2DAAC] bg-[#161410] hover:text-[#161410] hover:bg-[#F2DAAC] flex justify-center items-center">
          Bebidas
        </div>
        <div className="cursor-pointer border border-[#F2DAAC] font-bold w-25 h-7 md:h-9 md:w-28text-sm text-sm md:text-md rounded-md text-[#161410] bg-[#F2DAAC] flex justify-center items-center">
          Porções
        </div>
      </div>
    </div>
  );
};

export default Home;

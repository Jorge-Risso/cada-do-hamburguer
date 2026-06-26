import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-[#161410]">
      <div className="max-w-[737px] mx-auto flex items-center justify-between px-4 py-3">
        <img
          src="/burguer-logo.png"
          alt="Burger House"
          className="h-20 w-auto"
        />

        <Link to="/login">
          <div className="bg-[#F2DAAC] text-[#161410] px-4 py-2 rounded-md cursor-pointer font-semibold hover:opacity-90 transition flex items-center justify-center">
            Entrar
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

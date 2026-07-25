import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, [location.pathname]);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex w-[35px] h-[35px] rounded-md border-1 cursor-pointer items-center justify-center";
    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return baseClass;
    }
  };
  return (
    <header className="bg-[#161410]">
      <div className="max-w-[737px] mx-auto flex items-center justify-between md:w-[737px] md:p-0 px-4 py-8">
        <Link to="/" className="py-2">
          <img
            src="/burguer-logo.png"
            alt="Burger House"
            className="h-20 w-auto"
          />
        </Link>
        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.type === "admin" && (
              <div className="flex text-[#F2DAAC] gap-2 items-center">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <div className="flex w-[35px] h-[35px] rounded-md border-1 cursor-pointer items-center justify-center">
                  <Plus size={18} />
                </div>
              </div>
            )}
            <div className="relative cursor-pointer">
              <p className="absolute text-[#161410]  -top-4 -right-4 bg-[#F2DAAC] w-5 h-5 rounded-full flex justify-center items-center ">
                1
              </p>
              <ShoppingCart size={18} className="" />
            </div>
            <div className="flex items-center gap-2">
              <p>{user?.name}</p>
              <LogOut
                size={18}
                className="cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="bg-[#F2DAAC] text-[#161410] px-4 py-2 rounded-md cursor-pointer font-semibold hover:opacity-90 transition flex items-center justify-center">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

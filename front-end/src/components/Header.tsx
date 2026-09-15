import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";
import { CartItemsContext } from "../contexts/CartItemsContext";

type HeaderProps = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsCartOpen }: HeaderProps) => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const { cartItems } = useContext(CartItemsContext);

  const totalItensCarrinho = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

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
      "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200";
    if (location.pathname === path) {
      return `${baseClass} border-[#d4af69] bg-[#d4af69] text-[#1f1917] shadow-lg shadow-[#b88939]/20`;
    }
    return `${baseClass} border-white/10 bg-white/5 text-white/70 hover:border-[#d4af69]/40 hover:text-[#d4af69]`;
  };

  return (
    <header className="header-shell">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 md:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="brand-mark flex h-10 w-10 items-center justify-center rounded-2xl p-2 sm:h-12 sm:w-12">
            <img
              src="/burguer-logo.png"
              alt="Burger House"
              className="h-8 w-auto sm:h-10"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#d4af69] sm:text-[0.6rem]">
              Burger House
            </p>
            <p className="truncate text-sm font-black text-white sm:text-base md:text-lg">
              Casa do Hambúrguer
            </p>
          </div>
        </Link>

        {user ? (
          <div className="flex flex-wrap items-center justify-end gap-2 text-white sm:gap-3 md:gap-4">
            {user.type === "admin" && (
              <div className="flex items-center gap-2 text-[#f5e7c2]">
                <Link to="/" title="Cardápio">
                  <div className={getNavItemClass("/")}>
                    <Box size={18} />
                  </div>
                </Link>
                <Link to="/pedidos" title="Pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={18} />
                  </div>
                </Link>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#d4af69]/40 hover:text-[#d4af69]">
                  <Plus size={18} />
                </div>
              </div>
            )}

            <button
              type="button"
              title="Carrinho"
              onClick={toggleCart}
              className="relative cursor-pointer rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#d4af69] transition hover:border-[#d4af69]/40"
            >
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7a2c2c] text-[10px] font-bold text-white">
                {totalItensCarrinho}
              </span>
              <ShoppingCart size={18} />
            </button>

            <div className="flex max-w-[170px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-2 sm:px-3">
              <p className="truncate text-xs font-medium text-white sm:text-sm">
                {user?.name}
              </p>
              <LogOut
                size={18}
                className="ml-auto shrink-0 cursor-pointer text-[#d4af69] transition hover:text-white"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        ) : (
          <Link to="/login" className="ml-auto">
            <div className="flex items-center justify-center rounded-full bg-linear-to-r from-[#d4af69] to-[#b88939] px-4 py-2.5 text-sm font-bold text-[#1f1917] shadow-lg shadow-[#b88939]/25 transition hover:brightness-110 sm:px-5">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

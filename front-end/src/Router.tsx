import { createBrowserRouter, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
//import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/Header.tsx";
import Pedido from "./pages/Pedido.tsx";
import AdminCreateProduct from "./pages/AdminCreateProduct.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Cart from "./components/Cart.tsx";

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartClosing, setIsCartClosing] = useState(false);
  const [isCartOpening, setIsCartOpening] = useState(false);

  useEffect(() => {
    if (!isCartOpen) {
      setIsCartClosing(false);
      setIsCartOpening(false);
      return;
    }

    setIsCartClosing(false);
    setIsCartOpening(true);
  }, [isCartOpen]);

  const closeCart = () => {
    setIsCartClosing(true);
    setIsCartOpening(false);
    window.setTimeout(() => {
      setIsCartOpen(false);
      setIsCartClosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#161410]">
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ${
          isCartOpen ? "blur-[2px] brightness-75" : "brightness-100"
        }`}
      >
        <Header setIsCartOpen={setIsCartOpen} />
        <Outlet />
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0d0908]/40 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={closeCart}
        >
          <div
            className={`ml-auto h-full w-full max-w-[420px] bg-[#1A1413] shadow-2xl shadow-black/40 transition-transform duration-300 ease-out sm:w-[390px] ${
              isCartClosing || !isCartOpening
                ? "translate-x-full"
                : "translate-x-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <Cart
              setShowCart={setIsCartOpen}
              showCart={isCartOpen}
              closeCart={closeCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pedidos",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Pedido mode="admin" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pedidos/me",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <Pedido mode="user" />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/produtos/novo",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminCreateProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
]);

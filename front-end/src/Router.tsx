import { createBrowserRouter, Outlet } from "react-router-dom";
//import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import Header from "./components/Header.tsx";
import Pedido from "./pages/Pedido.tsx";
import PublicRoute from "./components/PublicRoute.tsx";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#161410]">
      <Header />
      <Outlet />
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
        element: <Pedido />,
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
  {
    path: "/pedidos",
    element: (
      <PublicRoute>
        <Pedido />
      </PublicRoute>
    ),
  },
]);

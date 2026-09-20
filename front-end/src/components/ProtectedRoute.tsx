import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type UserType = "admin" | "user";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserType[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me", {
          credentials: "include",
        });

        if (!isMounted) return;

        if (!response.ok) {
          navigate("/login", { replace: true });
          return;
        }

        const user = await response.json();

        if (!allowedRoles || !allowedRoles.includes(user.type)) {
          const fallbackPath =
            user.type === "admin" ? "/pedidos" : "/pedidos/me";
          navigate(fallbackPath, { replace: true });
          return;
        }
      } catch (error) {
        console.error("Erro ao validar acesso:", error);
        if (isMounted) {
          navigate("/login", { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [allowedRoles, navigate]);

  if (isChecking) {
    return <p className="p-6 text-center text-white">Carregando...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

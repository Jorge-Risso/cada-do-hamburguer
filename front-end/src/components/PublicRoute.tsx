import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (!isMounted) return;

        if (response.ok) {
          setIsAuthenticated(true);
          navigate("/", { replace: true });
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isChecking) {
    return <p>Carregando...</p>;
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PublicRoute;

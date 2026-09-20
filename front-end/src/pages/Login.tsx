import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (!email || !password) {
        setMessage("Email e senha são obrigatórios!");
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Credenciais inválidas.");
        return;
      }

      setMessage("");
      navigate("/");
      setUser(data.user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-shell flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="auth-card w-full max-w-md rounded-[2rem] p-8 sm:p-10"
      >
        {/* Logo e título */}
        <div className="flex flex-col items-center">
          <Link to="/">
            <img
              src="/burguer-logo.png"
              alt="Burger House"
              className="h-24 w-auto mb-4 transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1 text-center">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Faça login para continuar
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full">
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="relative w-full">
            <Input
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="pr-10" // espaço para o ícone
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-[#d4af69] focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p
            className={`text-sm font-bold text-center ${
              message ? "text-red-400" : "text-transparent"
            }`}
            aria-live="polite"
          >
            {message || "_"}
          </p>
        </div>

        {/* Botão */}
        <Button
          title={isSubmitting ? "Entrando..." : "Login"}
          type="submit"
          disabled={isSubmitting}
          variant="cursor-pointer w-full rounded-md bg-linear-to-r from-[#d4af69] to-[#b88939] px-4 py-3 text-sm font-bold text-[#1f1917] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 hover:from-[#c79d4d] hover:to-[#a9722c]"
        />

        {/* Link de cadastro */}
        <p className="text-gray-400 text-center text-sm pt-3">
          Não possui uma conta?{" "}
          <Link
            className="auth-link font-semibold transition-colors duration-300 hover:text-[#f5e7c2]"
            to="/register"
          >
            Clique Aqui!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Input ajustado para responsividade
  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <input
        {...props}
        className="auth-input w-full rounded-xl px-3 py-2.5 text-sm outline-none transition focus:border-[#d4af69] focus:ring-2 focus:ring-[#d4af69]/30"
      />
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!email || !password) {
        setMessage("Email e senha são obrigatórios!");
        return;
      }
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
      }
      if (response.status === 200) {
        setMessage("");
        navigate("/");
        setUser(data.user);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Erro ao fazer login. Tente novamente mais tarde.");
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="text-red-500 text-sm font-bold text-center">
            {message}
          </p>
        </div>

        {/* Botão */}
        <Button
          title="Login"
          type="submit"
          variant="cursor-pointer w-full bg-linear-to-r from-[#d4af69] to-[#b88939] hover:from-[#c79d4d] hover:to-[#a9722c] py-3 rounded-md font-bold text-[#1f1917] text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
        />

        {/* Link de cadastro */}
        <p className="text-gray-400 text-center text-sm">
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

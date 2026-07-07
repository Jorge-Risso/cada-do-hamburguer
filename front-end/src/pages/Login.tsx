import { useState } from "react";
import { Link } from "react-router";
import Button from "../components/Button";

// Input ajustado para responsividade
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full text-xsm px-3 py-2 bg-white text-[#32343E] rounded-md outline-none placeholder-[#32343E] transition focus:ring-2 focus:ring-[#C92A0E]"
    />
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Email e senha são obrigatórios!");
        return;
      }
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#161410] to-[#1f1a17] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1a17] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
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
          <p className="text-red-500 text-sm font-bold text-center">{error}</p>
        </div>

        {/* Botão */}
        <Button
          title="Login"
          type="submit"
          variant="cursor-pointer w-full bg-linear-to-r from-[#C92A0E] to-[#FF5E2B] hover:from-[#a81e05] hover:to-[#e03a1a] py-3 rounded-md font-bold text-white text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
        />

        {/* Link de cadastro */}
        <p className="text-gray-400 text-center text-sm">
          Não possui uma conta?{" "}
          <Link
            className="text-[#C92A0E] hover:text-[#FF5E2B] font-semibold transition-colors duration-300"
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

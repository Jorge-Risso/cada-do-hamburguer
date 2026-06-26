import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ nome, email, password, confirmPassword, cep });
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
            Crie sua conta
          </h1>
          <p className="text-gray-400 text-sm text-center">
            Preencha os campos para se registrar
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 w-full">
          <Input
            placeholder="Nome"
            type="text"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
          <Input
            placeholder="Email"
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
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="relative w-full">
            <Input
              placeholder="Confirme sua senha"
              type={showConfirm ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          <Input
            placeholder="CEP"
            type="text"
            onChange={(e) => setCep(e.target.value)}
            value={cep}
          />
        </div>

        {/* Botão */}
        <Button
          title="Cadastrar"
          variant="cursor-pointer w-full bg-linear-to-r from-[#C92A0E] to-[#FF5E2B] hover:from-[#a81e05] hover:to-[#e03a1a] py-3 rounded-md font-bold text-white text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
        />

        {/* Link de login */}
        <p className="text-gray-400 text-center text-sm">
          Já possui uma conta?{" "}
          <Link
            className="text-[#C92A0E] hover:text-[#FF5E2B] font-semibold transition-colors duration-300"
            to="/login"
          >
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    type: "error" as "error" | "success",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage({
      text: "",
      type: "error",
    });

    try {
      const formData = {
        name,
        email,
        password,
        confirmPassword,
        cep,
      };

      if (Object.values(formData).some((value) => !value.trim())) {
        setMessage({
          text: "Preencha todos os campos.",
          type: "error",
        });
        return;
      }

      if (password !== confirmPassword) {
        setMessage({
          text: "As senhas não coincidem.",
          type: "error",
        });
        return;
      }

      if (password.length < 6) {
        setMessage({
          text: "A senha deve ter pelo menos 6 caracteres.",
          type: "error",
        });
        return;
      }

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          text: data.message,
          type: "error",
        });
        return;
      }

      setMessage({
        text: "Usuário cadastrado com sucesso!",
        type: "success",
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCep("");

      console.log(data);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);

      setMessage({
        text: "Erro ao conectar com o servidor.",
        type: "error",
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#161410] to-[#1f1a17] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1a17] p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
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

        <div className="flex flex-col gap-4 w-full">
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full">
            <Input
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="relative w-full">
            <Input
              placeholder="Confirme sua senha"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          <Input
            placeholder="CEP"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>

        {message.text && (
          <p
            className={`text-sm font-bold text-center ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          title="Cadastrar"
          type="submit"
          variant="cursor-pointer w-full bg-linear-to-r from-[#C92A0E] to-[#FF5E2B] hover:from-[#a81e05] hover:to-[#e03a1a] py-3 rounded-md font-bold text-white text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
        />

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

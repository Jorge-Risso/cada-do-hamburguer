import Input from "../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    type: "error" as "error" | "success",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setMessage({
      text: "",
      type: "error",
    });

    try {
      setIsSubmitting(true);
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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage({
          text: data.message || "Não foi possível concluir o cadastro.",
          type: "error",
        });
        return;
      }

      setMessage({
        text: "Usuário cadastrado com sucesso! Agora faça login.",
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-shell flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="auth-card w-full max-w-md rounded-4xl p-8 sm:p-10"
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
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-[#d4af69]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              aria-label={
                showConfirm
                  ? "Ocultar confirmação de senha"
                  : "Mostrar confirmação de senha"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-[#d4af69]"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
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
            aria-live="polite"
            className={`text-sm font-bold text-center ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          title={isSubmitting ? "Cadastrando..." : "Cadastrar"}
          type="submit"
          disabled={isSubmitting}
          variant="cursor-pointer w-full rounded-md bg-linear-to-r from-[#d4af69] to-[#b88939] px-4 py-3 text-sm font-bold text-[#1f1917] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 hover:from-[#c79d4d] hover:to-[#a9722c]"
        />

        <p className="text-gray-400 text-center text-sm">
          Já possui uma conta?{" "}
          <Link
            className="auth-link font-semibold transition-colors duration-300 hover:text-[#f5e7c2]"
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

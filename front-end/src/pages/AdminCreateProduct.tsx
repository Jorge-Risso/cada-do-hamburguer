import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const productCategories = [
  "hamburguer",
  "bebida",
  "porcao",
  "sobremesa",
  "acompanhamento",
];

const AdminCreateProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("hamburguer");
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Selecione um arquivo de imagem válido.");
      return;
    }

    setImg(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!name.trim() || !description.trim() || !img || !price) {
      setMessage("Preencha todos os campos antes de salvar.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);
      formData.append("img", img);

      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível criar o produto.");
      }

      setMessage("Produto cadastrado com sucesso!");

      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao cadastrar produto.";

      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
      <div className="rounded-[2rem] border border-[#d4af69]/15 bg-[#1b1513]/80 p-6 shadow-[0_22px_50px_rgba(0,0,0,0.25)] md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4af69]">
              Admin
            </p>

            <h1 className="mt-2 text-3xl font-black text-white">
              Novo produto
            </h1>
          </div>

          <Link
            to="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-[#f5e7c2] transition hover:border-[#d4af69]/40 hover:text-[#d4af69]"
          >
            Voltar ao cardápio
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Nome */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold uppercase tracking-[0.14em] text-[#d4af69]">
                Nome do produto
              </label>

              <Input
                placeholder="Ex: X-Burger Clássico"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            {/* Descrição */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold uppercase tracking-[0.14em] text-[#d4af69]">
                Descrição
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Descreva o produto"
                className="w-full rounded-md border border-white/10 bg-white px-3 py-2 text-sm text-[#1f1b1a] outline-none placeholder:text-[#5c4f49] focus:ring-2 focus:ring-[#d4af69]"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-[0.14em] text-[#d4af69]">
                Categoria
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#1a1513] px-3 py-2.5 text-sm font-medium text-[#f5e7c2] outline-none focus:ring-2 focus:ring-[#d4af69]"
              >
                {productCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-[0.14em] text-[#d4af69]">
                Valor
              </label>

              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="59.90"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            {/* Imagem */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold uppercase tracking-[0.14em] text-[#d4af69]">
                Imagem do produto
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-md border border-dashed border-[#d4af69]/40 bg-[#1a1513] px-3 py-3 text-sm text-[#f5e7c2] file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#d4af69] file:px-3 file:py-1.5 file:text-sm file:font-bold file:text-[#1f1917]"
              />

              {preview && (
                <div className="overflow-hidden rounded-xl border border-[#d4af69]/25 bg-[#1a1513] p-3">
                  <img
                    src={preview}
                    alt="Pré-visualização do produto"
                    className="h-32 w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mensagem */}
          {message && (
            <p
              className={`text-sm font-bold ${
                message.includes("sucesso") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          {/* Botão */}
          <div className="flex justify-end pt-2">
            <Button
              title={isSubmitting ? "Salvando..." : "Salvar produto"}
              type="submit"
              disabled={isSubmitting}
              variant="cursor-pointer rounded-full bg-linear-to-r from-[#d4af69] to-[#b88939] px-6 py-3 text-sm font-bold text-[#1f1917] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;

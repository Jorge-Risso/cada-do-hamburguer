import { useEffect, useMemo, useState } from "react";
import CardPedido from "../components/CardPedido";

type PedidoMode = "admin" | "user";

type OrderStatus = "pendente" | "confirmado" | "retirado" | "cancelado";

type OrderApi = {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  user?: {
    name: string;
  };
};

const normalizeStatus = (status: string): OrderStatus => {
  switch (status.toLowerCase()) {
    case "completed":
    case "confirmado":
    case "done":
      return "confirmado";
    case "retirado":
      return "retirado";
    case "cancelled":
    case "canceled":
    case "cancelado":
      return "cancelado";
    case "pending":
    case "pendente":
    default:
      return "pendente";
  }
};

const Pedidos = ({ mode }: { mode: PedidoMode }) => {
  const [category, setCategory] = useState<OrderStatus>("pendente");
  const [orders, setOrders] = useState<OrderApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const endpoint =
          mode === "admin"
            ? "http://fetch(`${import.meta.env.VITE_API_URL}:3000/orders"
            : "http://fetch(`${import.meta.env.VITE_API_URL}:3000/orders/me";

        const response = await fetch(endpoint, {
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(
            data.message || "Não foi possível carregar os pedidos.",
          );
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao carregar pedidos.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [mode]);

  const filteredOrders = useMemo(
    () => orders.filter((order) => normalizeStatus(order.status) === category),
    [orders, category],
  );

  const handleChangeCategory = (newCategory: OrderStatus) => {
    setCategory(newCategory);
  };

  const handleStatusUpdate = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    try {
      const response = await fetch(
        `http://fetch(`${import.meta.env.VITE_API_URL}:3000/orders/${orderId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Não foi possível atualizar o status.");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao atualizar status.";
      setError(message);
    }
  };

  const getCategoryClass = (categoryName: OrderStatus) => {
    if (category === categoryName) {
      return "category-chip active cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
    }

    return "category-chip inactive cursor-pointer rounded-full border px-4 py-2 text-sm font-bold md:px-5";
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
      <section className="mb-6 rounded-[2rem] border border-[#d4af69]/15 bg-[#1b1513]/80 p-5 shadow-[0_22px_50px_rgba(0,0,0,0.25)] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4af69]">
              {mode === "admin" ? "Painel" : "Histórico"}
            </p>
            <h1 className="mt-2 text-2xl font-black text-white">
              {mode === "admin" ? "Pedidos" : "Meus pedidos"}
            </h1>
          </div>
          <span className="rounded-full border border-[#d4af69]/25 bg-[#7a2c2c]/10 px-3 py-1 text-sm font-bold text-[#d4af69]">
            {filteredOrders.length} ativos
          </span>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => handleChangeCategory("pendente")}
            className={getCategoryClass("pendente")}
          >
            Pendentes
          </button>
          <button
            onClick={() => handleChangeCategory("confirmado")}
            className={getCategoryClass("confirmado")}
          >
            Confirmados
          </button>
          <button
            onClick={() => handleChangeCategory("retirado")}
            className={getCategoryClass("retirado")}
          >
            Retirados
          </button>
          <button
            onClick={() => handleChangeCategory("cancelado")}
            className={getCategoryClass("cancelado")}
          >
            Cancelados
          </button>
        </div>
      </section>

      {loading && (
        <div className="rounded-2xl border border-[#d4af69]/15 bg-[#1b1513]/80 p-6 text-center text-[#f4eadf]">
          Carregando pedidos...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#d4af69]/20 bg-[#1b1513]/60 p-6 text-center text-[#f4eadf] md:col-span-2 xl:col-span-3">
              Nenhum pedido encontrado nesta categoria.
            </div>
          ) : (
            filteredOrders.map((order) => {
              const createdAt = new Date(order.createdAt);
              const status = normalizeStatus(order.status);

              return (
                <CardPedido
                  key={order.id}
                  id={order.id}
                  name={order.user?.name || "Cliente"}
                  date={createdAt.toLocaleDateString("pt-BR")}
                  orderTime={createdAt.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  total={Number(order.total)}
                  status={status}
                  isAdmin={mode === "admin"}
                  onStatusChange={handleStatusUpdate}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Pedidos;

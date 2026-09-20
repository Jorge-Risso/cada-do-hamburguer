import { User, CalendarFold, Clock, BadgeDollarSign } from "lucide-react";

type CardPedidoType = {
  id: number;
  name: string;
  date: string;
  orderTime: string;
  deliveryTime?: string;
  total: number;
  status?: "pendente" | "confirmado" | "retirado" | "cancelado";
  isAdmin?: boolean;
  onStatusChange?: (
    id: number,
    status: "pendente" | "confirmado" | "retirado" | "cancelado",
  ) => void;
};

const statusStyles = {
  pendente: "border-[#d4af69]/30 bg-[#d4af69]/10 text-[#f4d79a]",
  confirmado: "border-[#7dd3fc]/30 bg-[#7dd3fc]/10 text-[#bae6fd]",
  retirado: "border-[#8fe3b0]/30 bg-[#8fe3b0]/10 text-[#baf7d1]",
  cancelado: "border-[#ff9d9d]/30 bg-[#ff9d9d]/10 text-[#ffc7c7]",
} as const;

const statusLabels = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  retirado: "Retirado",
  cancelado: "Cancelado",
} as const;

const statusOptions = [
  { value: "pendente", label: "Pendente" },
  { value: "confirmado", label: "Confirmado" },
  { value: "retirado", label: "Retirado" },
  { value: "cancelado", label: "Cancelado" },
] as const;

const CardPedido = ({
  id,
  name,
  date,
  orderTime,
  deliveryTime,
  total,
  status = "pendente",
  isAdmin = false,
  onStatusChange,
}: CardPedidoType) => {
  return (
    <div className="rounded-[1.5rem] border border-[#d4af69]/15 bg-gradient-to-br from-[#2b211f] to-[#110d0c] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#d4af69]">
            Pedido
          </p>
          <p className="mt-1 text-lg font-black text-white">#{id}</p>
        </div>

        {isAdmin ? (
          <div className="relative">
            <select
              value={status}
              onChange={(event) => {
                const nextStatus = event.target.value as
                  | "pendente"
                  | "confirmado"
                  | "retirado"
                  | "cancelado";
                onStatusChange?.(id, nextStatus);
              }}
              className={`appearance-none cursor-pointer rounded-full border bg-[#1a1513] px-3 py-1.5 pr-8 text-[0.65rem] font-bold uppercase tracking-[0.12em] shadow-[0_0_0_1px_rgba(212,175,105,0.08)] transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d4af69]/30 ${statusStyles[status]}`}
              aria-label={`Atualizar status do pedido ${id}`}
              style={{
                backgroundImage: "none",
                backgroundColor: "#1a1513",
                color: "#f4e7d7",
                colorScheme: "dark",
              }}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#f4e7d7]">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M5.25 7.5 10 12.25 14.75 7.5H5.25Z" />
              </svg>
            </div>
          </div>
        ) : (
          <span
            className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
        )}
      </div>

      <div className="space-y-3 text-sm text-[#f4e7d7]">
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-2.5 py-2">
          <User size={15} className="text-[#d4af69]" />
          <p className="font-medium">{name}</p>
        </div>

        <div className="flex items-center gap-3">
          <CalendarFold size={15} className="text-[#d4af69]" />
          <p>{date}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-[#d4af69]" />
            <p>{orderTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-[#d4af69]" />
            <p>{deliveryTime ? deliveryTime : "-"}</p>
          </div>
        </div>
      </div>

      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#d4af69]/30 to-transparent" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#d0b998]">
          <BadgeDollarSign size={16} className="text-[#d4af69]" />
          <span className="text-sm">Total</span>
        </div>
        <p className="text-xl font-black text-[#d4af69]">
          R${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CardPedido;

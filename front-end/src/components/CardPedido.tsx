import { User, CalendarFold, Clock, BadgeDollarSign } from "lucide-react";

type CardPedidoType = {
  id: number;
  name: string;
  date: string;
  orderTime: string;
  deliveryTime?: string;
  total: number;
};

const CardPedido = ({
  id,
  name,
  date,
  orderTime,
  deliveryTime,
  total,
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

        <select
          className="rounded-full border border-[#d4af69]/20 bg-[#d4af69]/10 px-2.5 py-1.5 text-xs font-bold text-[#d4af69] outline-none"
          name="status"
          id="status"
          defaultValue="pendente"
        >
          <option value="pendente">Pendente</option>
          <option value="retirado">Retirado</option>
          <option value="cancelado">Cancelado</option>
        </select>
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

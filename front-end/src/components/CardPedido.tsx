import { User, CalendarFold, Clock } from "lucide-react";

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
    <div className=" bg-[#F2DAAC] rounded">
      <div className="flex justify-between p-2 rounded-md">
        <p className="font-bold">#{id}</p>
        <select className="font-bold" name="" id="">
          <option defaultChecked disabled value="">
            Pendente
          </option>
          <option value="">Retirado</option>
          <option value="">Cancelado</option>
        </select>
      </div>
      <div className="mt-2 p-1 flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <User size={16} />
          <p className="text-sm">{name}</p>
        </div>

        <div className="flex gap-2 items-center">
          <CalendarFold size={16} />
          <p className="text-xs">{date}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <Clock size={16} />
            <p className="text-xs">{orderTime}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Clock size={16} />
            <p className="text-xs">{deliveryTime ? deliveryTime : "-"}</p>
          </div>
        </div>
        <div className="h-[2px] w-full bg-[#161410]"></div>
        <p className="text-right font-bold">R${total}</p>
      </div>
    </div>
  );
};

export default CardPedido;

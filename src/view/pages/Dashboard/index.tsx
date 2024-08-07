import { Header } from "../../components/Header";
import { HomeIcon } from "../../components/icons/HomeIcon";
import { OrdersCard } from "./components/OrdersCard";

// import { orders } from "../../../mocks/Orders";
import { ResetModal } from "./components/ResetModal";
import { useEffect, useState } from "react";

import { Order } from "../../../types/Order";
import { api } from "../../../app/utils/api";

export function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleOpenResetModal() {
    setIsResetModalVisible(true);
  }

  function handleCloseResetModal() {
    setIsResetModalVisible(false);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <ResetModal
        visible={isResetModalVisible}
        onClose={handleCloseResetModal}
      />

      <Header
        icon={<HomeIcon className="w-8 h-8" />}
        description="Acompanhe os pedidos dos clientes"
        isDashboard
        onOpenResetModal={handleOpenResetModal}
      >
        Home
      </Header>

      <div className="flex w-full gap-8">
        <OrdersCard
          icon="🕑"
          title="Fila de espera"
          orders={waiting}
        />

        <OrdersCard
          icon="👩🏼‍🍳"
          title="Em produção"
          orders={inProduction}
        />

        <OrdersCard
          icon="✅"
          title="Pronto"
          orders={done}
        />
      </div>
    </div>
  );
}

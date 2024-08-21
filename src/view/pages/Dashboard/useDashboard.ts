import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { io } from "socket.io-client"; //
import { ordersService } from "../../../app/services/ordersService";

export function useDashboard() {
  // const [orders, setOrders] = useState<Order[]>([]);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  function handleOpenResetModal() {
    setIsResetModalVisible(true);
  }

  function handleCloseResetModal() {
    setIsResetModalVisible(false);
  }

  // useEffect(() => {
  //   const socket = io(import.meta.env.VITE_API_URL, {
  //     transports: ['websocket'],
  //   });

  //   socket.on('order_created', (order) => {
  //     console.log('Pedido: ', order);
  //   });
  // }, []);

  const { data = [], isFetching } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersService.getAllDashboard,
  });

  return {
    isResetModalVisible,
    data,
    isFetching,
    handleOpenResetModal,
    handleCloseResetModal,
  };
}

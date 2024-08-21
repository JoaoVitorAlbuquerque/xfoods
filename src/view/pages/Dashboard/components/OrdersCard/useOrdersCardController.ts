import { useCallback, useState } from "react";
import { Order } from "../../../../../types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ordersService } from "../../../../../app/services/ordersService";
import { UpdateOrdersParams } from "../../../../../app/services/ordersService/update";

export function useOrdersCardController() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenOrderModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  const handleCloseOrderModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }, []);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (orderId: string) => {
      return ordersService.remove(orderId);
    },
  });

  const handleCancelOrder = useCallback(async () => {
    try {
      await mutateAsync(selectedOrder!.id);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`Pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`);
      handleCloseOrderModal();
    } catch {
      toast.error('Erro ao cancelar o pedido!');
    }
  }, [selectedOrder, mutateAsync, handleCloseOrderModal, queryClient]);

  //

  const { isPending: isPendingUpdate, mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationFn: async (data: UpdateOrdersParams) => {
      return ordersService.update(data);
    },
  });

  const handleUpdateOrderStatus = useCallback(async () => {
    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
    try {
      await mutateAsyncUpdate({
        id: selectedOrder!.id,
        status,
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
      handleCloseOrderModal();
    } catch {
      toast.error('Erro ao alterar o status do pedido!');
    }
  }, [mutateAsyncUpdate, selectedOrder, queryClient, handleCloseOrderModal]);

  return {
    isModalVisible,
    selectedOrder,
    handleOpenOrderModal,
    handleCloseOrderModal,
    isPending,
    handleCancelOrder,
    isPendingUpdate,
    handleUpdateOrderStatus,
  };
}

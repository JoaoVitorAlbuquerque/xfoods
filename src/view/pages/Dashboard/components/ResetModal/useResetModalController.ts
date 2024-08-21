import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "../../../../../app/services/ordersService";
import { useCallback } from "react";
import toast from "react-hot-toast";

export function useResetModalController(onClose: () => void) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      return ordersService.updateRestarted();
    },
  });

  const handleUpdateRestartedOrders = useCallback(async () => {
    try {
      await mutateAsync();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedidos arquivados com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar o produto!');
    }
  }, [mutateAsync, onClose, queryClient]);

  return {
    isPending,
    handleUpdateRestartedOrders,
  };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { historyService } from "../../../../../app/services/historyService";
import { Order } from "../../../../../types/Order";

export function useHistoryOrderModalController(selectedOrder: Order | null, onClose: () => void) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (categoryId: string) => {
      return historyService.remove(categoryId);
    },
  });

  const handleDeleteOrder = useCallback(async () => {
    try {
      await mutateAsync(selectedOrder!.id);
      queryClient.invalidateQueries({ queryKey: ['history'] });
      toast.success('Pedido foi deletado com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar o pedido!');
    }
  }, [selectedOrder, mutateAsync, onClose, queryClient]);

  return {
    handleDeleteOrder,
    isPending,
  };
}

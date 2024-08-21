import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../../../../../../../app/services/productsService";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Product } from "../../../../../../../types/Product";

export function useDeleteProductModalController(selectedProduct: Product | null, onClose: () => void) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (productId: string) => {
      return productsService.remove(productId);
    },
  });

  const handleDeleteCategory = useCallback(async () => {
    try {
      await mutateAsync(selectedProduct!.id);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto foi deletado com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar o produto!');
    }
  }, [selectedProduct, mutateAsync, onClose, queryClient]);

  return {
    isPending,
    handleDeleteCategory,
  };
}

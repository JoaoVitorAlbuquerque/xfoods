import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../../../../../../../app/services/categoriesService";
import toast from "react-hot-toast";
import { Category } from "../../../../../../../types/Category";
import { useCallback } from "react";

export function useDeleteCategoryModalController(selectedCategory: Category | null, onClose: () => void) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (categoryId: string) => {
      return categoriesService.remove(categoryId);
    },
  });

  const handleDeleteCategory = useCallback(async () => {
    try {
      await mutateAsync(selectedCategory!.id);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria foi deletada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar a categoria!');
    }
  }, [selectedCategory, mutateAsync, onClose, queryClient]);

  return {
    handleDeleteCategory,
    isPending,
  };
}

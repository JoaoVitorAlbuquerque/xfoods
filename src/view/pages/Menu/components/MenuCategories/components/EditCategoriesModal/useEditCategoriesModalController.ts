import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categoriesService } from '../../../../../../../app/services/categoriesService';
import toast from 'react-hot-toast';
import { UpdateCategoriesParams } from '../../../../../../../app/services/categoriesService/update';
import { Category } from '../../../../../../../types/Category';

const schema = z.object({
  name: z.string().min(1, 'Nome da categoria é obrigatória'),
  icon: z.string().min(1, 'Ícone da categoria é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditCategoriesModalController(selectedCategory: Category | null, onClose: () => void) {

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      icon: selectedCategory?.icon,
      name: selectedCategory?.name,
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync, isSuccess } = useMutation({
    mutationFn: async (data: UpdateCategoriesParams) => {
      return categoriesService.update(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: selectedCategory!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria editada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    isPending,
    isSuccess,
  };
}

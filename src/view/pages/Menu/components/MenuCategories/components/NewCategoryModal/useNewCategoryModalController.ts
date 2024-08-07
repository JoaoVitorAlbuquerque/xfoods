import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categoriesService } from '../../../../../../../app/services/categoriesService';
import { CreateParams } from '../../../../../../../app/services/categoriesService/create';
import toast from 'react-hot-toast';
import { useMenuCategoriesController } from '../../useMenuCategoriesController';

const schema = z.object({
  name: z.string().min(1, 'Nome da categoria é obrigatória'),
  icon: z.string().min(1, 'Ícone da categoria é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewCategoryModalController() {
  const { handleCloseNewCategoryModal } = useMenuCategoriesController();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync, isSuccess } = useMutation({
    mutationFn: async (data: CreateParams) => {
      return categoriesService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Categoria criada com sucesso!');
      handleCloseNewCategoryModal();
      reset();
    } catch {
      toast.error('Erro ao criar a categoria!');
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

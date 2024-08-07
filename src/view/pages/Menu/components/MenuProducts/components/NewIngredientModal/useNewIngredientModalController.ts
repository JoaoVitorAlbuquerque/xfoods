import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { ingredientsService } from "../../../../../../../app/services/ingredientsService";
import { CreateIngredientsParams } from "../../../../../../../app/services/ingredientsService/create";

export function useNewIngredientModalController() {
  const schema = z.object({
    icon: z.string().min(1, 'Ícone do ingrediente é obrigatório!'),
    name: z.string().min(1, 'Nome do ingrediente é obrigatório!'),
  });

  type FormData = z.infer<typeof schema>;

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
    mutationFn: async (data: CreateIngredientsParams) => {
      return ingredientsService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      toast.success('Produto criado com sucesso!');
      // handleCloseNewCategoryModal();
      reset();
    } catch {
      toast.error('Erro ao criar o produto!');
    }
  });

  return {
    register,
    errors,
    isPending,
    isSuccess,
    handleSubmit,
  };
}

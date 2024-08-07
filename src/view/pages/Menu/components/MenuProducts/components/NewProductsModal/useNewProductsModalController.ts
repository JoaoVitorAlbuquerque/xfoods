import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productsService } from "../../../../../../../app/services/productsService";
import { CreateProductParams } from "../../../../../../../app/services/productsService/create";
import toast from "react-hot-toast";
import { categoriesService } from "../../../../../../../app/services/categoriesService";

export function useNewProductsModalController() {
  const schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Nome do produto é obrigatório!'),
    imagePath: z.string().min(1, 'Imagem do produto é obrigatória!'),
    description: z.string().max(110, 'Máximo de caracteres atingidos!'),
    price: z.number().min(1, 'Preço do produto é obrigatório!'),
    category: z.string(),
    ingredientIds: z.array(
      z.string(),
    ),
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
    mutationFn: async (data: CreateProductParams) => {
      return productsService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto criado com sucesso!');
      // handleCloseNewCategoryModal();
      reset();
    } catch {
      toast.error('Erro ao criar o produto!');
    }
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  return {
    register,
    errors,
    handleSubmit,
    isPending,
    isSuccess,
    data,
    isFetching,
  };
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productsService } from "../../../../../../../app/services/productsService";
import { CreateProductParams } from "../../../../../../../app/services/productsService/create";
import toast from "react-hot-toast";
import { categoriesService } from "../../../../../../../app/services/categoriesService";
import { useState } from "react";
import { ingredientsService } from "../../../../../../../app/services/ingredientsService";

export function useNewProductsModalController(onClose: () => void) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/'];

  const schema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório!'),
    // imagePath: z.string().min(1, 'Imagem é obrigatória!'),
    imagePath: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, 'O arquivo deve ter no máximo 5MB.')
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Formato de imagem não suportado.'),
    description: z.string().max(110, 'Máximo de caracteres atingidos!'),
    price: z.string().min(1, 'Preço do produto é obrigatório!'),
    category: z.string().min(1, 'Categoria é obrigatória!'),
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
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingredientIds: [],
      imagePath: undefined,
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync, isSuccess } = useMutation({
    mutationFn: async (data: CreateProductParams) => {
      console.log('useMutation', { data });

      return productsService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log({ data });

      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto criado com sucesso!');
      onClose();
      reset();
    } catch {
      toast.error('Erro ao criar o produto!');
    }
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // Request de listagem com useQuery
  const { data: dataIngredients = [] } = useQuery({
    queryKey: ['ingredients'],
    queryFn: ingredientsService.getAll,
  });

  // Filtrando os itens de acordo com o termo de busca
  const filteredIngredients = dataIngredients?.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    register,
    errors,
    handleSubmit,
    isPending,
    isSuccess,
    data,
    isFetching,
    control,
    searchTerm,
    setSearchTerm,
    filteredIngredients,
    dataIngredients,
  };
}

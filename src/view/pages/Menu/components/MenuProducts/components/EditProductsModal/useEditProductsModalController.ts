import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productsService } from "../../../../../../../app/services/productsService";
import { UpdateProductsParams } from "../../../../../../../app/services/productsService/update";
import toast from "react-hot-toast";
import { Product } from "../../../../../../../types/Product";
import { categoriesService } from "../../../../../../../app/services/categoriesService";
import { useEffect } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/'];

  const schema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório!'),
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

export function useEditProductsModalController(onClose: () => void, selectedProduct: Product | null) {
  const {
    control,
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedProduct?.name,
      description: selectedProduct?.description,
      imagePath: selectedProduct?.imagePath,
      price: selectedProduct?.price,
      category: selectedProduct?.category,
      ingredientIds: selectedProduct?.ingredientIds || [],
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      reset({
        name: selectedProduct.name || '',
        description: selectedProduct.description || '',
        imagePath: selectedProduct.imagePath || undefined,
        price: selectedProduct.price || '',
        category: selectedProduct.category || '',
        ingredientIds: selectedProduct.ingredientIds || [],
      });
    }
  }, [selectedProduct, reset]);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateProductsParams) => {
      return productsService.update(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: selectedProduct!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto editado com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  return {
    control,
    errors,
    isPending,
    data,
    isFetching,
    register,
    handleSubmit,
  };
}

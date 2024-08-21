import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { User } from "../../../../../types/Users";
import { usersService } from "../../../../../app/services/usersService";
import { UpdateUsersParams } from "../../../../../app/services/usersService/update";

const schema = z.object({
  name: z.string().min(1, 'Nome da categoria é obrigatória'),
  email: z.string().email('E-mail inválido!').min(1, 'Ícone da categoria é obrigatória'),
  role: z.string().min(1, 'Cargo do funcionário é obrigatório!'),
  // role: z.enum(['ADMIN', 'WAITER']).default("WAITER"),
});

type FormData = z.infer<typeof schema>;

const roleList = [
  {
    id: 'ADMIN',
    name: 'Admin',
  },
  {
    id: 'WAITER',
    name: 'Garçom',
  },
];

export function useEditUserModalController(onClose: () => void, selectedUser: User | null) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: selectedUser?.name,
      email: selectedUser?.email,
      role: selectedUser?.role
    },
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: UpdateUsersParams) => {
      return usersService.update(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: selectedUser!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Categoria editada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao salvar as alterações!');
    }
  });

  return {
    control,
    errors,
    isPending,
    roleList,
    register,
    handleSubmit,
  };
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usersService } from "../../../../../app/services/usersService";
import { CreateUserParams } from "../../../../../app/services/usersService/create";
import toast from "react-hot-toast";

type Role = Array<{
  value: string;
  label: string;
}>;

const schema = z.object({
  name: z.string().min(1, 'Nome do usuário é obrigatório!'),
  email: z.string().email().min(1, 'E-mail é obrigatório!'),
  password: z.string().min(1, 'Senha é obrigatória!'),
  role: z.string().min(1, 'Cargo é obrigatório!'),
});

type FormData = z.infer<typeof schema>;

export function useNewUserModalController(onClose: () => void) {
  const userRole: Role = [
    {
      value: 'ADMIN',
      label: 'Admin',
    },
    {
      value: 'WAITER',
      label: 'Garçom',
    },
  ];

  const {
    control,
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: CreateUserParams) => {
      console.log('mutationFn', { data });
      return usersService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log({ data });
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: ['usersCreate'] });
      toast.success('Usuário criado com sucesso!');
      onClose();
      reset();
    } catch {
      toast.error('Erro ao criar o usuário!');
    }
  });

  return {
    userRole,
    control,
    errors,
    isPending,
    register,
    handleSubmit,
  };
}

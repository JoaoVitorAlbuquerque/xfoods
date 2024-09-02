import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { User } from "../../../../../types/Users";
import { usersService } from "../../../../../app/services/usersService";

export function useDeleteUserModalController(onCloseDeleteUserModal: () => void, selectedUser: User | null) {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (userId: string) => {
      return usersService.remove(userId);
    },
  });

  const handleDeleteUser = useCallback(async () => {
    try {
      await mutateAsync(selectedUser!.id);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuário foi deletado com sucesso!');
      onCloseDeleteUserModal();
    } catch {
      toast.error('Erro ao deletar o usuário!');
    }
  }, [selectedUser, mutateAsync, onCloseDeleteUserModal, queryClient]);

  return {
    isPending,
    handleDeleteUser,
  };
}

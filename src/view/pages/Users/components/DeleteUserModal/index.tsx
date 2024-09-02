import { User } from "../../../../../types/Users";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { useDeleteUserModalController } from "./useDeleteUserModalController";

interface DeleteUserModalProps {
  visible: boolean;
  onCloseDeleteUserModal(): void;
  user: User | null;
  selectedUser: User | null;
}

export function DeleteUserModal({ visible, onCloseDeleteUserModal, user, selectedUser }: DeleteUserModalProps) {
  const {
    isPending,
    handleDeleteUser,
  } = useDeleteUserModalController(onCloseDeleteUserModal, selectedUser);

  if (!visible || !user) {
    return null;
  }

  const role = user.role === 'ADMIN' ? 'Admin' : 'Garçom';

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onCloseDeleteUserModal}
        title="Excluir Usuário"
      >
        <div className="space-y-8">

          <span
            className="flex items-center justify-center text-gray-500 font-medium"
          >
            Tem certeza que deseja excluir o usuário?
          </span>

          <div className="space-y-2">
            <Input
              name="name"
              placeholder="Nome do usuário"
              onChange={() => ('')}
              value={user.name}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Input
              name="email"
              placeholder="E-mail do usuário"
              onChange={() => ('')}
              value={user.email}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Input
              name="role"
              placeholder="Cargo do usuário"
              onChange={() => ('')}
              value={role}
              disabled
            />
          </div>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={onCloseDeleteUserModal}
            className="py-3 font-bold text-red-800"
          >
            Manter Usuário
          </button>

          <Button
            onClick={handleDeleteUser}
            isLoading={isPending}
          >
            Excluir Usuário
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

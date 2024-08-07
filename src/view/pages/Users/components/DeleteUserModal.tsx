import { User } from "../../../../types/Users";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";

interface DeleteUserModalProps {
  visible: boolean;
  onCloseDeleteUserModal(): void;
  user: User | null;
}

export function DeleteUserModal({ visible, onCloseDeleteUserModal, user }: DeleteUserModalProps) {
  if (!visible || !user) {
    return null;
  }

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
            {/* <span className="text-gray-500 font-normal text-sm">Nome</span> */}
            <Input
              type="text"
              name="name"
              placeholder="Nome do usuário"
              value={user.name}
              // className="bg-gray-400"
              disabled
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">E-mail</span> */}
            <Input
              type="email"
              name="email"
              placeholder="E-mail do usuário"
              value={user.email}
              // className="bg-gray-400"
              disabled
            />
          </div>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="py-3 font-bold text-red-800"
          >
            Manter Usuário
          </button>

          <Button>
            Excluir Usuário
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

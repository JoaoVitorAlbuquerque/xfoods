import { User } from "../../../../types/Users";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";

interface EditUserModalProps {
  visible: boolean;
  onClose(): void;
  user: User | null;
}

export function EditUserModal({ visible, onClose, user }: EditUserModalProps) {
  if (!visible || !user) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        title="Editar Usuário"
        visible={visible}
        onClose={onClose}
      >
        <div className="space-y-8" key={user.id}>
          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Nome</span> */}
            <Input
              type="text"
              name="name"
              placeholder="Nome do usuário"
              value={user.name}
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">E-mail</span> */}
            <Input
              type="email"
              name="email"
              placeholder="E-mail do usuário"
              value={user.email}
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Senha</span> */}
            <Input
              type="password"
              name="password"
              placeholder="Senha do usuário"
              value={user.password}
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Tipo</span> */}
            <Select>
              <option
                value={user.rule}
                className="text-lg font-semibold"
              >
                Admin
              </option>

              <option
                value={user.rule}
                className="text-lg font-semibold"
              >
                Garçom
              </option>
            </Select>
          </div>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="py-3 font-bold text-red-800"
          >
            Excluir Usuário
          </button>

          <Button>
            Salvar Alterações
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

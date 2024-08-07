import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Modal } from "../../../components/Modal";
import { Select } from "../../../components/Select";

interface NewUserModalProps {
  visible: boolean;
  onClose(): void;
}

export function NewUserModal({ visible, onClose }: NewUserModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        title="Novo Usuário"
        visible={visible}
        onClose={onClose}
      >
        <div className="space-y-8">
          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Nome</span> */}
            <Input
              type="text"
              name="name"
              placeholder="Nome"
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">E-mail</span> */}
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Senha</span> */}
            <Input
              type="password"
              name="password"
              placeholder="Senha"
            />
          </div>

          <div className="space-y-2">
            {/* <span className="text-gray-500 font-normal text-sm">Tipo</span> */}
            <Select>
              <option value="">Selecione um Tipo</option>

              <option
                value="admin"
                className="text-lg font-semibold"
              >
                Admin
              </option>

              <option
                value="waiter"
                className="text-lg font-semibold"
              >
                Garçom
              </option>
            </Select>
          </div>
        </div>

        <footer className="flex items-center justify-end mt-8">
          <Button>
            Cadastrar Usuário
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

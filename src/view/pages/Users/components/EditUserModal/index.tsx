import { Controller } from "react-hook-form";
import { User } from "../../../../../types/Users";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { RadixSelect } from "../../../../components/RadixSelect";
// import { Select } from "../../../../components/Select";
import { useEditUserModalController } from "./useEditUserModalController";

interface EditUserModalProps {
  visible: boolean;
  onClose(): void;
  user: User | null;
  selectedUser: User | null;
}

export function EditUserModal({ visible, onClose, user, selectedUser }: EditUserModalProps) {
  const {
    control,
    isPending,
    errors,
    roleList,
    handleSubmit,
    register,
  } = useEditUserModalController(onClose, selectedUser);

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
        <form onSubmit={handleSubmit}>
          <div className="space-y-8" key={user.id}>
            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Nome</span>
              <Input
                type="text"
                placeholder="Nome do usuário"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">E-mail</span>
              <Input
                type="email"
                placeholder="E-mail do usuário"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Senha</span>
              <Input
                type="password"
                placeholder="Senha do usuário"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Cargo</span>
              <Controller
                control={control}
                name="role"
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <RadixSelect
                    placeholder="Selecione uma categoria"
                    onChange={onChange}
                    value={value}
                    // disabled={isLoadingCategories}
                    error={errors.role?.message}
                    options={roleList.map((role) => ({
                      value: role.value,
                      label: role.label,
                    }))}
                  />
                )}
              />
            </div>
          </div>

          <footer className="flex items-center justify-between mt-8">
            <button
              type="button"
              className="py-3 font-bold text-red-800"
            >
              Excluir Usuário
            </button>

            <Button isLoading={isPending}>
              Salvar Alterações
            </Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}

import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Modal } from "../../../../components/Modal";
import { RadixSelect } from "../../../../components/RadixSelect";
import { useNewUserModalController } from "./useNewUserModalController";

interface NewUserModalProps {
  visible: boolean;
  onClose(): void;
}

export function NewUserModal({ visible, onClose }: NewUserModalProps) {
  const {
    userRole,
    control,
    errors,
    isPending,
    handleSubmit,
    register,
  } = useNewUserModalController(onClose);

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
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Nome"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="role"
                render={({ field: { value, onChange } }) => (
                  <RadixSelect
                    placeholder="Selecione um cargo"
                    onChange={onChange}
                    value={value}
                    error={errors.role?.message}
                    options={userRole.map(role => ({
                      value: role.value,
                      label: role.label,
                    }))}
                  />
                )}
              />
            </div>
          </div>

          <footer className="flex items-center justify-end mt-8">
            <Button isLoading={isPending}>
              Cadastrar Usuário
            </Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}

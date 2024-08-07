import { Button } from "../../../../../../components/Button";
import { Input } from "../../../../../../components/Input";
import { Modal } from "../../../../../../components/Modal";
import { useNewCategoryModalController } from "./useNewCategoryModalController";

interface NewCategoryModalProps {
  visible: boolean;
  onClose(): void;
}

export function NewCategoryModal({ visible, onClose }: NewCategoryModalProps) {
  const { register, errors, handleSubmit, isPending } = useNewCategoryModalController();

  if (!visible) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onClose}
        title="Nova Categoria"
      >
        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Ícone</span>
              <Input
                type="text"
                placeholder="Ex: 🍕"
                error={errors.icon?.message}
                {...register('icon')}
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Nome da Categoria</span>
              <Input
                type="text"
                placeholder="Ex: Quatro Queijos"
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            <footer className="flex items-center justify-end mt-8">
              <Button isLoading={isPending}>
                Salvar Alterações
              </Button>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}

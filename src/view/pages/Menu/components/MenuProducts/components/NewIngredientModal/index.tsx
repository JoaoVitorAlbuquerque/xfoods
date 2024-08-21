import { Button } from "../../../../../../components/Button";
import { Input } from "../../../../../../components/Input";
import { Modal } from "../../../../../../components/Modal";
import { useNewIngredientModalController } from "./useNewIngredientModalController";

interface NewIngredientModalProps {
  visible: boolean;
  onClose(): void;
}

export function NewIngredientModal({ visible, onClose }: NewIngredientModalProps) {
  const {
    register,
    errors,
    handleSubmit,
    isPending,
  } = useNewIngredientModalController(onClose);

  if (!visible) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onClose}
        title="Novo Ingrediente"
      >
        <div className="space-y-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-2"
          >
            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Emoji</span>
              <Input
                type="text"
                placeholder="Ex: 🧀"
                {...register('icon')}
                error={errors.icon?.message}
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Nome do Ingrediente</span>
              <Input
                type="text"
                placeholder="Ex: Quatro Queijos"
                {...register('name')}
                error={errors.name?.message}
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

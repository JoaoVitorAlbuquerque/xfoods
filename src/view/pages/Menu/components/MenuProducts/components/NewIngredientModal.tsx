import { Button } from "../../../../../components/Button";
import { Input } from "../../../../../components/Input";
import { Modal } from "../../../../../components/Modal";

interface NewIngredientModalProps {
  visible: boolean;
  onClose(): void;
}

export function NewIngredientModal({ visible, onClose }: NewIngredientModalProps) {
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
          <form>
            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Emoji</span>
              <Input
                name=""
                placeholder="Ex: 🧀"
              />
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Nome do Ingrediente</span>
              <Input
                name=""
                placeholder="Ex: Quatro Queijos"
              />
            </div>

            <footer className="flex items-center justify-end mt-8">
              <Button>
                Salvar Alterações
              </Button>
            </footer>
          </form>
        </div>
      </Modal>
    </div>
  );
}

import { Category } from "../../../../../../../types/Category";
import { Button } from "../../../../../../components/Button";
import { Modal } from "../../../../../../components/Modal";
import { useDeleteCategoryModalController } from "./useDeleteCategoryModalController";

interface DeleteCategoryModalProps {
  visible: boolean;
  onClose(): void;
  category: Category | null;
  selectedCategory: Category | null;
}

export function DeleteCategoryModal({ visible, onClose, category, selectedCategory }: DeleteCategoryModalProps) {
  const { handleDeleteCategory, isPending } = useDeleteCategoryModalController(selectedCategory, onClose);

  if (!visible || !category) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onClose}
        title="Excluir Categoria"
      >
        <div className="flex flex-col items-center gap-6" key={category.id}>
          <span className="text-gray-400 font-medium">Tem certeza que deseja excluir a categoria?</span>

          <div className="space-x-2 text-gray-500 font-normal text-sm">
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </div>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            onClick={onClose}
            type="button"
            className="py-3 font-bold text-red-800"
            disabled={isPending}
          >
            Manter Categoria
          </button>

          <Button
            onClick={handleDeleteCategory}
            isLoading={isPending}
          >
            Excluir Categoria
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

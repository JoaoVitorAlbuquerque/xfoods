import { Category } from "../../../../../../../types/Category";
import { Button } from "../../../../../../components/Button";
import { Input } from "../../../../../../components/Input";
import { Modal } from "../../../../../../components/Modal";
import { useDeleteCategoryModalController } from "../DeleteCategoryModal/useDeleteCategoryModalController";
import { useEditCategoriesModalController } from "./useEditCategoriesModalController";

interface EditCategoriesModalProps {
  visible: boolean;
  onClose(): void;
  category: Category | null;
  selectedCategory: Category;
}

export function EditCategoriesModal({
  visible,
  onClose,
  category,
  selectedCategory,
}: EditCategoriesModalProps) {
  const {
    register,
    errors,
    handleSubmit,
    isPending,
  } = useEditCategoriesModalController(selectedCategory, onClose);

  const {
    handleDeleteCategory,
    isPending: isPendingDeleteCategory
  } = useDeleteCategoryModalController(selectedCategory, onClose);

  if (!visible || !category) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onClose}
        title="Editar Categoria"
      >
        <div key={category.id}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Emoji</span>
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

            <footer className="flex items-center justify-between mt-8">
              <button
                onClick={handleDeleteCategory}
                disabled={isPendingDeleteCategory}
                type="button"
                className="py-3 font-bold text-red-800"
              >
                Excluir Categoria
              </button>

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

import { ContentHeader } from "../../../../components/ContentHeader";
import { CategoriesTable } from "./components/CategoriesTable";
import { EditCategoriesModal } from "./components/EditCategoriesModal";
import { NewCategoryModal } from "./components/NewCategoryModal";
import { DeleteCategoryModal } from "./components/DeleteCategoryModal";

import { useMenuCategoriesController } from "./useMenuCategoriesController";
import { Spinner } from "../../../../components/Spinner";

export function MenuCategories() {
  const {
    data: categories,
    isFetching,
    selectedCategory,
    isNewCategoryModalVisible,
    isEditCategoriesModalVisible,
    isDeleteCategoryModalVisible,
    handleCloseDeleteCategoryModal,
    handleCloseEditCategoryModal,
    handleCloseNewCategoryModal,
    handleOpenDeleteCategoryModal,
    handleOpenEditCategoryModal,
    handleOpenNewCategoryModal,
  } = useMenuCategoriesController();

  return (
    <>
      <NewCategoryModal
        visible={isNewCategoryModalVisible}
        onClose={handleCloseNewCategoryModal}
      />

      {selectedCategory && (
        <EditCategoriesModal
          visible={isEditCategoriesModalVisible}
          onClose={handleCloseEditCategoryModal}
          category={selectedCategory}
          selectedCategory={selectedCategory}
        />
      )}

      <DeleteCategoryModal
        visible={isDeleteCategoryModalVisible}
        onClose={handleCloseDeleteCategoryModal}
        category={selectedCategory}
        selectedCategory={selectedCategory}
      />

      <ContentHeader
        title="Categorias"
        quantity={categories.length}
      >
        <button
          type="button"
          onClick={handleOpenNewCategoryModal}
          className="text-red-600 font-bold text-sm pt-1"
        >
          Nova Categoria
        </button>
      </ContentHeader>

      {isFetching ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <CategoriesTable
          onOpenEditCategoryModal={handleOpenEditCategoryModal}
          onOpenDeleteCategoryModal={handleOpenDeleteCategoryModal}
          categories={categories}
        />
      )}
    </>
  );
}

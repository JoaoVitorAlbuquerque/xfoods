import { ContentHeader } from "../../../../components/ContentHeader";
import { MenuProductsTable } from "./components/MenuProductsTable";
import { NewProductsModal } from "./components/NewProductsModal";
import { NewIngredientModal } from "./components/NewIngredientModal";
import { DeleteProductModal } from "./components/DeleteProductModal";
import { useMenuProductsController } from "./useMenuProductsController";
import { Spinner } from "../../../../components/Spinner";

export function MenuProducts() {
  const {
    data: products,
    isFetching,
    isDeleteProductModalVisible,
    isMenuProductsModalVisible,
    isNewIngredientModalVisible,
    selectedProduct,
    handleCloseDeleteProductModal,
    handleCloseNewIngredientModal,
    handleCloseNewProductsModal,
    handleOpenDeleteProductModal,
    handleOpenNewIngredientModal,
    handleOpenNewProductsModal,
  } = useMenuProductsController();

  return (
    <>
      <NewProductsModal
        visible={isMenuProductsModalVisible}
        product={null}
        onClose={handleCloseNewProductsModal}
        onOpenNewIngredientModal={handleOpenNewIngredientModal}
      />

      <NewIngredientModal
        visible={isNewIngredientModalVisible}
        onClose={handleCloseNewIngredientModal}
      />

      <DeleteProductModal
        visible={isDeleteProductModalVisible}
        onClose={handleCloseDeleteProductModal}
        product={selectedProduct}
      />

      <ContentHeader
        title="Produtos"
        quantity={products.length}
      >
        <button
          type="button"
          onClick={handleOpenNewProductsModal}
          className="text-red-600 font-bold text-sm pt-1"
        >
          Novo Produto
        </button>
      </ContentHeader>

      {isFetching ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <MenuProductsTable
          products={products}
          onOpenDeleteProductModal={handleOpenDeleteProductModal}
        />
      )}
    </>
  );
}

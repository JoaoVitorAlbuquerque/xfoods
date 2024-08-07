import { useState } from "react";
import { Product } from "../../../../../types/Product";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "../../../../../app/services/productsService";

export function useMenuProductsController() {
  const [isMenuProductsModalVisible, setIsMenuProductsModalVisible] = useState(false);
  const [isNewIngredientModalVisible, setIsNewIngredientModalVisible] = useState(false);
  const [isDeleteProductModalVisible, setIsDeleteProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenNewProductsModal() {
    setIsMenuProductsModalVisible(true);
  }

  function handleCloseNewProductsModal() {
    setIsMenuProductsModalVisible(false);
  }

  function handleOpenNewIngredientModal() {
    setIsNewIngredientModalVisible(true);
    setIsMenuProductsModalVisible(false);
  }

  function handleCloseNewIngredientModal() {
    setIsNewIngredientModalVisible(false);
    setIsMenuProductsModalVisible(true);
  }

  function handleOpenDeleteProductModal(products: Product) {
    setIsDeleteProductModalVisible(true);
    setSelectedProduct(products);
  }

  function handleCloseDeleteProductModal() {
    setIsDeleteProductModalVisible(false);
    setSelectedProduct(null);
  }

  const { data = [], isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: productsService.getAll,
  });

  return {
    isMenuProductsModalVisible,
    isNewIngredientModalVisible,
    isDeleteProductModalVisible,
    selectedProduct,
    handleOpenNewProductsModal,
    handleCloseNewProductsModal,
    handleOpenNewIngredientModal,
    handleCloseNewIngredientModal,
    handleOpenDeleteProductModal,
    handleCloseDeleteProductModal,
    data,
    isFetching,
  };
}

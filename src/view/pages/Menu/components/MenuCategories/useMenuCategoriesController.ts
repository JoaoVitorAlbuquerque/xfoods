import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../../../../../app/services/categoriesService";
import { Category } from "../../../../../types/Category";
import { useCallback, useState } from "react";

export function useMenuCategoriesController() {
  const [isEditCategoriesModalVisible, setIsEditCategoriesModalVisible] = useState(false);
  const [isNewCategoryModalVisible, seiIsNewCategoryModalVisible] = useState(false);
  const [isDeleteCategoryModalVisible, setIsDeleteCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleOpenEditCategoryModal = useCallback((category: Category) => {
    setIsEditCategoriesModalVisible(true);
    setSelectedCategory(category);
  }, []);

  const handleCloseEditCategoryModal = useCallback(() => {
    setIsEditCategoriesModalVisible(false);
    setSelectedCategory(null);
  }, []);

  const handleOpenNewCategoryModal = useCallback(() => {
    seiIsNewCategoryModalVisible(true);
  }, []);

  const handleCloseNewCategoryModal = useCallback(() => {
    seiIsNewCategoryModalVisible(false);
  }, []);

  const handleOpenDeleteCategoryModal = useCallback((category: Category) => {
    setIsDeleteCategoryModalVisible(true);
    setSelectedCategory(category);
  }, []);

  const handleCloseDeleteCategoryModal = useCallback(() => {
    setIsDeleteCategoryModalVisible(false);
    setSelectedCategory(null);
  }, []);

  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  return {
    data,
    isFetching,
    isEditCategoriesModalVisible,
    isNewCategoryModalVisible,
    isDeleteCategoryModalVisible,
    selectedCategory,
    handleOpenEditCategoryModal,
    handleCloseEditCategoryModal,
    handleOpenNewCategoryModal,
    handleCloseNewCategoryModal,
    handleOpenDeleteCategoryModal,
    handleCloseDeleteCategoryModal,
  };
}

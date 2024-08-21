import { useState } from "react";
import { Product } from "../../../../../../types/Product";
import { formatCurrency } from "../../../../../../app/utils/formatCurrency";
import { ActionButton } from "../../../../../components/ActionButton";
import { TableComponents } from "../../../../../components/TableElements";

import editIcon from '../../../../../components/icons/edit-icon.svg';
import trashIcon from '../../../../../components/icons/trash-icon.svg';
import { EditProductsModal } from "./EditProductsModal";
import { NewIngredientModal } from "./NewIngredientModal";

interface MenuProductsTableProps {
  products: Product[];
  onOpenDeleteProductModal(product: Product): void;
}

export function MenuProductsTable({ products, onOpenDeleteProductModal }: MenuProductsTableProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isNewIngredientModalVisible, setIsNewIngredientModalVisible] = useState(false);

  function handleOpenEditProductModal(product: Product) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }

  function handleCloseEditProductModal() {
    setIsProductModalVisible(false);
    setSelectedProduct(null);
  }

  function handleOpenNewIngredientModal() {
    setIsNewIngredientModalVisible(true);
    setIsProductModalVisible(false);
  }

  function handleCloseNewIngredientModal() {
    setIsNewIngredientModalVisible(false);
    setIsProductModalVisible(true);
  }

  return (
    <>
      <EditProductsModal
        visible={isProductModalVisible}
        product={selectedProduct}
        selectedProduct={selectedProduct}
        onClose={handleCloseEditProductModal}
        onOpenNewIngredientModal={handleOpenNewIngredientModal}
      />

      <NewIngredientModal
        visible={isNewIngredientModalVisible}
        onClose={handleCloseNewIngredientModal}
      />

      <TableComponents.Table>
        <thead>
          <tr className="bg-gray-600/20">
            <TableComponents.TableHeader>
              Imagem
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Nome
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Categoria
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Preço
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Ações
            </TableComponents.TableHeader>
          </tr>
        </thead>

        <tbody>
         {products.map(product => (
           <TableComponents.TableRow key={product.id}>
            <TableComponents.TableCell>
              <img
                src={`http://localhost:3000/uploads/${product.imagePath}`}
                alt={product.name}
                className="w-12 h-8 rounded-md"
              />
            </TableComponents.TableCell>

            <TableComponents.TableCell>
              {product.name}
            </TableComponents.TableCell>

            <TableComponents.TableCell>
              <span>{product.category.icon}</span>
              <span>{product.category.name}</span>
            </TableComponents.TableCell>

            <TableComponents.TableCell>
              {formatCurrency(Number(product.price))}
            </TableComponents.TableCell>

            <TableComponents.TableCell>
              <ActionButton onClick={() => handleOpenEditProductModal(product)}>
                <img src={editIcon} />
              </ActionButton>

              <ActionButton onClick={() => onOpenDeleteProductModal(product)}>
                <img src={trashIcon} />
              </ActionButton>
            </TableComponents.TableCell>
          </TableComponents.TableRow>
         ))}
        </tbody>
      </TableComponents.Table>
    </>
  );
}

import { Category } from "../../../../../../types/Category";
import { ActionButton } from "../../../../../components/ActionButton";
import { TableComponents } from "../../../../../components/TableElements";

import editIcon from '../../../../../components/icons/edit-icon.svg';
import trashIcon from '../../../../../components/icons/trash-icon.svg';

interface CategoriesTableProps {
  onOpenEditCategoryModal(category: Category): void;
  onOpenDeleteCategoryModal(category: Category): void;
  categories: Category[];
}

export function CategoriesTable({ onOpenEditCategoryModal, onOpenDeleteCategoryModal, categories }: CategoriesTableProps) {
  return (
    <>
      <TableComponents.Table>
        <thead>
          <tr className="bg-gray-600/20">
            <TableComponents.TableHeader>Emoji</TableComponents.TableHeader>
            <TableComponents.TableHeader>Nome</TableComponents.TableHeader>
            <TableComponents.TableHeader>Ações</TableComponents.TableHeader>
          </tr>
        </thead>

        {categories.map(category => (
          <tbody key={category.id}>
            <TableComponents.TableRow>
              <TableComponents.TableCell>{category.icon}</TableComponents.TableCell>

              <TableComponents.TableCell className="">{category.name}</TableComponents.TableCell>

              <TableComponents.TableCell>
                <ActionButton onClick={() => onOpenEditCategoryModal(category)}>
                  <img src={editIcon} />
                </ActionButton>

                <ActionButton onClick={() => onOpenDeleteCategoryModal(category)}>
                  <img src={trashIcon} />
                </ActionButton>
              </TableComponents.TableCell>
            </TableComponents.TableRow>
          </tbody>
        ))}
      </TableComponents.Table>
    </>
  );
}

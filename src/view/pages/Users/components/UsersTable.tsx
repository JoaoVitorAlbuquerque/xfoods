import { User } from "../../../../types/Users";
import { ActionButton } from "../../../components/ActionButton";
import { TableComponents } from "../../../components/TableElements";

import editIcon from '../../../components/icons/edit-icon.svg';
import trashIcon from '../../../components/icons/trash-icon.svg';

interface UsersTableProps {
  users: User[];
  onOpenEditUserModal(user: User): void;
  onOpenDeleteUserModal(user: User): void;
}

export function UsersTable({ onOpenEditUserModal, onOpenDeleteUserModal, users }: UsersTableProps) {
  return (
    <div className="flex-1">
      <TableComponents.Table>
        <thead>
          <tr className="bg-gray-600/20">
            <TableComponents.TableHeader>Nome</TableComponents.TableHeader>
            <TableComponents.TableHeader>E-mail</TableComponents.TableHeader>
            <TableComponents.TableHeader>Cargo</TableComponents.TableHeader>
            <TableComponents.TableHeader>Ações</TableComponents.TableHeader>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <TableComponents.TableRow key={user.id}>
              <TableComponents.TableCell>{user.name}</TableComponents.TableCell>
              <TableComponents.TableCell>{user.email}</TableComponents.TableCell>
              <TableComponents.TableCell>{user.rule}</TableComponents.TableCell>
              <TableComponents.TableCell className="flex items-center gap-4">
                  <ActionButton onClick={() => onOpenEditUserModal(user)}>
                    <img src={editIcon} />
                  </ActionButton>

                  <ActionButton onClick={() => onOpenDeleteUserModal(user)}>
                    <img src={trashIcon} />
                  </ActionButton>
                </TableComponents.TableCell>
            </TableComponents.TableRow>
          ))}
        </tbody>
      </TableComponents.Table>
    </div>
  );
}

import { useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import { Header } from "../../components/Header";
import { UserIcon } from "../../components/icons/UserIcon";
import { UsersTable } from "./components/UsersTable";
import { NewUserModal } from "./components/NewUserModal";
import { EditUserModal } from "./components/EditUserModal";
import { DeleteUserModal } from "./components/DeleteUserModal";

import { users } from '../../../mocks/Users';
import { User } from "../../../types/Users";

export function Users() {
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleOpenNewUserModal() {
    setIsNewUserModalVisible(true);
  }

  function handleCloseNewUserModal() {
    setIsNewUserModalVisible(false);
  }

  function handleOpenEditUserModal(user: User) {
    setIsEditUserModalVisible(true);
    setSelectedUser(user);
  }

  function handleCloseEditUserModal() {
    setIsEditUserModalVisible(false);
    setSelectedUser(null);
  }

  function handleOpenDeleteUserModal(user: User) {
    setIsDeleteUserModalVisible(true);
    setSelectedUser(user);
  }

  function handleCloseDeleteUserModal() {
    setIsDeleteUserModalVisible(false);
    setSelectedUser(null);
  }

  return (
    <>
      <NewUserModal
        visible={isNewUserModalVisible}
        onClose={handleCloseNewUserModal}
      />

      <EditUserModal
        visible={isEditUserModalVisible}
        onClose={handleCloseEditUserModal}
        user={selectedUser}
      />

      <DeleteUserModal
        visible={isDeleteUserModalVisible}
        onCloseDeleteUserModal={handleCloseDeleteUserModal}
        user={selectedUser}
      />

      <Header
        icon={<UserIcon className="w-8 h-8" />}
        description="Cadastre e gerencie seus usuários"
      >
        Usuários
      </Header>

      <ContentHeader
        title="Usuários"
        quantity={users.length}
      >
        <button
          type="button"
          onClick={handleOpenNewUserModal}
          className="text-red-600 font-bold text-sm pt-1"
        >
          Novo Usuário
        </button>
      </ContentHeader>

      <UsersTable
        users={users}
        onOpenEditUserModal={handleOpenEditUserModal}
        onOpenDeleteUserModal={handleOpenDeleteUserModal}
      />
    </>
  );
}

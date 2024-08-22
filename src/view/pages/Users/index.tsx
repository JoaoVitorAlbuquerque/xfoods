import { ContentHeader } from "../../components/ContentHeader";
import { Header } from "../../components/Header";
import { UserIcon } from "../../components/icons/UserIcon";
import { UsersTable } from "./components/UsersTable";
import { NewUserModal } from "./components/NewUserModal";
import { EditUserModal } from "./components/EditUserModal";
import { DeleteUserModal } from "./components/DeleteUserModal";

import { useUsersController } from "./useUsersController";
import { Spinner } from "../../components/Spinner";

export function Users() {
  const {
    selectedUser,
    isNewUserModalVisible,
    isEditUserModalVisible,
    isDeleteUserModalVisible,
    handleCloseDeleteUserModal,
    handleCloseEditUserModal,
    handleCloseNewUserModal,
    handleOpenDeleteUserModal,
    handleOpenEditUserModal,
    handleOpenNewUserModal,
    data: users,
    isFetching,
  } = useUsersController();

  return (
    <>
      <NewUserModal
        visible={isNewUserModalVisible}
        onClose={handleCloseNewUserModal}
      />

      {selectedUser && (
        <EditUserModal
          visible={isEditUserModalVisible}
          onClose={handleCloseEditUserModal}
          user={selectedUser}
          selectedUser={selectedUser}
        />
      )}

      <DeleteUserModal
        visible={isDeleteUserModalVisible}
        onCloseDeleteUserModal={handleCloseDeleteUserModal}
        user={selectedUser}
        selectedUser={selectedUser}
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

      {isFetching ? (
        <div className="flex items-center justify-center flex-1">
          <Spinner />
        </div>
      ) : (
        <UsersTable
          users={users}
          onOpenEditUserModal={handleOpenEditUserModal}
          onOpenDeleteUserModal={handleOpenDeleteUserModal}
        />
      )}
    </>
  );
}

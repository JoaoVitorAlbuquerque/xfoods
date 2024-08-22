import { useCallback, useState } from "react";
import { User } from "../../../types/Users";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../../app/services/usersService";

export function useUsersController() {
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

  const handleOpenEditUserModal = useCallback((user: User) => {
    setSelectedUser(user);
    setIsEditUserModalVisible(true);
  }, []);

  const handleCloseEditUserModal = useCallback(() => {
    setSelectedUser(null);
    setIsEditUserModalVisible(false);
  }, []);

  function handleOpenDeleteUserModal(user: User) {
    setSelectedUser(user);
    setIsDeleteUserModalVisible(true);
  }

  function handleCloseDeleteUserModal() {
    setSelectedUser(null);
    setIsDeleteUserModalVisible(false);
  }

  const { data = [], isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  return {
    isNewUserModalVisible,
    isEditUserModalVisible,
    isDeleteUserModalVisible,
    selectedUser,
    handleOpenNewUserModal,
    handleCloseNewUserModal,
    handleOpenEditUserModal,
    handleCloseEditUserModal,
    handleOpenDeleteUserModal,
    handleCloseDeleteUserModal,
    data,
    isFetching,
  };
}

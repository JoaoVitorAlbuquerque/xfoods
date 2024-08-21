import { useState } from "react";
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

  const { data = [], isFetching } = useQuery({
    queryKey: ['usersCreate'],
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

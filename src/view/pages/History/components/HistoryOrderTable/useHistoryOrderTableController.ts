import { useState } from "react";
import { Order } from "../../../../../types/Order";
// import { calculateTotalProducts } from "../../../../../app/utils/calculateTotalProducts";

export function useHistoryOrderTableController() {
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const order = orders.find(order => order !== null && order !== undefined) || null;
  // const total = calculateTotalProducts(order);

  function separator(products: string[]) {
    return products.slice(0, -1).join(', ') + (products.length > 1 ? ' & ': '') + products.slice(-1);
  }

  function handleOpenHistoryModal(order: Order) {
    setIsHistoryModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseHistoryModal() {
    setIsHistoryModalVisible(false);
    setSelectedOrder(null);
  }

  return {
    isHistoryModalVisible,
    selectedOrder,
    selectedDate,
    setSelectedDate,
    separator,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
  };
}

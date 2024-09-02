import { useState } from "react";
import { Order } from "../../../../../types/Order";
import { HistoryFilters } from "../../../../../app/services/historyService/getAll";
// import { orders } from "../../../../../mocks/Orders";
import { useQuery } from "@tanstack/react-query";
import { historyService } from "../../../../../app/services/historyService";
// import { calculateTotalProducts } from "../../../../../app/utils/calculateTotalProducts";

export function useHistoryOrderTableController() {
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [filters, setFilters] = useState<HistoryFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

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

  const { data: orders = [], isFetching, isSuccess } = useQuery({
    queryKey: ['history'],
    queryFn: () => historyService.getAll(filters),
  });

  return {
    isHistoryModalVisible,
    selectedOrder,
    selectedDate,
    setSelectedDate,
    separator,
    handleOpenHistoryModal,
    handleCloseHistoryModal,
    orders,
    isFetching,
    isSuccess,
    filters,
  };
}

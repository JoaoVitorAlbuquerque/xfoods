import { useState } from "react";
import { Order } from "../../../../types/Order";
import { ActionButton } from "../../../components/ActionButton";
import { ContentHeader } from "../../../components/ContentHeader";
import { TableComponents } from "../../../components/TableElements";
import { HistoryOrderModal } from "./HistoryOrderModal";

// import filterIcon from '../../../components/icons/filter-icon.svg';
import eyeIcon from '../../../components/icons/eye-icon.svg';
import trashIcon from '../../../components/icons/trash-icon.svg';
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { calculateTotalProducts } from "../../../../app/utils/calculateTotalProducts";
import { DatePickerButton } from "../../../components/DatePickerButton";
import { formatDate } from "../../../../app/utils/formatDate";

interface HistoryOrderTableProps {
  orders: Order[];
}

export function HistoryOrderTable({ orders }: HistoryOrderTableProps) {
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const order = orders.find(order => order !== null && order !== undefined) || null;
  const total = calculateTotalProducts(order);

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

  return (
    <div className="flex-1">
      <HistoryOrderModal
        visible={isHistoryModalVisible}
        order={selectedOrder}
        onClose={handleCloseHistoryModal}
      />

      <ContentHeader
        title="Pedidos"
        quantity={orders?.length}
      >
        <span className="text-sm text-gray-300/90 font-semibold">
          Mostrando pedidos do dia {formatDate(selectedDate)}
        </span>
      </ContentHeader>

      <TableComponents.Table>
        <thead>
          <tr className="bg-gray-600/20">
            <TableComponents.TableHeader>
              Mesa
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              <DatePickerButton
                selectedDate={selectedDate}
                setSelectDate={setSelectedDate}
              />
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Nome
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Categoria
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Total
            </TableComponents.TableHeader>

            <TableComponents.TableHeader>
              Ações
            </TableComponents.TableHeader>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <TableComponents.TableRow key={order.id}>
              <TableComponents.TableCell>{order.table}</TableComponents.TableCell>
              <TableComponents.TableCell>{formatDate(order.date)}</TableComponents.TableCell>
              <TableComponents.TableCell>{separator(order.products.map(p => p.product.name))}</TableComponents.TableCell>
              <TableComponents.TableCell>
                <span className="mr-1">🍕</span>
                <span>Pizza</span>
              </TableComponents.TableCell>
              <TableComponents.TableCell>{formatCurrency(total)}</TableComponents.TableCell>
              <TableComponents.TableCell className="flex items-center gap-4">
                <ActionButton onClick={() => handleOpenHistoryModal(order)}>
                  <img src={eyeIcon} />
                </ActionButton>

                <ActionButton onClick={() => alert('Clicou!')}>
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

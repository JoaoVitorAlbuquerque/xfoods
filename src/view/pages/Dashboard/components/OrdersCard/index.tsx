import { Order } from "../../../../../types/Order";
import { OrderModal } from "../OrderModal";
import { useOrdersCardController } from "./useOrdersCardController";

interface OrdersCardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersCard({ icon, title, orders }: OrdersCardProps) {
  const {
    selectedOrder,
    isModalVisible,
    handleCloseOrderModal,
    handleOpenOrderModal,
    isPending,
    handleCancelOrder,
    isPendingUpdate,
    handleUpdateOrderStatus,
  } = useOrdersCardController();

  return (
    <div className="p-4 border border-gray-600/40 rounded-2xl flex flex-col items-center flex-1">
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseOrderModal}
        isPending={isPending}
        onCancelOrder={handleCancelOrder}
        isPendingUpdate={isPendingUpdate}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <header className="p-2 text-sm flex items-center gap-2">
        <span>{icon}</span>

        <strong>{title}</strong>

        <span className="bg-gray-500/20 py-1 px-2 rounded text-gray-500">{orders.length}</span>
      </header>

      {orders.length > 0 && (
        <div className="flex flex-col w-full mt-6 gap-6">
          {orders.map(order => (
            <button
              key={order.id}
              type="button"
              className="bg-white border border-gray-600/40 h-32 rounded-lg w-full flex flex-col items-center justify-center gap-1 outline-none"
              onClick={() => handleOpenOrderModal(order)}
            >
              <strong className="font-medium">Mesa {order.table}</strong>
              <span className="text-sm text-gray-400">{order.products.length} itens</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

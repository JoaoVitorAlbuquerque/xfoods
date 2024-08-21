import { Order } from '../../../../../types/Order';
import { calculateTotalProducts } from '../../../../../app/utils/calculateTotalProducts';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose(): void;
  isPending: boolean;
  onCancelOrder: () => Promise<void>;
  isPendingUpdate: boolean;
  onUpdateOrderStatus(): void;
}

export function OrderModal({
  visible,
  order,
  onClose,
  isPending,
  onCancelOrder,
  isPendingUpdate,
  onUpdateOrderStatus,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const total = calculateTotalProducts(order);

  return (
    <div
      className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center"
    >
      <Modal
        visible={visible}
        title={`Mesa ${order.table}`}
        onClose={onClose}
      >
        <div key={order.id}>
          <div>
            <small className="text-sm text-gray-500/80">Status do pedido</small>

            <div className="flex items-center gap-2 mt-2">
              <span>
                {order.status === 'WAITING' && '🕑'}
                {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>

              <strong className="font-semibold">
                {order.status === 'WAITING' && 'Fila de espera'}
                {order.status === 'IN_PRODUCTION' && 'Em produção'}
                {order.status === 'DONE' && 'Pronto'}
              </strong>
            </div>
          </div>

          <div className="mt-8">
            <strong className="font-medium text-gray-500/80 text-sm">
              Itens
            </strong>

            <div className="mt-4" key={Math.random().toString()}>
              {order.products.map(({ id, product, size, quantity }) => (
                <div key={id} className="flex mt-4">
                  <img
                    src={`http://localhost:3000/uploads/${product.imagePath}`}
                    alt={product.name}
                    className="w-14 h-[28.51px] rounded-md"
                  />

                  <span className="text-gray-400 block min-w-5 ml-3">
                    {quantity}x
                  </span>

                  <div className="ml-1">
                    <div className="flex items-center mb-1">
                      <strong className="block mr-4">{product.name}</strong>

                      <div className="p-0.5 rounded-md bg-red-700">
                        <span className="font-semibold text-white">
                          {size === 'METER' && 'Metro'}
                          {size === 'LARGE' && 'Grande'}
                          {size === 'MEAN' && 'Média'}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm text-gray-400">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="mt-4 space-y-2">
                <span className="text-sm text-gray-500/80">Detalhes do pedido</span>

                <div className="p-1 rounded-md border border-gray-400">
                  <p className="font-medium text-gray-500/80">
                    {(order.description === null || order.description === '')? 'Pedido tradicional' : order.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="font-medium text-sm opacity-80">Total</span>
            <strong className="text-gray-500">{formatCurrency(total)}</strong>
          </div>

          <footer className="flex items-center justify-between mt-8">
            <button
              onClick={onCancelOrder}
              disabled={isPending}
              type="button"
              className="py-3 font-bold text-red-800"
            >
              Cancelar Pedido
            </button>

            {order.status !== 'DONE' && (
              <Button
                onClick={onUpdateOrderStatus}
                isLoading={isPendingUpdate}
                disabled={isPending || isPendingUpdate}
              >
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </Button>
            )}
          </footer>
        </div>
      </Modal>
    </div>
  );
}

import { Button } from "../../../../components/Button";
import { Modal } from "../../../../components/Modal";
import { useResetModalController } from "./useResetModalController";

interface ResetModalProps {
  visible: boolean;
  onClose(): void;
}

export function ResetModal({ visible, onClose }: ResetModalProps) {
  const {
    isPending,
    handleUpdateRestartedOrders,
  } = useResetModalController(onClose);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center"
    >
      <Modal
        visible={visible}
        onClose={onClose}
        title="Reiniciar o dia"
      >
        <div className="text-gray-500 font-medium flex flex-col items-center gap-4">
          <span>
            Ao reiniciar o dia, todos os pedidos
            serão arquivados no status atual.
          </span>

          <span>
            Deseja reiniciar o dia?
          </span>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="py-3 font-bold text-red-800"
            onClick={onClose}
          >
            Não, continuar pedidos
          </button>

          <Button
            onClick={handleUpdateRestartedOrders}
            isLoading={isPending}
          >
            Sim, reiniciar o dia
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

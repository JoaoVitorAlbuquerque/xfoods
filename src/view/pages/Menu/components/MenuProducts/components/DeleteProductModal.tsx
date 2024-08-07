import { Product } from "../../../../../../types/Product";
import { formatCurrency } from "../../../../../../app/utils/formatCurrency";
import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";

interface DeleteProductModalProps {
  visible: boolean;
  onClose(): void;
  product: Product | null;
}

export function DeleteProductModal({ visible, onClose, product }: DeleteProductModalProps) {
  if (!visible || !product) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        visible={visible}
        onClose={onClose}
        title="Excluir Produto"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <span
            className="text-gray-500 font-medium"
          >
            Tem certeza que deseja excluir o produto?
          </span>

          <div className="flex w-full rounded-lg border border-gray-600/40">
            <img
              src={`http://localhost:3000/uploads/${product.imagePath}`}
              alt={product.name}
              className="min-h-[123px] w-40"
            />

            <div className="flex flex-col p-4 items-start gap-3">
              <div className="space-x-1">
                <span>{product.category.icon}</span>
                <span className="text-gray-500 font-medium">{product.category.name}</span>
              </div>

              <span className="text-gray-500 font-semibold">{product.name}</span>

              <span className="text-gray-500 font-medium">{formatCurrency(product.price)}</span>
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="py-3 font-bold text-red-800"
          >
            Manter Produto
          </button>

          <Button>
            Excluir Produto
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

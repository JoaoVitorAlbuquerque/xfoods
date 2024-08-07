import { useState } from "react";
import { ImageUpload } from "../../../../../components/ImageUpload";
import { Modal } from "../../../../../components/Modal";
import { Input } from "../../../../../components/Input";
import { Select } from "../../../../../components/Select";
import { Checkbox } from "../../../../../components/Checkbox";
import { Product } from "../../../../../../types/Product";
import { Button } from "../../../../../components/Button";

interface EditProductsModalProps {
  visible: boolean;
  product: Product | null;
  onClose(): void;
  onOpenNewIngredientModal(): void;
}

export function EditProductsModal({ visible, product, onClose, onOpenNewIngredientModal }: EditProductsModalProps) {
  const [, setImage] = useState<string | null>(null);
  console.log({ product });

  if (!visible) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">
      <Modal
        onClose={onClose}
        visible={visible}
        title="Editar Produto"
      >
        <main className="flex-1 flex gap-8 h-full min-w-[864px]">
          <div className="min-w-1/2">
            <div className="flex flex-col gap-4">
              <ImageUpload
                label="Imagem"
                value=""
                onImageChange={setImage}
              />
              {/* A URL da imagem está chegando em blob, tem que ser string */}

              <div className="space-y-2">
                <span className="text-gray-500 font-normal text-sm">Nome do Produto</span>
                <Input
                  type="text"
                  name="product"
                  value={product?.name}
                  placeholder="Nome do Produto"
                />
              </div>

              <div className="space-y-2">
                <span className="text-gray-500 font-normal text-sm">Descrição</span>
                <Input
                  type="text"
                  maxLength={110}
                  name="description"
                  value={product?.description}
                  placeholder="Descrição do Pedido"
                />
                <span className="text-gray-500 font-normal text-sm">Máximo 110 caracteres</span>
              </div>

              <div className="space-y-2">
                <span className="text-gray-500 font-normal text-sm">Categoria</span>
                <Select
                  value={product?.category.name}
                >
                  <option value="">Selecione uma Categoria</option>

                  <option
                    value="Pizza"
                    className="text-lg font-semibold"
                  >
                    Pizza
                  </option>

                  <option
                    value="Lanches"
                    className="text-lg font-semibold"
                  >
                    Lanches
                  </option>

                  <option
                    value="Bebidas"
                    className="text-lg font-semibold"
                  >
                    Bebidas
                  </option>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-6 min-w-1/2 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-400 font-semibold text-lg">
                Ingredientes
              </span>

              <button
                type="button"
                onClick={onOpenNewIngredientModal}
                className="text-red-600 font-semibold"
              >
                Novo Ingrediente
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-gray-500 font-normal text-sm">Busque o ingrediente</span>
              <Input
                type="text"
                name="search"
                placeholder="Ex: Muçarela"
              />
            </div>

            <div className="space-y-1">
              <Checkbox
                label="Muçarela"
                icon="🧀"
                id="123"
              />

              <Checkbox
                label="Rúcula"
                icon="🌱"
                id="456"
              />

              <Checkbox
                label="Tomate"
                icon="🍅"
                id="789"
              />
            </div>
          </div>
        </main>

        <footer className="flex items-center justify-between mt-8">
          <button
            type="button"
            className="py-3 font-bold text-red-800"
          >
            Excluir Produto
          </button>

          <Button>
            Salvar Alterações
          </Button>
        </footer>
      </Modal>
    </div>
  );
}

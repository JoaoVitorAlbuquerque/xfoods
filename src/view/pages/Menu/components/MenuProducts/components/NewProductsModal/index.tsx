import { useState } from "react";
import { ImageUpload } from "../../../../../../components/ImageUpload";
import { Modal } from "../../../../../../components/Modal";
import { Input } from "../../../../../../components/Input";
import { Select } from "../../../../../../components/Select";
import { Checkbox } from "../../../../../../components/Checkbox";
import { Product } from "../../../../../../../types/Product";
import { Button } from "../../../../../../components/Button";
import { useNewProductsModalController } from "./useNewProductsModalController";
import { useIngredientsController } from "../../useIngredientsController";

interface NewProductsModalProps {
  visible: boolean;
  product: Product | null;
  onClose(): void;
  onOpenNewIngredientModal(): void;
}

export function NewProductsModal({ visible, product, onClose, onOpenNewIngredientModal }: NewProductsModalProps) {
  const [, setImage] = useState<string | null>(null);
  console.log({ product });

  const { data: categories, isFetching: isLoadingCategories } = useNewProductsModalController();
  const { data: ingredients } = useIngredientsController();

  if (!visible) {
    return null;
  }

  return (
    <div className="left-0 top-0 bg-black/80 backdrop-blur-sm size-full fixed flex items-center justify-center">

      <Modal
        onClose={onClose}
        visible={visible}
        title="Novo Produto"
      >
        <form>
          <main className="flex-1 flex gap-8 h-full min-w-[864px]">
            <div className="min-w-1/2">
              <div className="flex flex-col gap-4">
                <ImageUpload
                  label="Imagem"
                  onImageChange={setImage}
                />
                {/* A URL da imagem está chegando em blob, tem que ser string */}

                <div className="space-y-2">
                  <span className="text-gray-500 font-normal text-sm">Nome do Produto</span>
                  <Input
                    type="text"
                    name="product"
                    placeholder="Nome do Produto"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-gray-500 font-normal text-sm">Descrição</span>
                  <Input
                    type="text"
                    maxLength={110}
                    name="description"
                    placeholder="Descrição do Pedido"
                  />
                  <span className="text-gray-500 font-normal text-sm">Máximo 110 caracteres</span>
                </div>

                <div className="space-y-2">
                  <span className="text-gray-500 font-normal text-sm">Categoria</span>
                    <Select
                      // value={}
                      // onChange={}
                      disabled={isLoadingCategories}
                    >
                      <option value="">Selecione uma Categoria</option>
                      {categories.map((category => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="text-lg font-semibold"
                        >
                          {category.name}
                        </option>
                      )))}
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

              <div className="space-y-1 max-h-[424px] overflow-y-auto">
                {ingredients.map(ingredient => (
                  <Checkbox
                    key={ingredient.id}
                    label={ingredient.name}
                    icon={ingredient.icon}
                    id={ingredient.id}
                  />
                ))}
              </div>
            </div>
          </main>

          <footer className="flex items-center justify-end mt-8">
            <Button>
              Salvar Alterações
            </Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}

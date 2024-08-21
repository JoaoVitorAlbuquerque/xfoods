import { Modal } from "../../../../../../components/Modal";
import { Input } from "../../../../../../components/Input";
import { Product } from "../../../../../../../types/Product";
import { Button } from "../../../../../../components/Button";
import { Controller } from "react-hook-form";
import { useEditProductsModalController } from "./useEditProductsModalController";
import { InputCurrency } from "../../../../../../components/InputCurrency";
import { RadixSelect } from "../../../../../../components/RadixSelect";
import { useIngredientsController } from "../../useIngredientsController";

interface EditProductsModalProps {
  visible: boolean;
  product: Product | null;
  selectedProduct: Product | null;
  onClose(): void;
  onOpenNewIngredientModal(): void;
}

export function EditProductsModal({ visible, selectedProduct, onClose, onOpenNewIngredientModal }: EditProductsModalProps) {
  const {
    control,
    errors,
    isPending,
    data: categories,
    register,
    handleSubmit,
  } = useEditProductsModalController(onClose, selectedProduct);

  const { data: ingredients } = useIngredientsController();

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
        <form onSubmit={handleSubmit}>
          <main className="flex-1 flex gap-8 h-full min-w-[864px]">
            <div className="min-w-1/2">
              <div className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="imagePath"
                  render={({ field: { onChange } }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />
                  )}
                />
                {errors.imagePath && <p className="text-red-900">{errors.imagePath.message}</p>}

                <div className="space-y-2">
                  <span className="text-gray-500 font-normal text-sm">Nome do Produto</span>
                  <Input
                    type="text"
                    placeholder="Nome do Produto"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-gray-500 font-normal text-sm">Descrição</span>
                  <Input
                    type="text"
                    maxLength={110}
                    placeholder="Descrição do Pedido"
                    {...register('description')}
                    error={errors.description?.message}
                  />
                  <span className="text-gray-500 font-normal text-sm">Máximo 110 caracteres</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                    <Controller
                      control={control}
                      name="price"
                      defaultValue="0"
                      render={({ field: { onChange, value } }) => (
                        <InputCurrency
                          // placeholder="Preço do produto"
                          error={errors.price?.message}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-gray-500 font-normal text-sm">Categoria</span>
                      <Controller
                        control={control}
                        name="category"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                          <RadixSelect
                            placeholder="Selecione uma categoria"
                            onChange={onChange}
                            value={value}
                            // disabled={isLoadingCategories}
                            error={errors.category?.message}
                            options={categories.map(category => ({
                              value: category?.id,
                              label: category?.name,
                            }))}
                          />
                        )}
                      />
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
                  <Controller
                    key={ingredient.id}
                    control={control}
                    name="ingredientIds"
                    render={({ field }) => (
                      <label className="flex items-center border rounded-lg p-4" role="button">
                        <span className="mr-2">
                          <span>{ingredient.icon}</span>
                        </span>
                        <span className="flex-grow text-gray-400 font-normal">{ingredient.name}</span>
                        <input
                          type="checkbox"
                          value={ingredient.id}
                          checked={field.value ? field.value?.includes(ingredient.id) : false}
                          onChange={() => {
                            if (field.value?.includes(ingredient.id)) {
                              field.onChange(field.value.filter((item: string) => item !== ingredient.id));
                            } else {
                              field.onChange([...(field.value || []), ingredient.id]);
                            }
                          }}
                        />
                      </label>
                    )}
                  />
                ))}
              </div>
              {errors.ingredientIds && <p className="text-red-900">{errors.ingredientIds.message}</p>}
            </div>
          </main>

          <footer className="flex items-center justify-between mt-8">
            <button
              type="button"
              className="py-3 font-bold text-red-800"
            >
              Excluir Produto
            </button>

            <Button isLoading={isPending}>
              Salvar Alterações
            </Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}

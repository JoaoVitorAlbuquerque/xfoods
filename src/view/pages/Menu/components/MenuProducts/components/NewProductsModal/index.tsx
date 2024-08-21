import { Controller } from "react-hook-form";

import { Modal } from "../../../../../../components/Modal";
import { Input } from "../../../../../../components/Input";
import { Product } from "../../../../../../../types/Product";
import { Button } from "../../../../../../components/Button";
import { useNewProductsModalController } from "./useNewProductsModalController";
// import { useIngredientsController } from "../../useIngredientsController";
import { RadixSelect } from "../../../../../../components/RadixSelect";
import { InputCurrency } from "../../../../../../components/InputCurrency";

interface NewProductsModalProps {
  visible: boolean;
  product: Product | null;
  onClose(): void;
  onOpenNewIngredientModal(): void;
}

export function NewProductsModal({
  visible,
  // product,
  onClose,
  onOpenNewIngredientModal,
}: NewProductsModalProps) {
  // const [, setImage] = useState<string | null>(null);
  // console.log({ product });

  const {
    data: categories,
    // isFetching: isLoadingCategories,
    register,
    errors,
    handleSubmit,
    isPending,
    control,
    filteredIngredients,
    searchTerm,
    setSearchTerm,
    dataIngredients,
  } = useNewProductsModalController(onClose);

  // const { data: ingredients } = useIngredientsController();

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

                {/* <Controller
                  control={control}
                  name="imagePath"
                  render={({ field: { value, onChange } }) => (
                    <ImageUpload
                      label="Imagem"
                      value={value ? URL.createObjectURL(value) : ''}
                      // value={value}
                      onImageChange={(file) => {
                        onChange(file);
                      }}
                      // onImageChange={(imageUrl) => {
                      //   if (imageUrl) {
                      //     const file = new File([imageUrl], '');
                      //     onChange(file);
                      //   } else {
                      //     onChange(null);
                      //   }
                      // }}
                      // onImageChange={setImage}
                    />
                  )}
                /> */}

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
                    placeholder="Descrição do produto"
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
                            value: category.id,
                            label: category.name,
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
                <div className="text-gray-500 font-normal text-sm flex items-center justify-between">
                  <span>Busque o ingrediente</span>
                  <span>Há <strong>{dataIngredients.length}</strong> ingrediente(s)</span>
                </div>
                <Input
                  type="text"
                  name="search"
                  placeholder="Ex: Muçarela"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-1 h-[424px] overflow-y-auto">
                {filteredIngredients.map(ingredient => (
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
                          checked={field.value.includes(ingredient.id)}
                          onChange={() => {
                            if (field.value.includes(ingredient.id)) {
                              field.onChange(field.value.filter((item: string) => item !== ingredient.id));
                            } else {
                              field.onChange([...field.value, ingredient.id]);
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

          <footer className="flex items-center justify-end mt-8">
            <Button isLoading={isPending}>
              Salvar Alterações
            </Button>
          </footer>
        </form>
      </Modal>
    </div>
  );
}

import { httpClient } from "../httpClient";

export interface UpdateProductsParams {
  id: string,
  name: string,
  imagePath: File,
  description?: string;
  price: string,
  category: string,
  ingredientIds: Array<string>;
}

export async function update({id, ...params}: UpdateProductsParams) {
  const { data } = await httpClient.put(`/products/${id}`, params);

  return data;
}

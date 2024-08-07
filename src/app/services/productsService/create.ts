import { httpClient } from "../httpClient";

export interface CreateProductParams {
  id: string,
  name: string,
  imagePath: string,
  description?: string;
  price: number,
  category: string,
  ingredientIds: Array<string>;
}

export async function create(params: CreateProductParams) {
  const { data } = await httpClient.post('/products', params);

  return data;
}

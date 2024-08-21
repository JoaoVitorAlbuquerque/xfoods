import { httpClient } from "../httpClient";

export interface CreateProductParams {
  // id: string,
  name: string,
  imagePath: File,
  // imagePath: string,
  description?: string;
  price: string,
  category: string,
  ingredientIds: Array<string>;
}

export async function create(params: CreateProductParams) {
  const { data } = await httpClient.post('/products', params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

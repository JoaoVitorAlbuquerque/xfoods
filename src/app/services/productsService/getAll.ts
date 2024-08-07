import { Product } from "../../../types/Product";
import { httpClient } from "../httpClient";

type ProductsResponse = Array<Product>;

export async function getAll() {
  const { data } = await httpClient.get<ProductsResponse>('/products');

  return data;
}

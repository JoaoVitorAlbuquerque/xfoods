import { httpClient } from "../httpClient";

export async function remove(productId: string) {
  const { data } = await httpClient.patch(`/products/${productId}/soft-delete`);

  return data;
}

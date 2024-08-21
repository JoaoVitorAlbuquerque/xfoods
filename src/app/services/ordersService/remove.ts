import { httpClient } from "../httpClient";

export async function remove(orderId: string) {
  const { data } = await httpClient.delete(`/orders/${orderId}`);

  return data;
}

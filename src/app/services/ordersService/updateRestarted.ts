import { httpClient } from "../httpClient";

export async function updateRestarted() {
  const { data } = await httpClient.patch('/orders/restarted');

  return data;
}

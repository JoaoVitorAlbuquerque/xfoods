import { httpClient } from "../httpClient";

export interface UpdateOrdersParams {
  id: string;
  status: string;
}

export async function update({id, ...params}: UpdateOrdersParams) {
  const { data } = await httpClient.patch(`/orders/${id}/order-status`, params);

  return data;
}

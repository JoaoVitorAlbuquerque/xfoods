import { Order } from "../../../types/Order";
import { httpClient } from "../httpClient";

type OrderResponse = Array<Order>;

export async function getAllDashboard() {
  const { data } = await httpClient.get<OrderResponse>('/orders/dashboard');

  return data;
}

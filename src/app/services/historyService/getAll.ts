import { History } from "../../../types/History";
import { httpClient } from "../httpClient";

type HistoryResponse = Array<History>;

export async function getAll() {
  const { data } = await httpClient.get<HistoryResponse>('/orders/history');

  return data;
}

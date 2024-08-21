import { httpClient } from "../httpClient";

export interface CreateParams {
  name: string;
  icon: string;
}

export async function create(params: CreateParams) {
  const { data } = await httpClient.post('/categories', params);

  return data;
}

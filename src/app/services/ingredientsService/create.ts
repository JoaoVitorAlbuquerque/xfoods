import { httpClient } from "../httpClient";

export interface CreateIngredientsParams {
  name: string;
  icon: string;
}

export async function create(params: CreateIngredientsParams) {
  const { data } = await httpClient.post('/ingredients', params);

  return data;
}

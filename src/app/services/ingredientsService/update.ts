import { httpClient } from "../httpClient";

export interface UpdateCategoriesParams {
  id: string;
  name: string;
  icon: string;
}

export async function update({id, ...params}: UpdateCategoriesParams) {
  const { data } = await httpClient.put(`/categories/${id}`, params);

  return data;
}

import { httpClient } from "../httpClient";

export interface UpdateUsersParams {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function update({id, ...params}: UpdateUsersParams) {
  const { data } = await httpClient.put(`/users/${id}`, params);

  return data;
}

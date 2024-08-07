import { httpClient } from "../httpClient";

export interface CreateParams {
  email: string;
  password: string;
  role: string; /* Tipar a role */
}

export async function create(params: CreateParams) {
  const { data } = await httpClient.post('/users', params);

  return data;
}

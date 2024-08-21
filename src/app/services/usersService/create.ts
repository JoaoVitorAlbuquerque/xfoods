import { httpClient } from "../httpClient";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  role: string; /* Tipar a role */
}

export async function create(params: CreateUserParams) {
  const { data } = await httpClient.post('/auth/signup', params);

  return data;
}

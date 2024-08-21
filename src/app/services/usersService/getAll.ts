import { User } from "../../../types/Users";
import { httpClient } from "../httpClient";

type UsersResponse = Array<User>;

export async function getAll() {
  const { data } = await httpClient.get<UsersResponse>('/users');

  return data;
}

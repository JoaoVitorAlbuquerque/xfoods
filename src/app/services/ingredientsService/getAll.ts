import { Ingredient } from "../../../types/Ingredient";
import { httpClient } from "../httpClient";

type IngredientsResponse = Array<Ingredient>;

export async function getAll() {
  const { data } = await httpClient.get<IngredientsResponse>('/ingredients');

  return data;
}

import { httpClient } from "../httpClient";

export interface CreateParams {
  table: number;
  description: string;
  products: {
    id: string;
    quantity: number;
    size: string;
    product: {
      imagePath: string;
      name: string;
      price: number;
    };
  }[];
}

interface CreateResponse {
  accessToken: string;
}

export async function create(params: CreateParams) {
  const { data } = await httpClient.post<CreateResponse>('/orders', params);

  return data;
}

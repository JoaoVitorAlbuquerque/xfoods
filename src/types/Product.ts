export interface Product {
  id: string,
  name: string,
  imagePath: string,
  description?: string;
  price: number,
  category: {
    icon: string,
    name: string,
  },
}

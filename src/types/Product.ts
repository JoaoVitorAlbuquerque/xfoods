export interface Product {
  id: string,
  name: string,
  imagePath: File,
  // imagePath: string,
  description?: string;
  price: string,
  // category: {
  //   icon: string,
  //   name: string,
  // },
  category: string;
  ingredientIds: Array<string>;
}

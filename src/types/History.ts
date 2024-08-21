export interface History {
  id: string;
  table: number;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  description?: string;
  read: boolean;
  // date: Date,
  date: Date,
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

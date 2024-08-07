import { Order } from "../types/Order";

export const orders: Order[] = [
  {
    id: '123',
    table: 12,
    status: 'WAITING',
    description: '',
    date: new Date(),
    products: [
      {
        id: '456',
        product: {
          imagePath: '1719441215442-marguerita.png',
          name: 'Pizza Marguerita',
          price: 50,
        },
        quantity: 2,
        size: 'METER',
      },
      {
        id: '789',
        product: {
          imagePath: '1719441420024-coca-cola.png',
          name: 'Coca cola',
          price: 7,
        },
        quantity: 4,
        size: 'METER',
      },
    ],
  },
];

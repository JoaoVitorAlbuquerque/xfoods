import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "a0fe66a8-e0eb-427d-a3ca-feb03f9637f7",
		name: "Pizza Marguerita",
		imagePath: "1719441215442-marguerita.png",
		price: 50,
		category: {
			icon: "🍕",
			name: "Pizza",
    },
  },
  {
    id: "6ccb41f0-8213-492d-bf3b-c373646f2de0",
		name: "Coca Cola",
		imagePath: "1719441420024-coca-cola.png",
		price: 7,
		category: {
			icon: "🍹",
			name: "Bebidas",
    },
  },
];

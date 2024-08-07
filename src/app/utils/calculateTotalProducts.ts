import { Order } from "../../types/Order";

export function calculateTotalProducts(order: Order | null) {
  const total = order?.products.reduce((acc, { product, quantity, size }) => {
    const productTotal = (product.price * quantity);
    const meter = size === 'METER' ? productTotal * (0.10) : 0;
    const large = size === 'LARGE' ? productTotal * (0.07) : 0;
    const small = size === 'SMALL' ? productTotal * (-0.03) : 0;
    return acc + productTotal + (meter || large || small)
  }, 0);

  return Number(total);
}

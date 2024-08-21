import { Order } from "../../types/Order";

export function calculateTotalProducts(order: Order | null) {
  const total = order?.products.reduce((acc, { product, quantity, size }) => {
    const productTotal = (product.price * quantity);
    const meter = size === 'METER' ? productTotal * (0.12) : 0;
    const extraLarge = size === 'EXTRA_LARGE' ? productTotal * (0.09) : 0;
    const large = size === 'LARGE' ? productTotal * (0.07) : 0;
    const mean = size === 'MEAN' ? productTotal * (0.05) : 0;
    const small = size === 'SMALL' ? productTotal * (-0.03) : 0;
    const tiny = size === 'TINY' ? productTotal * (-0.05) : 0;
    return acc + productTotal + (meter || large || small || mean || tiny || extraLarge)
  }, 0);

  return Number(total);
}

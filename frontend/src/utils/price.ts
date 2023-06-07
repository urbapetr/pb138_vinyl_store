export const convertPrice = (price: number | null, available: boolean) => {
  if (available === false || !price) {
    return 'Out of Stock';
  }

  return `$${price.toString()}`;
};

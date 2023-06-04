export const convertPrice = (price: number | null) => {
  if (price === null) {
    return 'Out of Stock';
  }

  return `$${price.toString()}`;
};

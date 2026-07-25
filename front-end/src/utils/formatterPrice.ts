export const formatterPrice = (value: number) => {
  return value.toFixed(2).replace(".", ",");
};

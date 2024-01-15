export const formatNumber = (number: number) => {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

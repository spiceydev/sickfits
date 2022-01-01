export const formatMoney = (amount = 0) => {
  const options = {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 2,
  };
  if (amount % 100 === 0) options.minimumFractionDigits = 0;

  const formatter = new Intl.NumberFormat('en-NZ', options);

  return formatter.format(amount / 100);
};

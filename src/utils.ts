export const socialFee = 31.42;
export const extrasSalaryTax = 24.26;
export const mobileCost = 250;
export const vacationTax = 12;

export const getSocialFeeAmount = (salary: number) =>
  (salary * socialFee) / 100;

export const getExtraSalaryFee = (pension: number) =>
  (pension * extrasSalaryTax) / 100;

export const getVacation = (salary: number) => (salary * vacationTax) / 100;

export const getVacationPayExtraTaxAmount = (vacation: number) =>
  (vacation * socialFee) / 100;

export const getTotalSum = (rate: number, numberOfDays: number) =>
  rate * 8 * numberOfDays * 0.8;

export const formatNumber = (number: number) =>
  new Intl.NumberFormat("sv-SE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

export const getTotal = (
  rate: number,
  salary: number,
  pension: number,
  socialFeeAmount: number,
  extraSalaryFee: number,
  vacation: number,
  vacationPayExtraTaxAmount: number,
  totalSum: number,
) => {
  if (rate === 0 || salary === 0) {
    return 0;
  }

  const total =
    salary +
    socialFeeAmount +
    pension +
    extraSalaryFee +
    vacation +
    vacationPayExtraTaxAmount +
    mobileCost;

  if (total > totalSum) {
    return totalSum - total;
  }

  return total;
};

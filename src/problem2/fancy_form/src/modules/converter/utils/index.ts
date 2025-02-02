import { CurrencyType } from "../types";

export const convertCurrency = (
  data: CurrencyType[],
  fromCurrency: string,
  toCurrency: string,
  amount: number
) => {
  const fromCurrencyData = data.find((item) => item.currency === fromCurrency);
  const toCurrencyData = data.find((item) => item.currency === toCurrency);

  if (!fromCurrencyData || !toCurrencyData) {
    throw new Error("Currency not found in data");
  }

  const fromPrice = fromCurrencyData.price;
  const toPrice = toCurrencyData.price;

  const convertedAmount = (amount * fromPrice) / toPrice;

  return convertedAmount;
};

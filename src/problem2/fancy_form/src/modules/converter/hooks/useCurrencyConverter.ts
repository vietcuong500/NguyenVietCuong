import { useState, useCallback } from "react";
import { convertCurrency } from "../utils";
import { data } from "../constant";
import { OptionType } from "../../../components/select/Select";

export const useCurrencyConverter = () => {
  const initialCurrency: OptionType = {
    label: "USC",
    id: "USC",
    value: "USC",
  };

  const [values, setValues] = useState({
    from: "1",
    to: "1",
  });

  const [currencies, setCurrencies] = useState({
    from: initialCurrency,
    to: initialCurrency,
  });

  const convertValue = useCallback(
    (fromCurrency: string, toCurrency: string, amount: number) => {
      const converted = convertCurrency(data, fromCurrency, toCurrency, amount);
      return String(converted);
    },
    []
  );

  const handleValueChange = useCallback(
    (direction: "from" | "to", value: string) => {
      const { from: fromCurrency, to: toCurrency } = currencies;
      const amount = Number(value);

      if (direction === "from") {
        setValues({
          from: value,
          to: convertValue(fromCurrency.value, toCurrency.value, amount),
        });
      } else {
        setValues({
          to: value,
          from: convertValue(toCurrency.value, fromCurrency.value, amount),
        });
      }
    },
    [currencies, convertValue]
  );

  const handleCurrencyChange = useCallback(
    (direction: "from" | "to", newCurrency: OptionType) => {
      setCurrencies((prev) => {
        const updated = {
          ...prev,
          [direction]: newCurrency,
        };

        const newToValue = convertValue(
          updated.from.value,
          updated.to.value,
          Number(values.from)
        );

        setValues((prev) => ({
          ...prev,
          to: newToValue,
        }));

        return updated;
      });
    },
    [convertValue, values.from]
  );

  const handleSwapCurrency = useCallback(() => {
    setCurrencies((prev) => {
      const swapped = {
        from: prev.to,
        to: prev.from,
      };

      const newToValue = convertValue(
        swapped.from.value,
        swapped.to.value,
        Number(values.from)
      );

      setValues((prev) => ({
        ...prev,
        to: newToValue,
      }));

      return swapped;
    });
  }, [convertValue, values.from]);

  return {
    fromValue: values.from,
    toValue: values.to,
    fromCurrency: currencies.from,
    toCurrency: currencies.to,
    handleChangeFromValue: (value: string) => handleValueChange("from", value),
    handleChangeToValue: (value: string) => handleValueChange("to", value),
    handleSwapCurrency,
    handleChangeFromCurrency: (value: OptionType) =>
      handleCurrencyChange("from", value),
    handleChangeToCurrency: (value: OptionType) =>
      handleCurrencyChange("to", value),
  };
};

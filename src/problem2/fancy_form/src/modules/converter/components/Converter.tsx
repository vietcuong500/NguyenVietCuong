import moment from "moment";
import { Input } from "../../../components";
import { data } from "../constant";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { convertCurrency } from "../utils";

export const Converter = () => {
  const {
    fromValue,
    toValue,
    fromCurrency,
    toCurrency,
    handleChangeFromCurrency,
    handleChangeFromValue,
    handleChangeToCurrency,
    handleChangeToValue,
    handleSwapCurrency,
  } = useCurrencyConverter();

  const currencyOptions = data.map((el) => ({
    label: el.currency,
    id: el.currency,
    value: el.currency,
    icon: el?.icon,
  }));

  const lastUpdated = moment(
    data.find((el) => el.currency === toCurrency.value)?.date
  ).format("lll");

  return (
    <div className="w-2/3 p-16 bg-white rounded-3xl shadow-xl">
      <div className="flex flex-col xl:flex-row items-center justify-center w-full gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="from" className="font-light text-neutral-700 text-sm">
            Amount
          </label>
          <Input
            id="from"
            name="from"
            placeholder="0.00"
            value={fromValue}
            currencyDefault={fromCurrency}
            currencyOptions={currencyOptions}
            onChange={handleChangeFromValue}
            onChangeCurrency={handleChangeFromCurrency}
          />
        </div>
        <button
          className="cursor-pointer size-8 shrink-0 mt-4 flex items-center justify-center rounded-full hover:bg-slate-100"
          onClick={handleSwapCurrency}
        >
          <ArrowsRightLeftIcon className="size-5 " />
        </button>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="to" className="font-light text-neutral-700 text-sm">
            Converted to
          </label>

          <Input
            id="to"
            name="to"
            placeholder="0.00"
            value={toValue}
            currencyDefault={toCurrency}
            currencyOptions={currencyOptions}
            onChange={handleChangeToValue}
            onChangeCurrency={handleChangeToCurrency}
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xl font-semibold text-neutral-800">
            {String(Number(fromValue).toFixed(5))} {fromCurrency.label} ={" "}
            <span className="text-green-800">
              {String(Number(toValue).toFixed(5))}
            </span>{" "}
            {toCurrency.label}
          </p>
          <div className="text-sm text-neutral-500">
            <p>
              1 {fromCurrency.label} ={" "}
              {convertCurrency(
                data,
                fromCurrency.value,
                toCurrency.value,
                1
              ).toFixed(5)}{" "}
              {toCurrency.label}
            </p>
            <p>
              1 {toCurrency.label} ={" "}
              {convertCurrency(
                data,
                toCurrency.value,
                fromCurrency.value,
                1
              ).toFixed(5)}{" "}
              {fromCurrency.label}
            </p>
          </div>
        </div>
        <div className="w-full">
          <p className="text-xs text-neutral-700 text-end">
            <span className="text-green-800">{fromCurrency.label}</span> to{" "}
            <span className="text-green-800">{toCurrency.label}</span> — Last
            updated {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

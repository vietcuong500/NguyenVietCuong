import { InputNumber, InputNumberProps } from "../InputNumber/InputNumber";
import { OptionType, Select } from "../select/Select";

type InputProps = {
  currencyDefault: OptionType;
  onChangeCurrency: (value: OptionType) => void;
  currencyOptions: OptionType[];
} & InputNumberProps;

export const Input = (props: InputProps) => {
  const { currencyDefault, onChangeCurrency, currencyOptions, ...rest } = props;

  return (
    <div className="w-full">
      <div className="flex h-[64px] items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-700">
        <InputNumber
          className="block text-xl font-semibold min-w-0 grow py-1.5 pr-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none"
          {...rest}
        />
        <Select
          value={currencyDefault}
          onChange={onChangeCurrency}
          options={currencyOptions}
        />
      </div>
    </div>
  );
};

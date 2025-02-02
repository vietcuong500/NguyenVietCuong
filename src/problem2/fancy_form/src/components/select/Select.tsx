import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export type OptionType = {
  label: string;
  id: string;
  value: string;
  icon?: string;
};

export type SelectProps = {
  value: OptionType;
  onChange: (value: OptionType) => void;
  options: OptionType[];
};

export const Select = (props: SelectProps) => {
  const { value, onChange, options } = props;
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-40">
        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-transparent py-1.5 pr-2 pl-3 text-left text-gray-900">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={value.icon}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">{value.label}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-7 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default py-3 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-50 data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={option?.icon}
                  className="size-5 shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {option.label}
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-800 group-not-data-selected:hidden">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

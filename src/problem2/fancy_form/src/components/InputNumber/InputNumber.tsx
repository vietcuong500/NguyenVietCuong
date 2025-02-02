export type InputNumberProps = { onChange: (value: string) => void } & Omit<
  React.ComponentProps<"input">,
  "onChange"
>;

export const InputNumber = (props: InputNumberProps) => {
  const { value, onChange, ...rest } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9\.]/g, "");
    onChange(inputValue);
  };
  return <input value={value} onChange={handleChange} type="text" {...rest} />;
};

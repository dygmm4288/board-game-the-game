import { Select as SelectRadix } from "@radix-ui/themes";

export type Option = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: string[] | Option[];
  defaultValue?: string;
};
const Select = ({ options, defaultValue }: SelectProps) => {
  if (
    defaultValue &&
    !options.find((option) => {
      if (typeof option === "string") return option === defaultValue;
      return option.value === defaultValue;
    })
  ) {
    console.error("[개발 에러]: Select의 default value가 올바르지 않습니다.");
  }

  return (
    <SelectRadix.Root defaultValue={defaultValue}>
      <SelectRadix.Trigger />
      <SelectRadix.Content>
        {options.map((option) => {
          if (typeof option === "string")
            return <SelectRadix.Item value={option}>{option}</SelectRadix.Item>;
          return (
            <SelectRadix.Item value={option.value}>
              {option.label}
            </SelectRadix.Item>
          );
        })}
      </SelectRadix.Content>
    </SelectRadix.Root>
  );
};

export default Select;
